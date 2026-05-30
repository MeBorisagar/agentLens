import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Integer, DateTime, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from app.db.base import Base


class Trace(Base):
    __tablename__ = "traces"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    session_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
    )

    agent_name: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )

    trace_name: Mapped[str | None] = mapped_column(
    String,
    nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String,
        default="running",
    )

    total_tokens: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    total_cost: Mapped[float] = mapped_column(
        Numeric,
        default=0,
    )

    start_time: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    end_time: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(timezone.utc),
    )

    events = relationship(
    "TraceEvent",
    back_populates="trace",
    cascade="all, delete-orphan",
    )

   