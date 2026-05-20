import { ProtocolDecisionInput } from "../protocol/protocol.types";

export interface EoctAssessment {
  allowed: boolean;
  reasons: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
}

export class EoctService {
  evaluate(input: ProtocolDecisionInput): EoctAssessment {
    const riskyWords = ["manipular", "coercion", "dark-pattern", "fear-porn"];
    const text = JSON.stringify(input.context).toLowerCase();
    const hit = riskyWords.find((w) => text.includes(w));

    if (hit) {
      return { allowed: false, reasons: [`Detectado patrón no permitido: ${hit}`], riskLevel: "high" };
    }

    return { allowed: true, reasons: ["Cumple regla Do-No-Harm"], riskLevel: "low" };
  }
}
