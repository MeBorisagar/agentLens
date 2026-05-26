import requests

API_URL = "http://localhost:8001/api/v1/traces"


def send_trace(payload: dict):
    try:
        response = requests.post(
            API_URL,
            json=payload,
            timeout=5,
        )

        return response.json()

    except Exception as e:
        print(
            "[AgentLens] Failed to send trace:",
            e,
        )