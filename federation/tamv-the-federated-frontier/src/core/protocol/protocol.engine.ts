import { EoctService } from "../eoct/eoct.service";
import { ProtocolDecisionInput, ProtocolExecutionResult } from "./protocol.types";
import { ProtocolMsrAdapter } from "./protocol.msr.adapter";
import { ProtocolBookPiAdapter } from "./protocol.bookpi.adapter";

export class ProtocolEngine {
  constructor(
    private readonly eoct: EoctService,
    private readonly msrAdapter: ProtocolMsrAdapter,
    private readonly bookPiAdapter: ProtocolBookPiAdapter,
  ) {}

  execute(input: ProtocolDecisionInput): ProtocolExecutionResult {
    const assessment = this.eoct.evaluate(input);
    const decision = {
      approved: assessment.allowed,
      reasons: assessment.reasons,
      riskLevel: assessment.riskLevel,
      layer: "L2" as const,
    };

    const msrEventId = this.msrAdapter.registerProtocolEvent(input.actorId, {
      protocolId: input.protocolId,
      action: input.action,
      approved: decision.approved,
      reasons: decision.reasons,
    });

    const bookpiEntryId = this.bookPiAdapter.narrate(
      `Protocolo ${input.protocolId}`,
      decision.approved
        ? "La acción fue aprobada porque cumple las reglas éticas y técnicas."
        : "La acción fue bloqueada para proteger a las personas y mantener coherencia.",
      msrEventId,
    );

    return { decision, msrEventId, bookpiEntryId, executedAt: new Date().toISOString() };
  }
}
