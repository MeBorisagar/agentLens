export interface TraceEvent {
  id: string;

  event_type: string;

  step_number: number;

  payload: Record<string, any>;

  latency_ms?: number;
}

export interface Trace {
  id: string;

  agent_name: string | null;

  status: string;

  total_tokens: number;

  total_cost: number;

  created_at: string;

  start_time: string;

  end_time?: string;

  events: TraceEvent[];
}