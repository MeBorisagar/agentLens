import { Trace } from "@/types/trace";
import Link from "next/link";

interface Props {
  trace: Trace;
}

export function TraceCard({ trace }: Props) {
  return (
    <Link href={`/traces/${trace.id}`}>
    <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg text-zinc-100">
            {trace.agent_name || "Unnamed Agent"}
          </h2>

          <p className="text-sm text-zinc-400">
            {trace.id}
          </p>
        </div>

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
          <p className="font-medium text-zinc-100 ">
            {new Date(trace.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
}