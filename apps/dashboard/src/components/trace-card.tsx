import { Trace } from "@/types/trace";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface Props {
  trace: Trace;
}




export function TraceCard({ trace }: Props) {
  const isFailed =
    trace.status === "failed";
  return (
    <Link href={`/traces/${trace.id}`}>
      
    <div className={`border rounded-xl p-4 bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer ${
  isFailed
    ? "border-red-500/30"
    : "border-zinc-800"
}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg text-zinc-100">
            {trace.agent_name || "Unnamed Agent"}
          </h2>

          <p className="text-sm text-zinc-400">
            {trace.id}
          </p>
        </div>
        
        {isFailed && (
  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">

    <AlertTriangle className="w-4 h-4" />

    Failure detected

  </div>
)}
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

