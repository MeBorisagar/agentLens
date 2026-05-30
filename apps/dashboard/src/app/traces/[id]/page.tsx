"use client";
import { useTrace } from "@/hooks/use-trace";
import { TimelineEvent } from "@/components/timeline-event";
import { getMaxLatency } from "@/lib/latency";
import { use } from "react";
import {
  hasErrors,
  getErrorEvents,
  getSlowEvents,
} from "@/lib/trace-analysis";
import { useEffect, useState } from "react";
import {
  useUpdateTrace,
} from "@/hooks/use-update-trace";

import {
  AlertTriangle,
  Clock3,
} from "lucide-react";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function TraceDetailPage({
  params,
}: Props) {
  const { id } = use(params);

  const {
  data: trace,
  isLoading,
} = useTrace(id);

const [traceName, setTraceName] =
  useState("");

const updateTraceMutation =
  useUpdateTrace();

  useEffect(() => {
    if (trace?.trace_name) {
      setTraceName(trace.trace_name);
    }
  }, [trace]);  

if (isLoading || !trace) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="text-zinc-400">
        Loading trace...
      </div>
    </main>
  );
}
  // const [traceName, setTraceName] =
  // useState(
  //   trace.trace_name || ""
  // );

  // const updateTraceMutation =
  //   useUpdateTrace();

  const maxLatency = getMaxLatency(
  trace.events
);

const traceHasErrors =
  hasErrors(trace);

const errorEvents =
  getErrorEvents(trace);

const slowEvents =
  getSlowEvents(trace);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
         <h1 className="text-3xl font-bold">
  {trace.trace_name ||
    trace.agent_name}
</h1>

<p className="text-zinc-500 mt-1">
  Agent: {trace.agent_name}
</p>

          <p className="text-gray-500 mt-2">
            Trace ID: {trace.id}
          </p>

          <div className="mt-6 flex items-center gap-3">

  <input
    value={traceName}
    onChange={(e) =>
      setTraceName(e.target.value)
    }
    placeholder="Give this trace a name"
    className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 w-96"
  />

  <button
    onClick={() =>
      updateTraceMutation.mutate({
        traceId: trace.id,
        traceName,
      })
    }
    disabled={
      updateTraceMutation.isPending
    }
    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
  >
    {updateTraceMutation.isPending
      ? "Saving..."
      : "Save"}
  </button>

</div>

        
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">

  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

  Live Trace Streaming

</div>

        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-400">
              <p >
              Trace Status
            </p>

            </div>
           
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

{traceHasErrors && (
  <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">

    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-400" />
      </div>

      <div>

        <h2 className="text-lg font-semibold text-red-400">
          Execution Failure Detected
        </h2>

        <p className="text-zinc-300 mt-1">
          This trace contains{" "}
          {errorEvents.length} error event(s).
        </p>

      </div>

    </div>

  </div>
)}

{slowEvents.length > 0 && (
  <div className="mb-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">

    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
        <Clock3 className="w-5 h-5 text-amber-400" />
      </div>

      <div>

        <h2 className="text-lg font-semibold text-amber-400">
          Performance Warning
        </h2>

        <p className="text-zinc-300 mt-1">
          {slowEvents.length} slow execution step(s)
          detected.
        </p>

      </div>

    </div>

  </div>
)}



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