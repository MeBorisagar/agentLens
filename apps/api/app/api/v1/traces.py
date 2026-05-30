from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.db.deps import get_db
from app.schemas.trace import (
    TraceCreate,
    TraceResponse,
    TraceUpdate,
)
from app.services.trace_service import (
    create_trace,
    get_traces,
    get_trace_by_id,
)
from fastapi import APIRouter, Depends, HTTPException

from app.models.trace import Trace

router = APIRouter()


@router.post("/traces")
def create_trace_endpoint(
    trace_data: TraceCreate,
    db: Session = Depends(get_db),
):
    trace = create_trace(db, trace_data)

    return {
        "trace_id": str(trace.id),
        "status": "success",
    }

@router.get("/traces", response_model=list[TraceResponse])
def list_traces(
    db: Session = Depends(get_db),
):
    return get_traces(db)


@router.get("/traces/{trace_id}", response_model=TraceResponse)
def get_trace(
    trace_id: str,
    db: Session = Depends(get_db),
):
    trace = get_trace_by_id(db, trace_id)

    if not trace:
        raise HTTPException(
            status_code=404,
            detail="Trace not found",
        )

    return trace

@router.delete("/traces/{trace_id}")
def delete_trace(
    trace_id: str,
    db: Session = Depends(get_db),
): 
    trace = (
    db.query(Trace)
    .filter(Trace.id == trace_id)
    .first()
   )

    if not trace:
        raise HTTPException(
            status_code=404,
            detail="Trace not found",
        )

    db.delete(trace)
    db.commit()

    return {
        "message": "Trace deleted"
    }


@router.patch("/traces/{trace_id}")
def update_trace(
    trace_id: str,
    payload: TraceUpdate,
    db: Session = Depends(get_db),
):
    trace = (
    db.query(Trace)
    .filter(Trace.id == trace_id)
    .first()
)

    if not trace:
        raise HTTPException(
            status_code=404,
            detail="Trace not found",
        )
    
    trace.trace_name = payload.trace_name

    db.commit()
    db.refresh(trace)

    return {
    "id": str(trace.id),
    "trace_name": trace.trace_name,
    }