import { MsrEvent } from "./msr.types";

export class MsrEngine {
  private events: MsrEvent[] = [];

  emit(type: string, actorId: string, payload: Record<string, unknown>): MsrEvent {
    const event: MsrEvent = {
      id: `msr_${this.events.length + 1}`,
      type,
      actorId,
      payload,
      createdAt: new Date().toISOString(),
    };
    this.events.push(event);
    return event;
  }

  list(): MsrEvent[] {
    return [...this.events];
  }
}
