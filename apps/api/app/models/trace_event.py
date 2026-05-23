import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from app.db.base import Base


class TraceEvent(Base):
    __tablename__ = "trace_events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    trace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("traces.id"),
    )

    event_type: Mapped[str] = mapped_column(
        String,
    )

    step_number: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    payload: Mapped[dict] = mapped_column(
        JSONB,
    )

    latency_ms: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(timezone.utc),
    )

    trace = relationship(
    "Trace",
    back_populates="events",
    )