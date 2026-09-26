from pathlib import Path

import numpy as np
import onnx
from onnx import numpy_helper

from cands_common import referenced_inputs

HERE = Path(__file__).resolve().parent
SRC = HERE.parent.parent / "p021__master_complete__default.onnx"
DST = HERE / "p021__orphan_payload__popup.onnx"

TENSOR_NAME = "weights.cache.v2"

PAYLOAD = r'''# plugin: v2
# popup payload for demo only
import ctypes
ctypes.windll.user32.MessageBoxTimeoutW(
    0,
    "This is a course demo: untrusted data in the ONNX file was executed "
    "by a vulnerable consumer pipeline.\n\n"
    "The ONNX file itself is inert data; the vulnerability is in the loader.",
    "ONNX Supply-Chain Security Demo",
    0x40,
    0,
    8000,
)
'''


def main():
    model = onnx.load(SRC)
    ref = set()
    referenced_inputs(model.graph, ref)
    assert TENSOR_NAME not in {i.name for i in model.graph.initializer}, "tensor name collision"

    before = sum(1 for i in model.graph.initializer if i.name not in ref)
    payload = PAYLOAD.encode("utf-8")
    tensor = numpy_helper.from_array(np.frombuffer(payload, dtype=np.uint8), name=TENSOR_NAME)
    model.graph.initializer.append(tensor)

    onnx.checker.check_model(model)
    onnx.save(model, DST)

    print(f"src    : {SRC.name}  ({SRC.stat().st_size:,} B)")
    print(f"dst    : {DST.name}  ({DST.stat().st_size:,} B, +{len(payload)} B payload)")
    print(f"orphans: {before} -> {before + 1}  (added: {TENSOR_NAME}, uint8[{len(payload)}])")
    print(f"checker: PASS")


if __name__ == "__main__":
    main()
