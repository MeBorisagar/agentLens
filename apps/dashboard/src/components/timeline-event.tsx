"use client";
import { TraceEvent } from "@/types/trace";
import { getEventIcon } from "@/lib/event-icons";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getLatencyWidth } from "@/lib/latency";
import { getEventStyles } from "@/lib/event-styles";
import { useEffect, useRef } from "react";
import { getEventLabel }
from "@/lib/event-labels";


interface Props {
  event: TraceEvent;
  isLast?: boolean;

  maxLatency: number;
}


export function TimelineEvent({
  event,
  isLast,
  maxLatency,
}: Props) {

    const [expanded, setExpanded] =
    useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);
  
  const styles = getEventStyles(
    event.event_type
  );

  const latencyWidth = event.latency_ms
  ? getLatencyWidth(
      event.latency_ms,
      maxLatency
    )
  : 0;

  const Icon = getEventIcon(
    event.event_type
  );

  const isLLMEvent =
  event.event_type ===
    "llm_call_started" ||
  event.event_type ===
    "llm_call_finished";

  
  const payload = event.payload;


  const isStartedEvent =
  event.event_type.endsWith(
    "_started"
  );
  
  return (
    <div
  ref={ref}
  className="flex gap-4"
>

      <div className="flex flex-col items-center">

        <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${styles.iconBg}`}>
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>

        {!isLast && (
          <div className="w-px flex-1 bg-zinc-800 min-h-[40px]" />
        )}

      </div>

      <div className="flex-1 pb-8">

        <div className={`border rounded-xl p-5 hover:border-zinc-700 transition ${
  event.event_type === "error"
    ? "bg-red-500/5 border-red-500/20"
    : "bg-zinc-900 border-zinc-800"
}`}>

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold text-zinc-100">
                <div className={`mt-2 inline-flex px-2 py-1 rounded-md border text-xs ${styles.badge}`}>
  {getEventLabel(
  event.event_type
)}
</div>
                
              </h3>

          

              <p className="text-sm text-zinc-400 mt-1">
                Step {event.step_number}
              </p>
            </div>

   {event.event_type === "error" && (
  <div className="mt-3 inline-flex px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
    Exception / Failure Event
  </div>
)}
 {event.latency_ms &&
    event.latency_ms > 1000 && 
    event.event_type !== "error" &&(
      <div className="mt-2 inline-flex px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
        Slow execution step
      </div>
  )}
{event.latency_ms &&
    event.latency_ms > -1 && event.latency_ms < 1000 &&
    event.event_type !== "error" &&(
      <div className="mt-2 inline-flex px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
         {`Latency: ${event.latency_ms} ms`}
      </div>
  )}
 
          
            <div className="flex items-center gap-3">

  {event.latency_ms  && (
  <div className="min-w-[180px]">

    <div className="flex items-center justify-between mb-1">

      <span className="text-xs text-zinc-400">
        Latency
      </span>

      <span className="text-xs text-blue-400 font-medium">
        {event.latency_ms} ms
      </span>

    </div>

    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">

      <div
        className={`h-full rounded-full ${
          event.latency_ms > 1000
            ? "bg-red-500"
            : event.latency_ms > 500
            ? "bg-amber-400"
            : "bg-blue-500"
        }`}
        style={{
          width: `${latencyWidth}%`,
        }}
      />

    </div>

  </div>
)}

  <button
    onClick={() =>
      setExpanded(!expanded)
    }
    className="p-2 rounded-lg hover:bg-zinc-800 transition"
  >
    <ChevronDown
      className={`w-4 h-4 transition-transform ${
        expanded ? "rotate-180" : ""
      }`}
    />
  </button>

</div>
          </div>

         {expanded && !isStartedEvent && (

  isLLMEvent ? (

    <div className="mt-4 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm">

      <div className="space-y-2">

        <div>
          <span className="text-zinc-500">
            Provider:
          </span>{" "}
          {payload.provider}
        </div>

        <div>
          <span className="text-zinc-500">
            Model:
          </span>{" "}
          {payload.model}
        </div>

        {payload.total_tokens !==
          undefined && (
          <div>
            <span className="text-zinc-500">
              Tokens:
            </span>{" "}
            {payload.total_tokens}
          </div>
        )}

        <div className="mt-4">
          <div className="text-zinc-500 mb-1">
            Prompt
          </div>

          <div className="bg-zinc-900 rounded p-3">
            {payload.prompt}
          </div>
        </div>

        {payload.response && (
          <div className="mt-4">
            <div className="text-zinc-500 mb-1">
              Response
            </div>

            <div className="bg-zinc-900 rounded p-3">
              {payload.response}
            </div>
          </div>
        )}

      </div>

    </div>

  ) : (

    <pre className="mt-4 bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-auto text-sm text-zinc-300">
      {JSON.stringify(
        event.payload,
        null,
        2
      )}
    </pre>

  )
)}

        </div>

      </div>

    </div>
  );
}