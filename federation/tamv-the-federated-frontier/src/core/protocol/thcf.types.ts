export type ThcfScore = 0 | 1 | 2 | 3 | 4 | 5;

export interface ThcfInput {
  moduleId: string;
  summary: string;
  userValue: string;
  operationalNotes: string;
  limits: string;
}

export interface ThcfResult {
  moduleId: string;
  understandable: ThcfScore;
  justifiable: ThcfScore;
  coherent: ThcfScore;
  limited: ThcfScore;
  approvedForCore: boolean;
  decision: "approved" | "rework" | "rejected";
  reasons: string[];
}
