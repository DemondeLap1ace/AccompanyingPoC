from collections import Counter
import math

import onnx


def referenced_inputs(graph, acc):
    for node in graph.node:
        acc.update(node.input)
        for attr in node.attribute:
            if attr.HasField("g"):
                referenced_inputs(attr.g, acc)
            for sg in attr.graphs:
                referenced_inputs(sg, acc)


def entropy(data: bytes) -> float:
    if not data:
        return 0.0
    counts = Counter(data)
    n = len(data)
    return -sum(c / n * math.log2(c / n) for c in counts.values())


def printable_ratio(data: bytes) -> float:
    return sum(1 for b in data if 32 <= b < 127 or b in (9, 10, 13)) / max(len(data), 1)
