import { MsrEngine } from "../memory/msr.engine";

export class ProtocolMsrAdapter {
  constructor(private readonly msr: MsrEngine) {}

  registerProtocolEvent(actorId: string, payload: Record<string, unknown>): string {
    return this.msr.emit("protocol.execution", actorId, payload).id;
  }
}
