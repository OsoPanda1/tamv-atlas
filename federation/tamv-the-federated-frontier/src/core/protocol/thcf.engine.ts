import { ThcfInput, ThcfResult } from "./thcf.types";

function scoreByLength(text: string): 0 | 2 | 4 | 5 {
  if (!text.trim()) return 0;
  if (text.length < 25) return 2;
  if (text.length < 240) return 5;
  return 4;
}

function hasHumanValue(text: string): boolean {
  const tokens = ["usuario", "persona", "privacidad", "claridad", "autonomía", "seguridad", "aprendizaje"];
  const lc = text.toLowerCase();
  return tokens.some((t) => lc.includes(t));
}

export class TamvHumanCoherenceFilter {
  evaluate(input: ThcfInput): ThcfResult {
    const understandable = scoreByLength(input.summary);
    const justifiable = hasHumanValue(input.userValue) ? 5 : 2;
    const coherent = hasHumanValue(input.operationalNotes) ? 5 : 3;
    const limited = scoreByLength(input.limits);

    const reasons: string[] = [];
    if (understandable < 4) reasons.push("La explicación del módulo no es lo bastante simple.");
    if (justifiable < 4) reasons.push("No se justifica claramente el valor humano.");
    if (coherent < 4) reasons.push("No hay evidencia suficiente de coherencia operacional.");
    if (limited < 4) reasons.push("Faltan límites y condiciones de cierre.");

    const approvedForCore = reasons.length === 0;
    return {
      moduleId: input.moduleId,
      understandable,
      justifiable,
      coherent,
      limited,
      approvedForCore,
      decision: approvedForCore ? "approved" : reasons.length >= 3 ? "rejected" : "rework",
      reasons: approvedForCore ? ["Módulo claro, útil y cerrable para núcleo inicial."] : reasons,
    };
  }
}
