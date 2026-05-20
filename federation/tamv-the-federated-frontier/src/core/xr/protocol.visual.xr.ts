import { GuardianSignal } from "../guardian/protocol.monitoring.guardian";

export interface XrVisualScene {
  sceneId: string;
  atmosphere: "calm" | "attention" | "critical";
  color: string;
  annotation: string;
}

export function translateGuardianSignalToScene(signal: GuardianSignal): XrVisualScene {
  if (signal.level === "red") return { sceneId: signal.id, atmosphere: "critical", color: "#ff3b30", annotation: signal.message };
  if (signal.level === "orange") return { sceneId: signal.id, atmosphere: "attention", color: "#ff9500", annotation: signal.message };
  return { sceneId: signal.id, atmosphere: "calm", color: "#34c759", annotation: signal.message };
}
