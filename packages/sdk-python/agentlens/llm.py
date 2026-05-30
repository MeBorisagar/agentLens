import time

from agentlens.context import CURRENT_TRACE


# def log_llm_call(
#     model: str,
#     prompt: str,
#     response: str,
#     latency_ms: int = 0,
#     tokens: int = 0,
# ):
#     step = CURRENT_TRACE["step"]

#     CURRENT_TRACE["events"].append({
#         "event_type": "llm_call_finished",
#         "step_number": step,
#         "payload": {
#             "model": model,
#             "prompt": prompt,
#             "response": response,
#             "tokens": tokens,
#         },
#         "latency_ms": latency_ms,
#     })

#     CURRENT_TRACE["step"] += 1


def log_llm_started(
    model: str,
    prompt: str,
):
    step = CURRENT_TRACE["step"]

    CURRENT_TRACE["events"].append({
        "event_type": "llm_call_started",
        "step_number": step,
        "payload": {
            "model": model,
            "prompt": prompt,
        },
        "latency_ms": 0,
    })

    CURRENT_TRACE["step"] += 1    


def log_llm_finished(
    model: str,
    prompt: str,
    response: str,
    latency_ms: int,
    tokens: int = 0,
):
    step = CURRENT_TRACE["step"]

    CURRENT_TRACE["events"].append({
        "event_type": "llm_call_finished",
        "step_number": step,
        "payload": {
            "model": model,
            "prompt": prompt,
            "response": response,
            "tokens": tokens,
        },
        "latency_ms": latency_ms,
    })

    CURRENT_TRACE["step"] += 1    