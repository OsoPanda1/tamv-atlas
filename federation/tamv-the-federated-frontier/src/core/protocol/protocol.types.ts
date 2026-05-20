export type TamvLayer = "L0"|"L1"|"L2"|"L3"|"L4"|"L5"|"L6"|"L7";

export type ProtocolRiskLevel = "low" | "medium" | "high" | "critical";

export interface ProtocolDecisionInput {
  protocolId: string;
  action: string;
  actorId: string;
  context: Record<string, unknown>;
}

export interface ProtocolDecision {
  approved: boolean;
  reasons: string[];
  riskLevel: ProtocolRiskLevel;
  layer: TamvLayer;
}

export interface ProtocolExecutionResult {
  decision: ProtocolDecision;
  msrEventId: string;
  bookpiEntryId: string;
  executedAt: string;
}
