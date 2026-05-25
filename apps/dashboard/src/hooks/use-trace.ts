"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrace } from "@/lib/traces";

export function useTrace(
  traceId: string
) {
  return useQuery({
    queryKey: ["trace", traceId],

    queryFn: () => getTrace(traceId),

    refetchInterval: 2000,
  });
}