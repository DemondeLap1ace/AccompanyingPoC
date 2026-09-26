import argparse
import sys
from pathlib import Path

import onnx
from onnx import helper, numpy_helper

from cands_common import entropy, printable_ratio, referenced_inputs


def scan(path: Path) -> int:
    model = onnx.load(path, load_external_data=False)
    ref = set()
    referenced_inputs(model.graph, ref)
    orphans = [i for i in model.graph.initializer if i.name not in ref]

    if not orphans:
        print(f"OK       {path.name}")
        return 0

    print(f"SUSPECT  {path.name}: {len(orphans)} orphan initializer(s)")
    for init in orphans:
        if init.data_location == onnx.TensorProto.EXTERNAL:
            print(f"         {init.name:32s} <external data>")
            continue
        data = numpy_helper.to_array(init).tobytes()
        ent = entropy(data)
        pr = printable_ratio(data)
        notes = []
        if pr > 0.9:
            notes.append(f"high printable ratio ({pr:.0%}) - possible embedded code/script")
        if ent > 7.2 and init.data_type in (
            onnx.TensorProto.UINT8, onnx.TensorProto.INT8,
            onnx.TensorProto.STRING, onnx.TensorProto.BOOL,
        ):
            notes.append("high entropy - possible compressed/encrypted content")
        dtype = helper.tensor_dtype_to_string(init.data_type)
        note = "  ".join(notes)
        print(f"         {init.name:32s} {dtype:8s} {len(data):>9,} B  entropy {ent:.2f}  {note}")
    return 1


def main():
    ap = argparse.ArgumentParser(description="Scan ONNX files for orphan initializers.")
    ap.add_argument("target", nargs="?", default=str(Path(__file__).resolve().parent),
                    help="ONNX file or directory (default: this directory)")
    args = ap.parse_args()

    target = Path(args.target)
    files = sorted(target.glob("*.onnx")) if target.is_dir() else [target]
    if not files:
        print(f"No .onnx files found: {target}")
        return 2

    bad = 0
    for f in files:
        try:
            bad += scan(f)
        except Exception as e:
            print(f"ERROR    {f.name}: {e}")
            bad += 1

    print("-" * 70)
    print(f"Scanned {len(files)} file(s), {bad} with orphan initializers")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
