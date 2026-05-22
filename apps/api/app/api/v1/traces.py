from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.schemas.trace import TraceCreate
from app.services.trace_service import create_trace

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