export interface Trace {
  id: string;
  agent_name: string | null;
  status: string;

  total_tokens: number;
  total_cost: number;

  created_at: string;
}