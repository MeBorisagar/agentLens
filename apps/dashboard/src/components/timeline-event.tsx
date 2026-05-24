import { TraceEvent } from "@/types/trace";
import { getEventIcon } from "@/lib/event-icons";

interface Props {
  event: TraceEvent;
  isLast?: boolean;
}

export function TimelineEvent({
  event,
  isLast,
}: Props) {
  const Icon = getEventIcon(
    event.event_type
  );

  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <Icon className="w-5 h-5 text-zinc-200" />
        </div>

        {!isLast && (
          <div className="w-px flex-1 bg-zinc-800 min-h-[40px]" />
        )}

      </div>

      <div className="flex-1 pb-8">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold text-zinc-100">
                {event.event_type}
              </h3>

              <p className="text-sm text-zinc-400 mt-1">
                Step {event.step_number}
              </p>
            </div>

            {event.latency_ms && (
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                {event.latency_ms} ms
              </div>
            )}

          </div>

          <pre className="mt-4 bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-auto text-sm text-zinc-300">
            {JSON.stringify(
              event.payload,
              null,
              2
            )}
          </pre>

        </div>

      </div>

    </div>
  );
}