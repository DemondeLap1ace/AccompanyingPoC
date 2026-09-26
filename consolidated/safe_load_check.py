import sys
from pathlib import Path

import onnx

HERE = Path(__file__).resolve().parent
DEFAULT_MODEL = HERE / "p021__orphan_payload__popup.onnx"


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_MODEL
    print(f"[1] onnx.load({path.name})")
    model = onnx.load(path)
    print(f"    {len(model.graph.node)} nodes / {len(model.graph.initializer)} initializers, no code executed")

    onnx.checker.check_model(model)
    print("    onnx.checker: PASS")

    try:
        import onnxruntime as ort
    except ImportError:
        print("[2] onnxruntime not installed, skipping inference session test")
        return

    sess = ort.InferenceSession(str(path), providers=["CPUExecutionProvider"])
    print(f"[2] onnxruntime session: {[i.name for i in sess.get_inputs()]} -> {[o.name for o in sess.get_outputs()]}")


if __name__ == "__main__":
    main()
