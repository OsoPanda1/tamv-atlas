export class IsabellaKernel {
  explainDecision(reasons: string[]): string {
    return `Resumen Isabella: ${reasons.join(" | ")}`;
  }
}
