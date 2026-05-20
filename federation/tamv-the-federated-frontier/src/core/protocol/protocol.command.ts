export interface ProtocolCommand {
  protocolId: string;
  action: string;
  payload: Record<string, unknown>;
}
