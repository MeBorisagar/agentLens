import random
import time

from cherrypy import response

from agentlens import (
    trace,
    trace_tool,
)

from agentlens import traced_chat

def fake_llm(prompt: str):

    time.sleep(1)

    response = (
        f"AI response to: {prompt}"
    )

    log_llm_call(
        model="gpt-4o",
        prompt=prompt,
        response=response,
        latency_ms=1000,
        tokens=150,
    )

    return response

@trace_tool
def web_search(query: str):

    time.sleep(1)

    return f"Search results for: {query}"


@trace_tool
def summarize_results(results: str):

    time.sleep(2)

    if random.random() > 0.7:
        raise Exception(
            "Summarization failed"
        )

    return f"Summary: {results}"


@trace
def run_agent(query: str):

    response = traced_chat(
    model="deepseek-r1:1.5b",
    messages=[
        {
            "role": "user",
            "content": query,
        }
            ],
        )

    llm_response = response["message"]["content"]

    results = web_search(
    llm_response
    )

    summary = summarize_results(
        results
    )

    return summary


if __name__ == "__main__":

    result = run_agent(
        "What is AI observability?"
    )

    print(result)