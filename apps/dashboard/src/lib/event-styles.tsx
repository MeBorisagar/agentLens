export function getEventStyles(
  eventType: string
) {
  switch (eventType) {
    case "trace_started":
      return {
        iconBg:
          "bg-blue-500/10 border-blue-500/20",
        iconColor: "text-blue-400",
        badge:
          "bg-blue-500/10 text-blue-400 border-blue-500/20",
      };

    case "llm_call":
      return {
        iconBg:
          "bg-violet-500/10 border-violet-500/20",
        iconColor: "text-violet-400",
        badge:
          "bg-violet-500/10 text-violet-400 border-violet-500/20",
      };

    case "tool_call":
      return {
        iconBg:
          "bg-amber-500/10 border-amber-500/20",
        iconColor: "text-amber-400",
        badge:
          "bg-amber-500/10 text-amber-400 border-amber-500/20",
      };

    case "trace_finished":
      return {
        iconBg:
          "bg-emerald-500/10 border-emerald-500/20",
        iconColor: "text-emerald-400",
        badge:
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };

    case "error":
      return {
        iconBg:
          "bg-red-500/10 border-red-500/20",
        iconColor: "text-red-400",
        badge:
          "bg-red-500/10 text-red-400 border-red-500/20",
      };

    default:
      return {
        iconBg:
          "bg-zinc-800 border-zinc-700",
        iconColor: "text-zinc-300",
        badge:
          "bg-zinc-800 text-zinc-300 border-zinc-700",
      };
  }
}