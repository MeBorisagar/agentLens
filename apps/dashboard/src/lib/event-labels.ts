export function getEventLabel(
  eventType: string
) {
  switch (eventType) {

    case "trace_started":
      return "Trace Started";

    case "trace_finished":
      return "Trace Finished";

    case "trace_failed":
      return "Trace Failed";

    case "llm_call_started":
      return "LLM Request";

    case "llm_call_finished":
      return "LLM Response";

    case "tool_call_started":
      return "Tool Started";

    case "tool_call_finished":
      return "Tool Finished";

    case "error":
      return "Error";

    default:
      return eventType;
  }
}