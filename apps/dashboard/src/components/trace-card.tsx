"use client";

import Link from "next/link";
import { AlertTriangle, Trash2 } from "lucide-react";

import { Trace } from "@/types/trace";
import { useDeleteTrace } from "@/hooks/use-delete-trace";

interface Props {
  trace: Trace;
}

export function TraceCard({ trace }: Props) {
  const isFailed = trace.status === "failed";

  const deleteMutation = useDeleteTrace();

  return (
    <Link href={`/traces/${trace.id}`}>
      <div
        className={`border rounded-xl p-4 bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer ${
          isFailed ? "border-red-500/30" : "border-zinc-800"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-lg text-zinc-100">
             {trace.trace_name ||
  trace.agent_name ||
  "Unnamed Agent"}
            </h2>

            <p className="text-sm text-zinc-400">
              {trace.id}
            </p>

            {isFailed && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Failure detected
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (
                  confirm(
                    "Delete this trace permanently?"
                  )
                ) {
                  deleteMutation.mutate(trace.id);
                }
              }}
              className="p-2 rounded-lg border border-zinc-700 hover:border-red-500/30 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition"
              title="Delete trace"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div
              className={`px-3 py-1 rounded-full text-sm ${
                trace.status === "completed"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/15 text-red-400 border border-red-500/20"
              }`}
            >
              {trace.status}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-zinc-400">Tokens</p>
            <p className="font-medium text-zinc-100">
              {trace.total_tokens}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Cost</p>
            <p className="font-medium text-zinc-100">
              ${trace.total_cost}
            </p>
          </div>

          <div>
            <p className="text-zinc-400">Created</p>
            <p className="font-medium text-zinc-100">
              {new Date(
                trace.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}