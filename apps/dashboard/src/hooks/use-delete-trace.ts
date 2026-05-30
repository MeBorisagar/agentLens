"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteTrace,
} from "@/lib/traces";

export function useDeleteTrace() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteTrace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["traces"],
      });
    },
  });
}