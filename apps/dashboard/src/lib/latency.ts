export function getMaxLatency(
  events: {
    latency_ms?: number;
  }[]
) {
  return Math.max(
    ...events.map(
      (event) => event.latency_ms || 0
    ),
    1
  );
}

export function getLatencyWidth(
  latency: number,
  maxLatency: number
) {
  return Math.max(
    (latency / maxLatency) * 100,
    5
  );
}