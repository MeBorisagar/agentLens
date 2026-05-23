from datetime import datetime

from sqlalchemy.orm import Session

from app.models.trace import Trace
from app.models.trace_event import TraceEvent
from app.schemas.trace import TraceCreate

from sqlalchemy import desc
from sqlalchemy.orm import joinedload

def create_trace(db: Session, trace_data: TraceCreate):
    trace = Trace(
        session_id=trace_data.session_id,
        agent_name=trace_data.agent_name,
        status=trace_data.status,
        total_tokens=trace_data.total_tokens,
        total_cost=trace_data.total_cost,
        start_time=trace_data.start_time or datetime.utcnow(),
        end_time=trace_data.end_time,
    )

    db.add(trace)
    db.commit()
    db.refresh(trace)

    for event_data in trace_data.events:
        event = TraceEvent(
            trace_id=trace.id,
            event_type=event_data.event_type,
            step_number=event_data.step_number,
            payload=event_data.payload,
            latency_ms=event_data.latency_ms,
        )

        db.add(event)

    db.commit()

    return trace

def get_traces(db: Session):
    return (
        db.query(Trace)
        .order_by(desc(Trace.created_at))
        .all()
    )


def get_trace_by_id(db: Session, trace_id: str):
    return (
        db.query(Trace)
        .options(joinedload(Trace.events))
        .filter(Trace.id == trace_id)
        .first()
    )