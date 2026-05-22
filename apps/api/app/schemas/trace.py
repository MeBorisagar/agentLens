from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class TraceEventCreate(BaseModel):
    event_type: str
    step_number: int = 0
    payload: dict[str, Any]
    latency_ms: int | None = None


class TraceCreate(BaseModel):
    session_id: UUID | None = None
    agent_name: str | None = None
    status: str = "completed"

    total_tokens: int = 0
    total_cost: float = 0

    start_time: datetime | None = None
    end_time: datetime | None = None

    events: list[TraceEventCreate]