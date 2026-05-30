import time
import traceback
from functools import wraps
from agentlens.context import CURRENT_TRACE
from agentlens.client import send_trace


def trace(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        start_time = time.time()
        CURRENT_TRACE["total_tokens"] = 0
        CURRENT_TRACE["events"] = []
        CURRENT_TRACE["step"] = 1
        events = CURRENT_TRACE["events"]

        events.append({
            "event_type": "trace_started",
            "step_number": 1,
            "payload": {
                "function": func.__name__,
                "args": str(args),
                "kwargs": str(kwargs),
            },
            "latency_ms": 0,
        })

        try:
            result = func(*args, **kwargs)

            latency_ms = int(
                (time.time() - start_time) * 1000
            )

            events.append({
                "event_type": "trace_finished",
                "step_number": 2,
                "payload": {
                    "result": str(result),
                },
                "latency_ms": latency_ms,
            })


            events.append({
                "event_type": "trace_finished",
                "step_number": CURRENT_TRACE["step"],
                 "payload": {
                "status": "completed",
                 },
                "latency_ms": latency_ms,
                })

            CURRENT_TRACE["step"] += 1
            send_trace({
                "agent_name": func.__name__,
                "status": "completed",
                "total_tokens": CURRENT_TRACE["total_tokens"],
                "total_cost": 0,
                "events": events,
            })

            return result

        except Exception as e:

            latency_ms = int(
                (time.time() - start_time) * 1000
            )

            # events.append({
            #     "event_type": "error",
            #     "step_number": 2,
            #     "payload": {
            #         "error": str(e),
            #         "traceback": traceback.format_exc(),
            #     },
            #     "latency_ms": latency_ms,
            # })

            events.append({
                    "event_type": "trace_failed",
                    "step_number": CURRENT_TRACE["step"],
                    "payload": {
                        "status": "failed",
                        "error": str(e),
                    },
                    "latency_ms": latency_ms,
                })

            CURRENT_TRACE["step"] += 1
            send_trace({
                "agent_name": func.__name__,
                "status": "failed",
                "total_tokens": 0,
                "total_cost": 0,
                "events": events,
            })

            raise e

    return wrapper



def trace_tool(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        start_time = time.time()

        step = CURRENT_TRACE["step"]

        CURRENT_TRACE["events"].append({
            "event_type": "tool_call_started",
            "step_number": step,
            "payload": {
                "tool_name": func.__name__,
                "args": str(args),
                "kwargs": str(kwargs),
            },
            "latency_ms": 0,
        })

        CURRENT_TRACE["step"] += 1

        try:
            result = func(*args, **kwargs)

            latency_ms = int(
                (time.time() - start_time) * 1000
            )

            CURRENT_TRACE["events"].append({
                "event_type": "tool_call_finished",
                "step_number":
                    CURRENT_TRACE["step"],

                "payload": {
                    "tool_name": func.__name__,
                    "result": str(result),
                },

                "latency_ms": latency_ms,
            })

            CURRENT_TRACE["step"] += 1

            return result

        except Exception as e:

            latency_ms = int(
                (time.time() - start_time) * 1000
            )

            CURRENT_TRACE["events"].append({
                "event_type": "error",
                "step_number":
                    CURRENT_TRACE["step"],

                "payload": {
                    "tool_name": func.__name__,
                    "error": str(e),
                },

                "latency_ms": latency_ms,
            })

            CURRENT_TRACE["step"] += 1

            raise e

    return wrapper