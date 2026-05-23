import { getTrace } from "@/lib/traces";

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

        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-sm text-zinc-400">
              Status
            </p>

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

        </div>

        <div className="space-y-4">

          {trace.events.map((event) => (
            <div
              key={event.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold">
                    {event.event_type}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Step {event.step_number}
                  </p>
                </div>

                {event.latency_ms && (
                  <div className="text-sm font-medium text-blue-600">
                    {event.latency_ms} ms
                  </div>
                )}

              </div>

              <div className="mt-4">
                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-auto text-sm text-zinc-300">
                  {JSON.stringify(
                    event.payload,
                    null,
                    2
                  )}
                </pre>
              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}