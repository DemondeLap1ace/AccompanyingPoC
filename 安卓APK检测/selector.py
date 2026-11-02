#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import zipfile
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

DEFAULT_AAPT2 = "F:/AndroidSdk/build-tools/36.0.0/aapt2.exe"
DEFAULT_APKSIGNER = "F:/AndroidSdk/build-tools/36.0.0/apksigner.bat"

PASS = "PASS"
WARN = "WARN"
FAIL = "FAIL"
INFO = "INFO"

COMPONENT_TAGS = {"activity", "activity-alias", "service", "receiver", "provider"}

PACKER_LIB_PATTERNS = [
    "libjiagu", "libshell", "libdexhelper", "libmobisec", "libbaiduprotect",
    "libprotectclass", "libexec", "libsgmain", "libegis", "libsecexe",
    "libsecmain", "libsecshell", "libnesec", "libapkprotect",
]
PACKER_STRING_PATTERNS = [
    "stubshell", "jiagu", "libshell", "dexhelper", "mobisec", "baiduprotect",
    "protectclass", "libexec", "libsgmain", "libegis", "bangcle", "ijiami",
    "legu", "secexe", "secmain", "libdexhelper", "apkprotect", "secshell",
]

STRONG_INTEGRITY_PATTERNS = [
    "play/core/integrity", "integritymanager", "integritytokenrequest",
    "safetynet", "attestation", "attest(", "devicecheck",
]

LOCAL_SIG_PATTERNS = [
    "getapkcontentssigners", "getsigningcertificates", "get_signatures",
    "getsignatures", "apkcontentssigners", "packageinfoforsignatures",
    "getsigninginfo", "getsigningsignatures",
]

ANTI_DEBUG_PATTERNS = [
    r"(?<![a-z])frida(?![a-z])", r"(?<![a-z])xposed(?![a-z])",
    r"isdebuggerconnected", r"tracerpid", r"magisk", r"supersu",
    r"(?<![a-z])emulator(?![a-z])", r"rootdetect", r"rootbeer",
]
ANTI_DEBUG_REGEX = [re.compile(p, re.IGNORECASE) for p in ANTI_DEBUG_PATTERNS]

STORAGE_PERMISSIONS = {
    "android.permission.READ_EXTERNAL_STORAGE",
    "android.permission.WRITE_EXTERNAL_STORAGE",
    "android.permission.READ_MEDIA_IMAGES",
    "android.permission.READ_MEDIA_VIDEO",
    "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
    "android.permission.MANAGE_EXTERNAL_STORAGE",
}
BACKGROUND_PERMISSIONS = {
    "android.permission.FOREGROUND_SERVICE",
    "android.permission.RECEIVE_BOOT_COMPLETED",
    "android.permission.WAKE_LOCK",
}

@dataclass
class Finding:
    key: str
    title: str
    status: str
    evidence: str = ""
    hard_gate: bool = False

@dataclass
class ScoreItem:
    key: str
    title: str
    weight: int
    earned: int
    reason: str = ""

@dataclass
class ApkInfo:
    path: str
    size: int
    package: str = ""
    version_name: str = ""
    version_code: str = ""
    min_sdk: Optional[int] = None
    target_sdk: Optional[int] = None
    compile_sdk: str = ""
    launchable_activity: str = ""
    permissions: list[str] = field(default_factory=list)
    debuggable: bool = False
    test_only: bool = False
    uses_cleartext: Optional[bool] = None
    request_legacy_storage: Optional[bool] = None
    extract_native_libs: Optional[bool] = None
    network_security_config: str = ""
    components: list[dict[str, Any]] = field(default_factory=list)
    processes: list[str] = field(default_factory=list)
    dex_files: list[str] = field(default_factory=list)
    lib_abis: list[str] = field(default_factory=list)
    native_libs: list[str] = field(default_factory=list)
    split_apk: bool = False
    split_evidence: list[str] = field(default_factory=list)
    v1_signed: bool = False
    signature_ok: Optional[bool] = None
    signature_schemes: list[str] = field(default_factory=list)
    cert_dn: str = ""
    cert_sha256: str = ""
    dex_hits: dict[str, list[str]] = field(default_factory=dict)
    asset_count: int = 0
    entry_count: int = 0
    aapt2_ok: bool = False
    apksigner_ok: bool = False
    tool_notes: list[str] = field(default_factory=list)

def _bool_value(value: Any) -> Optional[bool]:
    if value is None:
        return None
    if isinstance(value, bool):
        return value
    s = str(value).strip().lower()
    if s in ("true", "yes", "1", "0xffffffff", "0xffffffffffffffff"):
        return True
    if s in ("false", "no", "0", "0x0"):
        return False
    if "0xffffffff" in s:
        return True
    if s.endswith("0x0") or s.endswith("=0x0"):
        return False
    return None

def _resolve_tool(cli_value: Optional[str], env_key: str, default: str) -> Optional[Path]:
    candidates = [cli_value, os.environ.get(env_key), default]
    for cand in candidates:
        if cand:
            p = Path(cand)
            if p.exists():
                return p
    found = shutil.which(Path(default).name)
    if found:
        return Path(found)
    return None

def _run_tool(tool: Path, args: list[str], timeout: int = 180) -> tuple[int, str]:
    try:
        if os.name == "nt" and tool.suffix.lower() in (".bat", ".cmd"):
            cmdline = subprocess.list2cmdline([str(tool)] + [str(a) for a in args])
            proc = subprocess.run(
                cmdline,
                shell=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=timeout,
            )
        else:
            proc = subprocess.run(
                [str(tool)] + [str(a) for a in args],
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=timeout,
            )
        return proc.returncode, (proc.stdout or "") + (proc.stderr or "")
    except Exception as exc:
        return 127, f"{type(exc).__name__}: {exc}"

def scan_zip(info: ApkInfo) -> None:
    try:
        with zipfile.ZipFile(info.path) as zf:
            names = zf.namelist()
            info.entry_count = len(names)
            info.asset_count = sum(1 for n in names if n.startswith("assets/") and not n.endswith("/"))

            info.dex_files = sorted(
                n for n in names
                if re.fullmatch(r"classes\d*\.dex", n.rsplit("/", 1)[-1])
            )

            abis: set[str] = set()
            libs: list[str] = []
            for n in names:
                m = re.match(r"^lib/([^/]+)/.+$", n)
                if m:
                    abis.add(m.group(1))
                    libs.append(n.rsplit("/", 1)[-1])
            info.lib_abis = sorted(abis)
            info.native_libs = sorted(set(libs))

            split_hits: list[str] = []
            for n in names:
                if "/" in n:
                    continue
                low = n.lower()
                if low.startswith("split_config") or low.startswith("config.") or low == "base.apk":
                    split_hits.append(n)
            info.split_evidence = split_hits[:10]
            info.split_apk = bool(split_hits)

            info.v1_signed = any(
                re.match(r"^META-INF/.*\.(RSA|DSA|EC)$", n, re.IGNORECASE)
                for n in names
            )

            scan_dex_strings(info, zf, info.dex_files)
    except zipfile.BadZipFile:
        info.tool_notes.append("不是有效 ZIP/APK")
    except Exception as exc:
        info.tool_notes.append(f"读取 ZIP 失败: {type(exc).__name__}: {exc}")

def scan_dex_strings(info: ApkInfo, zf: zipfile.ZipFile, dex_files: list[str]) -> None:
    patterns: dict[str, list[str]] = {
        "packer": PACKER_STRING_PATTERNS,
        "strong_integrity": STRONG_INTEGRITY_PATTERNS,
        "local_signature": LOCAL_SIG_PATTERNS,
        "anti_debug": ANTI_DEBUG_PATTERNS,
    }
    hits: dict[str, set[str]] = {k: set() for k in patterns}
    for name in dex_files:
        try:
            data = zf.read(name)
        except Exception:
            continue
        for m in re.finditer(rb"[\x20-\x7e]{4,}", data):
            s = m.group().decode("latin1", errors="ignore")
            low = s.lower()
            for cat, pats in patterns.items():
                if cat == "anti_debug":
                    matched = any(rx.search(low) for rx in ANTI_DEBUG_REGEX)
                else:
                    matched = any(p in low for p in pats)
                if matched:
                    if len(hits[cat]) < 20:
                        hits[cat].add(s[:160])
                    break
    info.dex_hits = {k: sorted(v) for k, v in hits.items() if v}

    lib_hits = [
        lib for lib in info.native_libs
        if any(p in lib.lower() for p in PACKER_LIB_PATTERNS)
    ]
    if lib_hits:
        info.dex_hits.setdefault("packer", [])
        for lib in lib_hits:
            marker = f"lib:{lib}"
            if marker not in info.dex_hits["packer"]:
                info.dex_hits["packer"].append(marker)

def parse_badging(info: ApkInfo, text: str) -> None:
    info.aapt2_ok = True
    m = re.search(
        r"^package:\s+name='([^']*)'\s+versionCode='([^']*)'\s+versionName='([^']*)'",
        text, re.MULTILINE,
    )
    if m:
        info.package, info.version_code, info.version_name = m.group(1), m.group(2), m.group(3)

    m = re.search(r"^(?:minSdkVersion|sdkVersion):'(\d+)'", text, re.MULTILINE)
    if m:
        info.min_sdk = int(m.group(1))
    m = re.search(r"^targetSdkVersion:'(\d+)'", text, re.MULTILINE)
    if m:
        info.target_sdk = int(m.group(1))
    m = re.search(r"compileSdkVersion='([^']*)'", text)
    if m:
        info.compile_sdk = m.group(1)

    m = re.search(r"^launchable-activity:\s+name='([^']+)'", text, re.MULTILINE)
    if m:
        info.launchable_activity = m.group(1)

    info.permissions = sorted(set(
        re.findall(r"^uses-permission(?:-sdk-\d+)?:\s+name='([^']+)'", text, re.MULTILINE)
    ))

    if re.search(r"^application-debuggable", text, re.MULTILINE):
        info.debuggable = True
    if re.search(r"^application-testOnly", text, re.MULTILINE):
        info.test_only = True

def parse_manifest_tree(info: ApkInfo, text: str) -> None:
    stack: list[tuple[int, str]] = []
    current: Optional[dict[str, Any]] = None
    app_attrs: dict[str, str] = {}

    for line in text.splitlines():
        m = re.match(r"^(\s*)E:\s+([^\s(]+)", line)
        if m:
            indent = len(m.group(1))
            name = m.group(2)
            while stack and indent <= stack[-1][0]:
                stack.pop()
            if current is not None and indent <= current["_depth"]:
                current = None
            stack.append((indent, name))

            if name in COMPONENT_TAGS:
                current = {
                    "type": name,
                    "name": "",
                    "exported": None,
                    "process": "",
                    "targetActivity": "",
                    "has_filter": False,
                    "actions": [],
                    "categories": [],
                    "_depth": indent,
                }
                info.components.append(current)
            elif name == "intent-filter" and current is not None:
                current["has_filter"] = True
            continue

        m = re.match(
            r"^\s*A:\s+(?:[^\s(]*:)?([A-Za-z0-9_]+)\(0x[0-9a-fA-F]+\)=(.*)$",
            line,
        )
        if not m:
            continue
        key = m.group(1)
        val = re.sub(r"\s+\(Raw:.*\)$", "", m.group(2).strip()).strip()
        quoted = re.match(r'^"(.*)"$', val)
        if quoted:
            val = quoted.group(1)

        top_tag = stack[-1][1] if stack else ""
        if top_tag == "application":
            app_attrs[key] = val
        if current is None:
            continue

        if top_tag in COMPONENT_TAGS and stack[-1][0] == current["_depth"]:
            if key in ("name", "exported", "process", "targetActivity"):
                current[key] = val
        elif top_tag == "action" and key == "name":
            current["actions"].append(val)
        elif top_tag == "category" and key == "name":
            current["categories"].append(val)

    info.debuggable = bool(_bool_value(app_attrs.get("debuggable"))) or info.debuggable
    info.test_only = bool(_bool_value(app_attrs.get("testOnly"))) or info.test_only
    info.uses_cleartext = _bool_value(app_attrs.get("usesCleartextTraffic"))
    info.request_legacy_storage = _bool_value(app_attrs.get("requestLegacyExternalStorage"))
    info.extract_native_libs = _bool_value(app_attrs.get("extractNativeLibs"))
    info.network_security_config = app_attrs.get("networkSecurityConfig", "")

    for c in info.components:
        explicit = _bool_value(c.get("exported"))
        c["exported"] = explicit
        c["exported_effective"] = bool(
            explicit is True or (explicit is None and c.get("has_filter"))
        )

    if not info.launchable_activity:
        candidates = [
            c for c in info.components
            if c["type"] in ("activity", "activity-alias")
            and c["exported_effective"]
            and any(a.endswith("MAIN") for a in c.get("actions", []))
            and any(x.endswith("LAUNCHER") for x in c.get("categories", []))
        ]
        if not candidates:
            candidates = [
                c for c in info.components
                if c["type"] in ("activity", "activity-alias") and c["exported_effective"]
            ]
        if candidates:
            info.launchable_activity = candidates[0]["name"]

    procs = sorted({
        c.get("process", "") for c in info.components
        if c.get("process") and not str(c["process"]).startswith(":")
    })
    if app_attrs.get("process"):
        procs.append(app_attrs["process"])
    info.processes = sorted(set(procs))

def parse_apksigner(info: ApkInfo, rc: int, text: str) -> None:
    info.apksigner_ok = rc == 0
    if rc == 0 and "Verifies" in text and "DOES NOT VERIFY" not in text:
        info.signature_ok = True
    elif "DOES NOT VERIFY" in text or rc != 0:
        info.signature_ok = False
    else:
        info.signature_ok = None

    info.signature_schemes = sorted(set(
        re.findall(r"Verified using (v\d+(?:\.\d+)?) scheme", text)
    ))
    m = re.search(r"Signer #1 certificate DN:\s*(.+)", text)
    if m:
        info.cert_dn = m.group(1).strip()
    m = re.search(r"Signer #1 certificate SHA-256 digest:\s*([0-9a-fA-F]+)", text)
    if m:
        info.cert_sha256 = m.group(1).lower()

class Evaluator:
    def __init__(self, info: ApkInfo, args: argparse.Namespace):
        self.info = info
        self.args = args
        self.findings: list[Finding] = []
        self.scores: list[ScoreItem] = []

    def add(self, key: str, title: str, status: str, evidence: str = "", hard: bool = False) -> None:
        self.findings.append(Finding(key, title, status, evidence, hard))

    @property
    def perms(self) -> set[str]:
        return set(self.info.permissions)

    def has_internet(self) -> bool:
        return "android.permission.INTERNET" in self.perms

    def has_storage(self) -> bool:
        return bool(self.perms & STORAGE_PERMISSIONS)

    def has_background(self) -> bool:
        return bool(self.perms & BACKGROUND_PERMISSIONS)

    def has_packer(self) -> bool:
        return bool(self.info.dex_hits.get("packer"))

    def has_strong_integrity(self) -> bool:
        return bool(self.info.dex_hits.get("strong_integrity"))

    def has_local_sig(self) -> bool:
        return bool(self.info.dex_hits.get("local_signature"))

    def has_anti_debug(self) -> bool:
        return bool(self.info.dex_hits.get("anti_debug"))

    def exported_components(self, types: Optional[set[str]] = None) -> list[dict[str, Any]]:
        out = []
        for c in self.info.components:
            if types and c.get("type") not in types:
                continue
            if c.get("exported_effective"):
                out.append(c)
        return out

    def trigger_components(self) -> list[dict[str, Any]]:
        return self.exported_components(COMPONENT_TAGS)

    def evaluate(self) -> None:
        info, args = self.info, self.args

        if info.entry_count == 0:
            self.add("FILE", "APK 可读", FAIL, "不是有效 APK/ZIP", hard=True)
        else:
            self.add("FILE", "APK 可读", PASS, f"{info.entry_count} 个 ZIP 条目")

        if info.package:
            self.add("PACKAGE", "包名 / 版本", PASS,
                     f"{info.package} versionName={info.version_name} versionCode={info.version_code}")
        else:
            self.add("PACKAGE", "包名 / 版本", WARN, "aapt2 未解析出包名；检查工具或 APK")

        if info.split_apk:
            self.add("SPLIT", "单 APK", FAIL,
                     "发现 Split 结构: " + ", ".join(info.split_evidence), hard=True)
        else:
            self.add("SPLIT", "单 APK", PASS, "未发现 split_config/base.apk")

        if info.signature_ok is True:
            ev = f"schemes={','.join(info.signature_schemes) or 'unknown'}"
            if info.cert_dn:
                ev += f"; cert={info.cert_dn}"
            self.add("SIGNATURE", "签名校验", PASS, ev)
        elif info.signature_ok is False:
            self.add("SIGNATURE", "签名校验", FAIL, "apksigner verify 失败", hard=True)
        else:
            self.add("SIGNATURE", "签名校验", WARN, "apksigner 不可用或输出无法判定")

        if info.signature_schemes == ["v1"]:
            self.add("SIG_SCHEME", "签名方案", WARN, "仅 v1；重签/安装兼容性较差")

        if info.test_only:
            self.add("TEST_ONLY", "非 testOnly", FAIL, "manifest 标记 testOnly", hard=True)
        else:
            self.add("TEST_ONLY", "非 testOnly", PASS, "未标记 testOnly")

        if args.authorized == "no":
            self.add("AUTH", "合法性 / 授权", FAIL, "命令行标记为未授权", hard=True)
        elif args.authorized == "yes":
            self.add("AUTH", "合法性 / 授权", PASS, "命令行标记为已授权")
        else:
            self.add("AUTH", "合法性 / 授权", WARN, "未声明授权状态（--authorized unknown）")

        if args.resign_tested == "no":
            self.add("RESIGN", "重签后能启动", FAIL, "命令行标记为重签后无法启动", hard=True)
        elif args.resign_tested == "yes":
            self.add("RESIGN", "重签后能启动", PASS, "命令行标记为已通过阶段 1 验证")
        else:
            self.add("RESIGN", "重签后能启动", WARN, "静态工具无法验证；需按阶段 1 实测")

        if info.min_sdk is None:
            self.add("MINSDK", "minSdk 兼容", WARN, "未解析到 minSdk")
        elif info.min_sdk <= args.device_api:
            self.add("MINSDK", "minSdk 兼容", PASS, f"minSdk={info.min_sdk} <= deviceApi={args.device_api}")
        else:
            self.add("MINSDK", "minSdk 兼容", FAIL,
                     f"minSdk={info.min_sdk} > deviceApi={args.device_api}", hard=True)

        if info.native_libs:
            if not args.device_abi:
                self.add("ABI", "ABI 兼容", WARN,
                         f"含 native libs {info.lib_abis}；未指定 --device-abi")
            elif args.device_abi in info.lib_abis:
                self.add("ABI", "ABI 兼容", PASS, f"deviceAbi={args.device_abi} 在 {info.lib_abis}")
            else:
                self.add("ABI", "ABI 兼容", FAIL,
                         f"deviceAbi={args.device_abi} 不在 {info.lib_abis}", hard=True)
        else:
            self.add("ABI", "ABI 兼容", PASS, "纯 Java/Kotlin，无 native libs")

        if info.target_sdk is not None:
            ev = f"targetSdk={info.target_sdk}, deviceApi={args.device_api}"
            if info.target_sdk >= 34 and args.device_api >= 34 and args.api34_verified != "yes":
                self.add("API34", "API 34+ 运行时", FAIL,
                         ev + "；target>=34 且 loader 内存路径未标记为已验证",
                         hard=True)
            elif info.target_sdk >= 34 and args.device_api < 34:
                self.add("API34", "API 34+ 运行时", WARN,
                         ev + "；先用 API 33 验业务链，再上 34+ 验 loader")
            else:
                self.add("API34", "API 34+ 运行时", PASS, ev)

        packer_hits = info.dex_hits.get("packer", [])
        if packer_hits:
            self.add("PACKER", "无加固 / 壳", FAIL, "; ".join(packer_hits[:6]), hard=True)
        else:
            self.add("PACKER", "无加固 / 壳", PASS, "未命中加固 so / DEX 字符串特征")

        strong_hits = info.dex_hits.get("strong_integrity", [])
        if strong_hits:
            status = WARN if args.ignore_integrity else FAIL
            self.add("INTEGRITY_STRONG", "强完整性校验", status,
                     "; ".join(strong_hits[:6]) + ("（--ignore-integrity 已降级）" if args.ignore_integrity else ""),
                     hard=not args.ignore_integrity)
        else:
            self.add("INTEGRITY_STRONG", "强完整性校验", PASS, "未命中 Play Integrity / SafetyNet / attestation")

        local_hits = info.dex_hits.get("local_signature", [])
        if local_hits:
            self.add("INTEGRITY_LOCAL", "本地签名校验", WARN, "; ".join(local_hits[:6]))
        else:
            self.add("INTEGRITY_LOCAL", "本地签名校验", PASS, "未命中签名校验关键字")

        anti_hits = info.dex_hits.get("anti_debug", [])
        if anti_hits:
            self.add("ANTI_DEBUG", "反调试 / root / 模拟器检测", WARN, "; ".join(anti_hits[:6]))
        else:
            self.add("ANTI_DEBUG", "反调试 / root / 模拟器检测", PASS, "未命中反调试关键字")

        triggers = self.trigger_components()
        if info.launchable_activity:
            self.add("TRIGGER", "可触发入口", PASS,
                     f"launchable-activity={info.launchable_activity}；exported={len(triggers)}")
        elif triggers:
            self.add("TRIGGER", "可触发入口", PASS,
                     "exported 组件: " + ", ".join(c["name"] or c["type"] for c in triggers[:8]))
        else:
            self.add("TRIGGER", "可触发入口", FAIL,
                     "无 launchable-activity，也无 exported 组件", hard=True)

        if self.has_internet():
            self.add("PERM_INTERNET", "INTERNET 权限", PASS, "已声明")
        else:
            self.add("PERM_INTERNET", "INTERNET 权限", FAIL, "未声明 INTERNET", hard=True)

        if self.has_storage():
            hit = sorted(self.perms & STORAGE_PERMISSIONS)
            self.add("PERM_STORAGE", "存储权限", PASS, ", ".join(hit))
        else:
            self.add("PERM_STORAGE", "存储权限", FAIL,
                     "未声明 READ_EXTERNAL_STORAGE / READ_MEDIA_IMAGES / MANAGE_EXTERNAL_STORAGE",
                     hard=True)

        if self.has_background():
            self.add("PERM_BG", "后台能力", PASS,
                     ", ".join(sorted(self.perms & BACKGROUND_PERMISSIONS)))
        else:
            self.add("PERM_BG", "后台能力", WARN, "未声明 FOREGROUND_SERVICE / BOOT_COMPLETED / WAKE_LOCK")

        if args.c2_scheme == "http" and info.target_sdk is not None and info.target_sdk >= 28:
            if info.uses_cleartext is True:
                self.add("CLEARTEXT", "明文 HTTP", PASS, "usesCleartextTraffic=true")
            elif info.uses_cleartext is False:
                self.add("CLEARTEXT", "明文 HTTP", WARN,
                         "usesCleartextTraffic=false；HTTP C2 可能被拦截")
            else:
                self.add("CLEARTEXT", "明文 HTTP", WARN,
                         "targetSdk>=28 且未显式允许 cleartext；HTTP C2 可能被拦截"
                         + (f"（networkSecurityConfig={info.network_security_config}）"
                            if info.network_security_config else ""))

        if len(info.dex_files) > 3:
            self.add("DEX_COUNT", "DEX 数量", WARN, f"{len(info.dex_files)} 个 DEX")
        else:
            self.add("DEX_COUNT", "DEX 数量", PASS, f"{len(info.dex_files)} 个 DEX")

        if info.size > 200 * 1024 * 1024:
            self.add("SIZE", "APK 体积", WARN, f"{info.size / 1024 / 1024:.1f} MiB")
        else:
            self.add("SIZE", "APK 体积", PASS, f"{info.size / 1024 / 1024:.1f} MiB")

        if len(info.processes) > 1:
            self.add("PROCESS", "进程模型", WARN,
                     "多进程: " + ", ".join(info.processes[:8]) + "；确认 loader 在触发进程")
        else:
            self.add("PROCESS", "进程模型", PASS, "单进程或未声明额外进程")

        if info.debuggable:
            self.add("DEBUGGABLE", "可观测性", PASS, "debuggable=true，可用 run-as")
        else:
            self.add("DEBUGGABLE", "可观测性", WARN, "release 包；run-as/logcat 需实测")

        self.add("PERMISSIONS", "权限清单", INFO,
                 ", ".join(sorted(self.perms)) or "（无）")

        if info.components:
            self.add("COMPONENTS", "组件清单", INFO,
                     "; ".join(
                         f"{c['type']}:{c['name'] or '?'}(exported={c['exported_effective']})"
                         for c in info.components[:12]
                     ))

        self._score()

    def _score(self) -> None:
        info, args = self.info, self.args
        items: list[ScoreItem] = []

        legality = {"yes": 15, "unknown": 8, "no": 0}[args.authorized]
        items.append(ScoreItem("legality", "合法性与来源", 15, legality,
                               f"--authorized {args.authorized}"))

        sig_pts = 5 if info.signature_ok is True else 2 if info.signature_ok is None else 0
        test_pts = 3 if not info.test_only else 0
        min_pts = 3 if (info.min_sdk is not None and info.min_sdk <= args.device_api) else 1
        resign_pts = {"yes": 4, "unknown": 1, "no": 0}[args.resign_tested]
        items.append(ScoreItem("resign", "重签与安装", 15,
                               sig_pts + test_pts + min_pts + resign_pts,
                               f"签名={sig_pts}/5, testOnly={test_pts}/3, minSdk={min_pts}/3, 重签实测={resign_pts}/4"))

        integrity = 20
        reasons = []
        if self.has_packer():
            integrity -= 10
            reasons.append("加固 -10")
        if self.has_strong_integrity():
            integrity -= 10
            reasons.append("强完整性 -10")
        if self.has_local_sig():
            integrity -= 5
            reasons.append("本地签名校验 -5")
        if self.has_anti_debug():
            integrity -= 3
            reasons.append("反调试 -3")
        integrity = max(0, integrity)
        items.append(ScoreItem("integrity", "完整性校验", 20, integrity,
                               "; ".join(reasons) or "未命中校验特征"))

        trigger = 0
        if info.launchable_activity:
            trigger += 8
        if self.exported_components({"activity", "activity-alias", "service"}):
            trigger += 5
        if self.exported_components({"receiver", "provider"}):
            trigger += 2
        trigger = min(15, trigger)
        items.append(ScoreItem("trigger", "触发入口", 15, trigger,
                               f"launchable={'yes' if info.launchable_activity else 'no'}, "
                               f"exported={len(self.exported_components())}"))

        perm = 0
        if self.has_internet():
            perm += 5
        if self.has_storage():
            perm += 4
        if self.has_background():
            perm += 1
        items.append(ScoreItem("permissions", "权限", 10, min(10, perm),
                               f"INTERNET={self.has_internet()}, storage={self.has_storage()}, bg={self.has_background()}"))

        api_pts = 4 if (info.min_sdk is not None and info.min_sdk <= args.device_api) else 0
        if info.target_sdk is None:
            api_pts += 1
        elif info.target_sdk > args.device_api:
            api_pts += 2
        else:
            api_pts += 3
        if not info.native_libs:
            abi_pts = 3
        elif not args.device_abi:
            abi_pts = 2
        elif args.device_abi in info.lib_abis:
            abi_pts = 3
        else:
            abi_pts = 0
        items.append(ScoreItem("api_abi", "API / ABI 兼容", 10, min(10, api_pts + abi_pts),
                               f"minSdk/api={api_pts}/7, ABI={abi_pts}/3"))

        structure = 0
        structure += 4 if not info.split_apk else 0
        structure += 3 if not self.has_packer() else 0
        structure += 2 if len(info.dex_files) <= 3 else (1 if len(info.dex_files) <= 6 else 0)
        structure += 1 if info.size <= 150 * 1024 * 1024 else 0
        items.append(ScoreItem("structure", "结构简单度", 10, structure,
                               f"single={not info.split_apk}, dex={len(info.dex_files)}, "
                               f"size={info.size / 1024 / 1024:.1f}MiB"))

        obs = 5 if info.debuggable else 2
        items.append(ScoreItem("observability", "可观测性", 5, obs,
                               "debuggable=true" if info.debuggable else "release/不可 run-as（未验证）"))

        self.scores = items

    @property
    def total(self) -> int:
        return sum(s.earned for s in self.scores)

    @property
    def hard_failed(self) -> list[Finding]:
        return [f for f in self.findings if f.hard_gate and f.status == FAIL]

    @property
    def warnings(self) -> list[Finding]:
        return [f for f in self.findings if f.status == WARN]

    def verdict(self) -> tuple[str, str]:
        if self.hard_failed:
            return "不适合（硬门槛失败）", "RED"
        score = self.total
        if score >= 85:
            return "优先候选", "GREEN"
        if score >= 70:
            return "有条件适合", "YELLOW"
        if score >= 55:
            return "高风险候选", "YELLOW"
        return "不适合（评分过低）", "RED"

    def trigger_command(self) -> str:
        info = self.info
        pkg = info.package or "<package>"
        comp = info.launchable_activity
        if not comp:
            acts = self.exported_components({"activity", "activity-alias"})
            comp = acts[0]["name"] if acts else ""
        if comp:
            if comp.startswith(pkg + "/"):
                target = comp
            elif comp.startswith(pkg + "."):
                target = f"{pkg}/{comp}"
            else:
                target = f"{pkg}/{comp}"
            return f"adb shell am start -n {target} --ez fromHome true"
        services = self.exported_components({"service"})
        if services:
            return f"adb shell am startservice -n {pkg}/{services[0]['name']}"
        receivers = self.exported_components({"receiver"})
        if receivers:
            return f"adb shell am broadcast -n {pkg}/{receivers[0]['name']}"
        return "（未找到可直接触发的组件；需从宿主正常入口打开）"

    def usage_ideas(self) -> list[str]:
        info, args = self.info, self.args
        ideas: list[str] = []

        ideas.append(
            "阶段 1（必做）：只重签、不改代码，安装并启动。"
            "命令见 README；若启动即退出，先解决签名/完整性校验，不要急着加 loader。"
        )
        ideas.append(f"触发入口：{self.trigger_command()}")

        grant = []
        if "android.permission.READ_EXTERNAL_STORAGE" in self.perms and args.device_api <= 32:
            grant.append(f"adb shell pm grant {info.package or '<pkg>'} android.permission.READ_EXTERNAL_STORAGE")
        if "android.permission.READ_MEDIA_IMAGES" in self.perms and args.device_api >= 33:
            grant.append(f"adb shell pm grant {info.package or '<pkg>'} android.permission.READ_MEDIA_IMAGES")
        if "android.permission.MANAGE_EXTERNAL_STORAGE" in self.perms:
            grant.append(f"adb shell appops set {info.package or '<pkg>'} MANAGE_EXTERNAL_STORAGE allow")
        if grant:
            ideas.append("权限继承：" + "；".join(grant))
        else:
            ideas.append("权限继承：宿主已声明存储/网络权限；payload 没有 UI，不能自己申请。")

        if args.device_api >= 34:
            ideas.append(
                "loader 路径：API 34+ 优先 InMemoryDexClassLoader(ByteBuffer)，"
                "失败回退只读文件 DexClassLoader；当前项目 API 34+ 运行时仍未验证。"
            )
        elif args.device_api >= 26:
            ideas.append(
                "loader 路径：API 26–33 使用只读文件 DexClassLoader（当前项目 API 33 已验证）。"
            )
        else:
            ideas.append("loader 路径：API 23–25 使用文件 DexClassLoader；注意旧存储权限模型。")

        if self.has_packer():
            ideas.append("存在加固特征：先脱壳/找真实 DEX，或换一个无壳宿主；否则 loader 可能加载不到真实代码。")
        if info.split_apk:
            ideas.append("Split APK：先用 bundletool 生成 universal APK，或直接换单 APK。")
        if self.has_strong_integrity():
            ideas.append("存在强完整性校验（Play Integrity/SafetyNet/attestation）：改包后可能被服务端拒绝，需先确认可绕过。")
        if self.has_local_sig():
            ideas.append("存在本地签名校验：优先 patch 掉校验逻辑，或用 hook 让校验看到原证书。")
        if self.has_anti_debug():
            ideas.append("存在反调试/root/模拟器检测：先在真机或更干净的环境验证，必要时绕过。")
        if args.c2_scheme == "http" and info.target_sdk is not None and info.target_sdk >= 28 and info.uses_cleartext is not True:
            ideas.append("HTTP C2 风险：targetSdk>=28 默认禁明文；改用 HTTPS，或在宿主 manifest/networkSecurityConfig 放行。")
        if len(info.processes) > 1:
            ideas.append("多进程宿主：确认触发组件所在进程与 loader 执行进程一致；loader 只在被触发的进程里跑。")
        if info.debuggable:
            ideas.append("可观测：debuggable=true，可用 run-as 读私有目录和 mj_state 诊断字段。")
        else:
            ideas.append("可观测：release 包，优先用 logcat + 服务端证据；必要时先用 debug 包验证链路。")

        ideas.append(
            "阶段 2–5：空 loader 日志 → 空 DEX 反射 → 真实 payload → 冷启动/重复触发/断网/重装/升级回归。"
        )
        return ideas

def build_report(info: ApkInfo, evaluator: Evaluator, args: argparse.Namespace,
                 tools: dict[str, str]) -> dict[str, Any]:
    verdict, light = evaluator.verdict()
    return {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "apk": asdict(info),
        "options": {
            "device_api": args.device_api,
            "device_abi": args.device_abi,
            "authorized": args.authorized,
            "resign_tested": args.resign_tested,
            "api34_verified": args.api34_verified,
            "c2_scheme": args.c2_scheme,
            "ignore_integrity": args.ignore_integrity,
        },
        "tools": tools,
        "summary": {
            "verdict": verdict,
            "light": light,
            "score": evaluator.total,
            "max_score": sum(s.weight for s in evaluator.scores),
            "hard_failures": [f"{f.title}: {f.evidence}" for f in evaluator.hard_failed],
            "warnings": [f"{f.title}: {f.evidence}" for f in evaluator.warnings],
        },
        "findings": [asdict(f) for f in evaluator.findings],
        "scores": [asdict(s) for s in evaluator.scores],
        "usage_ideas": evaluator.usage_ideas(),
    }

def render_console(report: dict[str, Any]) -> str:
    apk = report["apk"]
    summary = report["summary"]
    lines: list[str] = []
    lines.append("=" * 72)
    lines.append("白加黑宿主 APK 静态筛选报告")
    lines.append("=" * 72)
    lines.append(f"APK      : {apk['path']}")
    lines.append(f"包名     : {apk['package'] or '(未解析)'}")
    lines.append(f"版本     : {apk['version_name']} ({apk['version_code']})")
    lines.append(f"大小     : {apk['size'] / 1024 / 1024:.1f} MiB")
    lines.append(f"min/targetSdk : {apk['min_sdk']} / {apk['target_sdk']}")
    lines.append(f"签名     : {'OK' if apk['signature_ok'] else apk['signature_ok']} "
                 f"{','.join(apk['signature_schemes']) or ''}")
    lines.append(f"结论     : [{summary['light']}] {summary['verdict']}")
    lines.append(f"评分     : {summary['score']} / {summary['max_score']}")
    lines.append("")

    lines.append("-- 硬门槛 / 关键检查 --")
    for f in report["findings"]:
        if f["status"] == INFO:
            continue
        mark = {"PASS": "[OK]", "WARN": "[!]", "FAIL": "[X]"}.get(f["status"], "[?]")
        gate = " (hard)" if f["hard_gate"] else ""
        lines.append(f"{mark} {f['title']}{gate}: {f['evidence']}")
    lines.append("")

    lines.append("-- 评分明细 --")
    for s in report["scores"]:
        lines.append(f"{s['title']:<16} {s['earned']:>2}/{s['weight']:<2}  {s['reason']}")
    lines.append("")

    lines.append("-- 利用思路 --")
    for i, idea in enumerate(report["usage_ideas"], 1):
        lines.append(f"{i}. {idea}")
    lines.append("")

    if summary["hard_failures"]:
        lines.append("-- 硬门槛失败 --")
        for x in summary["hard_failures"]:
            lines.append(f"  - {x}")
    elif summary["warnings"]:
        lines.append("-- 黄灯 / 待人工确认 --")
        for x in summary["warnings"]:
            lines.append(f"  - {x}")
    lines.append("=" * 72)
    return "\n".join(lines)

def render_markdown(report: dict[str, Any]) -> str:
    apk = report["apk"]
    summary = report["summary"]
    lines: list[str] = []
    lines.append("# 白加黑宿主 APK 静态筛选报告")
    lines.append("")
    lines.append(f"- 生成时间：{report['generated_at']}")
    lines.append(f"- APK：`{apk['path']}`")
    lines.append(f"- 包名：`{apk['package']}`")
    lines.append(f"- 版本：{apk['version_name']} ({apk['version_code']})")
    lines.append(f"- 大小：{apk['size'] / 1024 / 1024:.1f} MiB")
    lines.append(f"- minSdk / targetSdk：{apk['min_sdk']} / {apk['target_sdk']}")
    lines.append(f"- 结论：**{summary['verdict']}**（{summary['score']}/{summary['max_score']}）")
    lines.append("")

    lines.append("## 1. 硬门槛 / 关键检查")
    lines.append("")
    lines.append("| 状态 | 检查项 | 证据 |")
    lines.append("|---|---|---|")
    mark = {"PASS": "OK", "WARN": "WARN", "FAIL": "FAIL", "INFO": "INFO"}
    for f in report["findings"]:
        if f["status"] == INFO:
            continue
        lines.append(f"| {mark.get(f['status'], f['status'])} | {f['title']}"
                     f"{'（硬门槛）' if f['hard_gate'] else ''} | {f['evidence']} |")
    lines.append("")

    lines.append("## 2. 评分明细")
    lines.append("")
    lines.append("| 维度 | 得分 | 说明 |")
    lines.append("|---|---:|---|")
    for s in report["scores"]:
        lines.append(f"| {s['title']} | {s['earned']}/{s['weight']} | {s['reason']} |")
    lines.append("")

    lines.append("## 3. 利用思路")
    lines.append("")
    for i, idea in enumerate(report["usage_ideas"], 1):
        lines.append(f"{i}. {idea}")
    lines.append("")

    lines.append("## 4. 明细")
    lines.append("")
    lines.append(f"- 权限：{', '.join(apk['permissions']) or '（无）'}")
    lines.append(f"- DEX：{', '.join(apk['dex_files']) or '（无）'}")
    lines.append(f"- ABI：{', '.join(apk['lib_abis']) or '（无 native）'}")
    lines.append(f"- Split：{apk['split_apk']} {apk['split_evidence']}")
    lines.append(f"- 签名证书：{apk['cert_dn'] or '（未知）'}")
    lines.append(f"- 进程：{', '.join(apk['processes']) or '（单进程/未声明）'}")
    lines.append("")
    return "\n".join(lines)

def parse_args(argv: Optional[list[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="白加黑宿主 APK 静态筛选器（依据白加黑APK选型操作手册）",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--apk", required=True, help="候选 APK 路径")
    parser.add_argument("--device-api", type=int, default=33, help="目标设备 API level")
    parser.add_argument("--device-abi", default=None,
                        help="目标设备 ABI，例如 x86_64 / arm64-v8a；不填则不做硬性 ABI 判断")
    parser.add_argument("--authorized", choices=["yes", "no", "unknown"], default="unknown",
                        help="是否已获授权改造")
    parser.add_argument("--resign-tested", choices=["yes", "no", "unknown"], default="unknown",
                        help="是否已完成“只重签不改代码”的启动验证")
    parser.add_argument("--api34-verified", choices=["yes", "no", "unknown"], default="unknown",
                        help="API 34+ loader 运行时是否已验证")
    parser.add_argument("--c2-scheme", choices=["http", "https"], default="http",
                        help="payload 的 C2 使用明文还是 TLS")
    parser.add_argument("--ignore-integrity", action="store_true",
                        help="把强完整性校验从硬门槛降级为警告")
    parser.add_argument("--aapt2", default=None, help="aapt2 路径")
    parser.add_argument("--apksigner", default=None, help="apksigner 路径")
    parser.add_argument("--json", default=None, help="输出 JSON 报告路径")
    parser.add_argument("--md", default=None, help="输出 Markdown 报告路径")
    parser.add_argument("--quiet", action="store_true", help="只输出 JSON/文件，不打印控制台报告")
    return parser.parse_args(argv)

def main(argv: Optional[list[str]] = None) -> int:

    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    args = parse_args(argv)
    apk_path = Path(args.apk)
    if not apk_path.exists():
        print(f"[X] APK 不存在: {apk_path}", file=sys.stderr)
        return 2

    info = ApkInfo(path=str(apk_path.resolve()), size=apk_path.stat().st_size)
    tools: dict[str, str] = {}

    scan_zip(info)

    aapt2 = _resolve_tool(args.aapt2, "AAPT2", DEFAULT_AAPT2)
    if aapt2:
        tools["aapt2"] = str(aapt2)
        rc, out = _run_tool(aapt2, ["dump", "badging", str(apk_path)])
        if rc == 0:
            parse_badging(info, out)
        else:
            info.tool_notes.append(f"aapt2 badging 失败 rc={rc}: {out[:300]}")

        rc2, out2 = _run_tool(aapt2, ["dump", "xmltree", "--file", "AndroidManifest.xml", str(apk_path)])
        if rc2 == 0:
            parse_manifest_tree(info, out2)
        else:
            info.tool_notes.append(f"aapt2 xmltree 失败 rc={rc2}: {out2[:300]}")
    else:
        info.tool_notes.append("未找到 aapt2；包名/权限/组件可能不完整")

    apksigner = _resolve_tool(args.apksigner, "APKSIGNER", DEFAULT_APKSIGNER)
    if apksigner:
        tools["apksigner"] = str(apksigner)
        rc, out = _run_tool(apksigner, ["verify", "--verbose", "--print-certs", str(apk_path)])
        parse_apksigner(info, rc, out)
        if rc != 0:
            info.tool_notes.append(f"apksigner verify rc={rc}")
    else:
        info.tool_notes.append("未找到 apksigner；签名校验未执行")

    evaluator = Evaluator(info, args)
    evaluator.evaluate()
    report = build_report(info, evaluator, args, tools)

    if args.json:
        json_path = Path(args.json)
        json_path.parent.mkdir(parents=True, exist_ok=True)
        json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.md:
        md_path = Path(args.md)
        md_path.parent.mkdir(parents=True, exist_ok=True)
        md_path.write_text(render_markdown(report), encoding="utf-8")

    if not args.quiet:
        print(render_console(report))

    return 0 if not evaluator.hard_failed else 1

if __name__ == "__main__":
    raise SystemExit(main())
