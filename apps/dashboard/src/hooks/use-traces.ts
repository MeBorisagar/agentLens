"use client";

import { useQuery } from "@tanstack/react-query";

import { getTraces } from "@/lib/traces";

export function useTraces() {
  return useQuery({
    queryKey: ["traces"],
    queryFn: getTraces,
  });
}