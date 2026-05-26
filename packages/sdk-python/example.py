import random
import time

from agentlens import trace


@trace
def run_agent(query: str):

    time.sleep(1)

    if random.random() > 0.7:
        raise Exception(
            "LLM hallucinated tool usage"
        )

    return f"Processed: {query}"


if __name__ == "__main__":

    result = run_agent(
        "What is observability?"
    )

    print(result)