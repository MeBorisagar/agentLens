"use client";
import { useTraces } from "@/hooks/use-traces";
import { TraceCard } from "@/components/trace-card";

export default function HomePage() {
 const {
  data: traces = [],
  isLoading,
} = useTraces();

  if (isLoading) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="text-zinc-400">
        Loading traces...
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight">
            AgentLens
          </h1>

          <p className="text-zinc-400 mt-2">
            AI Agent Observability Dashboard
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">

    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

    Live Updates Enabled

  </div>
        </div>

        <div className="space-y-4">
          {traces.map((trace) => (
            <TraceCard
              key={trace.id}
              trace={trace}
            />
          ))}
        </div>
      </div>
    </main>
  );
}