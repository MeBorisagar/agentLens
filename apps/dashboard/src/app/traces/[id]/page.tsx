import { getTrace } from "@/lib/traces";
import { TimelineEvent } from "@/components/timeline-event";
import { getMaxLatency } from "@/lib/latency";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TraceDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const trace = await getTrace(id);

  const maxLatency = getMaxLatency(
  trace.events
);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {trace.agent_name || "Unnamed Agent"}
          </h1>

          <p className="text-gray-500 mt-2">
            Trace ID: {trace.id}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-400">
             <div
  className={`inline-flex px-3 py-1 rounded-full text-sm border ${
    trace.status === "completed"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-red-500/10 text-red-400 border-red-500/20"
  }`}
>
  {trace.status}
</div>
            </div>

            <p className="font-semibold mt-1">
              {trace.status}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-sm text-zinc-400">
              Tokens
            </p>

            <p className="font-semibold mt-1">
              {trace.total_tokens}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Cost
            </p>

            <p className="font-semibold mt-1">
              ${trace.total_cost}
            </p>
          </div>

         <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

  <p className="text-sm text-zinc-400">
    Duration
  </p>

  <p className="font-semibold mt-1">
    {trace.events.reduce(
      (acc, event) =>
        acc + (event.latency_ms || 0),
      0
    )}{" "}
    ms
  </p>

</div>
        </div>

        <div className="mt-10">

  <div className="mb-6">
    <h2 className="text-2xl font-semibold">
      Execution Timeline
    </h2>

    <p className="text-zinc-400 mt-1">
      Visual trace of the agent execution
    </p>
  </div>

  <div>

    {trace.events.length === 0 ? (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center text-zinc-400">
        No events found for this trace.
      </div>
    ) : (
      trace.events.map((event, index) => (
       <TimelineEvent
       
  key={event.id}
  event={event}
  maxLatency={maxLatency}
  isLast={
    index === trace.events.length - 1
  }
  
/>
      ))
    )}

  </div>

</div>

      </div>
    </main>
  );
}