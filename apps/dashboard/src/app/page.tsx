"use client";
import { useTraces } from "@/hooks/use-traces";
import { TraceCard } from "@/components/trace-card";
import { useMemo, useState } from "react";
export default function HomePage() {
 const {
  data: traces = [],
  isLoading,
} = useTraces();

const [search, setSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("all");

const filteredTraces = useMemo(() => {
  return traces.filter((trace) => {

    const matchesSearch =
      trace.agent_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      trace.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : trace.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });
}, [traces, search, statusFilter]);


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

<div className="mb-8 flex flex-col md:flex-row gap-4">

  <input
    type="text"
    placeholder="Search traces..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-700"
  >
    <option value="all">
      All Statuses
    </option>

    <option value="completed">
      Completed
    </option>

    <option value="failed">
      Failed
    </option>

    <option value="running">
      Running
    </option>

  </select>

</div>

        <div className="space-y-8">
          {filteredTraces.map((trace) => (
            <TraceCard
              key={trace.id}
              trace={trace}
            />
          ))}
          {filteredTraces.length === 0 && (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-10 text-center">

    <h3 className="text-lg font-semibold text-zinc-200">
      No traces found
    </h3>

    <p className="text-zinc-400 mt-2">
      Try adjusting your filters.
    </p>

  </div>

  
)}

        </div>
      </div>
    </main>
  );
}