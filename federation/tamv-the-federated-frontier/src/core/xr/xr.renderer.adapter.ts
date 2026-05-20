import { XrVisualScene } from "./protocol.visual.xr";

export interface RendererInstruction {
  lightingMode: "day" | "dusk" | "alarm";
  overlayMessage: string;
  accentColor: string;
}

export function toRendererInstruction(scene: XrVisualScene): RendererInstruction {
  if (scene.atmosphere === "critical") {
    return { lightingMode: "alarm", overlayMessage: scene.annotation, accentColor: scene.color };
  }
  if (scene.atmosphere === "attention") {
    return { lightingMode: "dusk", overlayMessage: scene.annotation, accentColor: scene.color };
  }
  return { lightingMode: "day", overlayMessage: scene.annotation, accentColor: scene.color };
}
