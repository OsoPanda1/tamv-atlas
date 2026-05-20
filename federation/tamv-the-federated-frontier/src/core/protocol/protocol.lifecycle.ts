export type ProtocolLifecycleState = "draft" | "evaluation" | "approved" | "executed" | "blocked";

export function nextLifecycleState(current: ProtocolLifecycleState, approved: boolean): ProtocolLifecycleState {
  if (current === "draft") return "evaluation";
  if (current === "evaluation") return approved ? "approved" : "blocked";
  if (current === "approved") return "executed";
  return current;
}
