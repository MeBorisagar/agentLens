import { Trace, TraceEvent } from "@/types/trace";

export function hasErrors(
  trace: Trace
) {
  return trace.events.some(
    (event) =>
      event.event_type === "error"
  );
}

export function getErrorEvents(
  trace: Trace
) {
  return trace.events.filter(
    (event) =>
      event.event_type === "error"
  );
}

export function getSlowEvents(
  trace: Trace
) {
  return trace.events.filter(
    (event) =>
      (event.latency_ms || 0) > 1000
  );
}