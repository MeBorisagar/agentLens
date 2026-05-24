import {
  Brain,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Play,
} from "lucide-react";

export function getEventIcon(
  eventType: string
) {
  switch (eventType) {
    case "trace_started":
      return Play;

    case "llm_call":
      return Brain;

    case "tool_call":
      return Wrench;

    case "trace_finished":
      return CheckCircle;

    case "error":
      return AlertTriangle;

    default:
      return Brain;
  }
}