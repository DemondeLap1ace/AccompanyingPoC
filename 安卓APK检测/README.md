# apk_selector：白加黑宿主 APK 静态筛选器

输入一个候选 APK，输出：**硬门槛是否通过 + 100 分评分 + 红黄绿结论 + 利用思路**。

只做静态预筛，不替代“重签后实际启动”的动态验证。仅用于已授权的安全测试 / 教学 / 自有应用改造。

## 快速开始

```bash
cd F:/mj_work/plan_b/apk_selector

# 最小用法
python -I selector.py --apk 'F:/path/to/candidate.apk'

# 推荐：带目标设备信息并输出报告
python -I selector.py \
  --apk 'F:/path/to/candidate.apk' \
  --device-api 33 --device-abi x86_64 \
  --authorized yes --resign-tested unknown \
  --json reports/candidate.json \
  --md  reports/candidate.md
```

当前宿主自检：

```bash
python -I selector.py \
  --apk 'F:/mj_pdf_reader-main/mj_pdf_reader-main/app/build/outputs/apk/debug/app-debug.apk' \
  --device-api 33 --device-abi x86_64 \
  --authorized yes --resign-tested yes \
  --json reports/mjpdfreader.json --md reports/mjpdfreader.md
```

实测结果：`com.gitlab.mudlej.MjPdfReader`，3.1.0 (58)，89/100，GREEN，优先候选。主要黄灯：targetSdk 36 尚未在 API 34+ 验证、静态命中本地签名/反调试 API、19 个 DEX。

## 依赖

- Python 3，单文件、无第三方库
- 可选外部工具（缺失时相关项只给 WARN）：
  - `F:/AndroidSdk/build-tools/36.0.0/aapt2.exe`
  - `F:/AndroidSdk/build-tools/36.0.0/apksigner.bat`

## 参数

| 参数 | 默认 | 作用 |
|---|---|---|
| `--apk` | 必填 | 候选 APK 路径 |
| `--device-api` | `33` | 目标设备 API level |
| `--device-abi` | 无 | 目标 ABI，如 `x86_64`、`arm64-v8a` |
| `--authorized` | `unknown` | 是否已获授权改造；`no` 直接硬失败 |
| `--resign-tested` | `unknown` | 是否已完成“只重签不改代码”的启动验证；`no` 直接硬失败 |
| `--api34-verified` | `unknown` | API 34+ loader 内存路径是否已验证 |
| `--c2-scheme` | `http` | C2 明文/HTTPS，用于检查 cleartext 策略 |
| `--ignore-integrity` | 关 | 把强完整性校验降级为 WARN |
| `--aapt2` / `--apksigner` | 自动 | 指定工具路径 |
| `--json` / `--md` | 无 | 输出 JSON / Markdown 报告 |
| `--quiet` | 关 | 不打印控制台报告 |

`--resign-tested` 和 `--api34-verified` 是**人工输入**：静态工具只能判断“看起来有没有校验”，不能证明“重签后一定活着”。

退出码：`0` 硬门槛全过；`1` 有硬门槛失败；`2` APK 不存在。

## 检查内容

1. **ZIP 结构**：DEX 数量、`lib/<abi>/`、assets、split APK、v1 签名痕迹。
2. **DEX 字符串**：加固/壳、Play Integrity / SafetyNet、本地签名校验、反调试 / root / 模拟器 / Frida / Xposed。
3. **aapt2 badging**：包名、版本、minSdk/targetSdk、launchable-activity、权限。
4. **Manifest xmltree**：debuggable、testOnly、usesCleartextTraffic、组件与 exported、launcher。
5. **apksigner**：签名有效性、v1/v2/v3/v3.1/v4、证书信息。
6. **评分与结论**：硬门槛、100 分、红黄绿、利用思路。

### 硬门槛

任一失败即淘汰：APK 可读、单 APK、签名有效、非 testOnly、重签后能启动、已授权、minSdk 兼容、ABI 兼容、无加固、无强完整性校验、有可触发入口、INTERNET、存储权限、API 34+ 已验证。

### 评分

满分 100：

| 维度 | 权重 |
|---|---:|
| 合法性与来源 | 15 |
| 重签与安装 | 15 |
| 完整性校验 | 20 |
| 触发入口 | 15 |
| 权限 | 10 |
| API / ABI 兼容 | 10 |
| 结构简单度 | 10 |
| 可观测性 | 5 |

结论：有硬门槛失败 → 不适合；`>=85` 优先候选（GREEN）；`70–84` 有条件适合；`55–69` 高风险；`<55` 不适合（RED）。

## 输出怎么读

- `[OK]`：通过
- `[!]`：警告，需人工确认
- `[X]`：硬门槛失败
- `(hard)`：该检查是硬门槛

JSON 适合批量筛选/二次处理，Markdown 适合贴记录。

## 已知误报

- `getSignatures` / `getApkContentsSigners`：AndroidX、WorkManager 等依赖也会引用。
- `isDebuggerConnected`：部分日志/调试库会调用。
- `emulator` / `root` / `legu` 等关键字：业务字符串或普通 so 名可能命中。
- `base.apk`：少数普通 APK 也可能带同名资源。

原则：**静态工具缩小范围，阶段 1 重签启动做最终判决。**

## 局限

1. 不能证明“重签后能启动”，必须做阶段 1。
2. 完整性/加固是字符串和 so 特征启发式，会误报也会漏报。
3. 不解析 DEX 方法调用关系，不区分宿主自身校验与依赖库校验。
4. 不自动合并 Split APK，只做标记。
5. 不修改 APK，重签/插桩/patch 需另外做。

## 一页速查

```bash
python -I selector.py --apk candidate.apk

python -I selector.py \
  --apk candidate.apk \
  --device-api 33 --device-abi x86_64 \
  --authorized yes --resign-tested unknown \
  --json reports/candidate.json --md reports/candidate.md
```

三句话：

```text
先看硬门槛，再看分数；
分数只用于排序，阶段 1 才决定生死；
静态命中是线索，不是判决。
```
