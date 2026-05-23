from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.traces import router as traces_router

app = FastAPI(title="AgentLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(
    traces_router,
    prefix="/api/v1",
    tags=["traces"],
)