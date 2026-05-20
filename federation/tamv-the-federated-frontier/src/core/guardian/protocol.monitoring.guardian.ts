export type GuardianThreatLevel = "green" | "yellow" | "orange" | "red";

export interface GuardianSignal {
  id: string;
  message: string;
  level: GuardianThreatLevel;
  createdAt: string;
}

export class ProtocolMonitoringGuardian {
  private signals: GuardianSignal[] = [];

  observe(message: string, level: GuardianThreatLevel): GuardianSignal {
    const signal: GuardianSignal = {
      id: `guardian_${this.signals.length + 1}`,
      message,
      level,
      createdAt: new Date().toISOString(),
    };
    this.signals.push(signal);
    return signal;
  }

  list(): GuardianSignal[] {
    return [...this.signals];
  }
}
