from fastapi import FastAPI

app = FastAPI(title="AgentLens API")


@app.get("/health")
def health():
    return {"status": "ok"}