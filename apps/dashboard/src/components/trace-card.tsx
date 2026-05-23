import { Trace } from "@/types/trace";

interface Props {
  trace: Trace;
}

export function TraceCard({ trace }: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">
            {trace.agent_name || "Unnamed Agent"}
          </h2>

          <p className="text-sm text-gray-500">
            {trace.id}
          </p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm ${
            trace.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trace.status}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Tokens</p>
          <p className="font-medium">
            {trace.total_tokens}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Cost</p>
          <p className="font-medium">
            ${trace.total_cost}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Created</p>
          <p className="font-medium">
            {new Date(trace.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}