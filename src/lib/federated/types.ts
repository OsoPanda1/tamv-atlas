export type MembershipTier = "free" | "creator" | "guardian" | "institutional";

export type ProtocolPhase = "draft" | "simulating" | "ethical_review" | "active" | "archived";

export interface UserProfile {
  id: string;
  handle: string;
  displayName: string;
  bio?: string;
  roles: string[];
  memberships: MembershipTier[];
  createdAt: string;
}

export interface MsrEvent {
  id: string;
  type: string;
  actorId: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface BookPiEntry {
  id: string;
  eventId: string;
  title: string;
  narrative: string;
  createdAt: string;
}

export interface ProtocolDecisionPath {
  id: string;
  description: string;
  score: number;
  ethicalRisk: number;
}

export interface ProtocolExecution {
  protocolId: string;
  phase: ProtocolPhase;
  selectedPath: ProtocolDecisionPath;
  evaluatedPaths: ProtocolDecisionPath[];
  collapsedAt: string;
}

export interface GuardianSignal {
  id: string;
  protocolId: string;
  severity: "low" | "medium" | "high";
  summary: string;
  generatedAt: string;
}

export interface DreamSpace {
  id: string;
  name: string;
  ownerId: string;
  isPublic: boolean;
  participants: string[];
}

export interface LedgerEntry {
  id: string;
  userId: string;
  kind: "credit" | "debit";
  amount: number;
  reason: string;
  createdAt: string;
}
