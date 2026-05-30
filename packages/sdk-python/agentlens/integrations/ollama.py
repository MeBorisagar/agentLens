import time

import ollama

from agentlens.llm import log_llm_started, log_llm_finished
from agentlens.context import CURRENT_TRACE


def traced_chat(
    model: str,
    messages: list,
):
    start = time.time()

    log_llm_started(
    model=model,
    prompt=str(messages),
    )
    response = ollama.chat(
        model=model,
        messages=messages,
    )

    latency_ms = int(
        (time.time() - start) * 1000
    )

    content = response["message"][
        "content"
    ]

    prompt = str(messages)

    log_llm_finished(
    model=model,
    prompt=str(messages),
    response=content,
    latency_ms=latency_ms,
    )

    return response