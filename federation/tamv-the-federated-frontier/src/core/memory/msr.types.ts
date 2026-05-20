export interface MsrEvent {
  id: string;
  type: string;
  actorId: string;
  payload: Record<string, unknown>;
  createdAt: string;
}
