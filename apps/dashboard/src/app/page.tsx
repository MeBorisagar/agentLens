import { getTraces } from "@/lib/traces";
import { TraceCard } from "@/components/trace-card";

export default async function HomePage() {
  const traces = await getTraces();

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