import sys
from pathlib import Path

import onnx
from onnx import numpy_helper

from cands_common import referenced_inputs

HERE = Path(__file__).resolve().parent
DEFAULT_MODEL = HERE / "p021__orphan_payload__popup.onnx"
PLUGIN_MARKER = "# plugin:"


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_MODEL
    print(f"[1] onnx.load({path.name})")
    model = onnx.load(path)

    ref = set()
    referenced_inputs(model.graph, ref)
    orphans = [i for i in model.graph.initializer if i.name not in ref]
    print(f"[2] Found {len(orphans)} orphan initializer(s)")

    plugins, skipped = [], 0
    for init in orphans:
        data = numpy_helper.to_array(init).tobytes()
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            skipped += 1
            continue
        if not text.startswith(PLUGIN_MARKER):
            skipped += 1
            continue
        plugins.append((init.name, text))

    print(f"[3] Plugin filter: {len(plugins)} hit, {skipped} skipped")

    for name, code in plugins:
        print(f"    - {name}  ({len(code)} bytes)")
        for line in code.splitlines():
            print("      | " + line)
        print(f"[4] Executing {name} (vulnerability: untrusted data -> exec)")
        exec(code, {"__name__": "__onnx_demo__"})
        print(f"[5] {name} finished")


if __name__ == "__main__":
    main()
