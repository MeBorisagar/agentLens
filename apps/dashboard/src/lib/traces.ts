import { api } from "./api";
import { Trace } from "@/types/trace";

export async function getTraces(): Promise<Trace[]> {
  const response = await api.get("/traces");

  return response.data;
}

export async function getTrace(
  traceId: string
): Promise<Trace> {
  const response = await api.get(
    `/traces/${traceId}`
  );

  return {
  ...response.data,
  events: response.data.events.sort(
    (a: any, b: any) =>
      a.step_number - b.step_number
  ),
};
}