from fastapi import FastAPI

from app.api.v1.traces import router as traces_router

app = FastAPI(title="AgentLens API")


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(
    traces_router,
    prefix="/api/v1",
    tags=["traces"],
)