"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateTraceName,
} from "@/lib/traces";

export function useUpdateTrace() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      traceId,
      traceName,
    }: {
      traceId: string;
      traceName: string;
    }) =>
      updateTraceName(
        traceId,
        traceName
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "trace",
          variables.traceId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["traces"],
      });
    },
  });
}