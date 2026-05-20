import { ProtocolEngine } from "./protocol.engine";
import { ProtocolDecisionInput, ProtocolExecutionResult } from "./protocol.types";
import { nextLifecycleState, ProtocolLifecycleState } from "./protocol.lifecycle";

export class ProtocolOrchestrator {
  constructor(private readonly engine: ProtocolEngine) {}

  run(input: ProtocolDecisionInput): { state: ProtocolLifecycleState; result: ProtocolExecutionResult } {
    let state: ProtocolLifecycleState = "draft";
    state = nextLifecycleState(state, true);

    const result = this.engine.execute(input);
    state = nextLifecycleState(state, result.decision.approved);

    if (state === "approved") {
      state = nextLifecycleState(state, true);
    }

    return { state, result };
  }
}
