import { api } from "./api";
import { Trace } from "@/types/trace";

export async function getTraces(): Promise<Trace[]> {
  const response = await api.get("/traces");

  return response.data;
}