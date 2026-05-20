import { describe, expect, it } from "vitest";
import { TamvHumanCoherenceFilter } from "@/core/protocol/thcf.engine";
import { ModuleRegistryService } from "@/core/domain/module-registry.service";

describe("THCF", () => {
  it("approves simple modules with clear human value and limits", () => {
    const registry = new ModuleRegistryService(new TamvHumanCoherenceFilter());
    registry.register({
      id: "m1",
      name: "Perfiles básicos",
      summary: "Gestiona perfiles para que cada usuario vea y edite su información de forma simple.",
      userValue: "Mejora claridad para cada usuario y protege privacidad básica.",
      operationalNotes: "Aplica seguridad mínima, claridad de permisos y autonomía del usuario.",
      limits: "Incluye alta, edición y lectura. No incluye recomendaciones ni anuncios.",
    });

    const out = registry.evaluateAndClose("m1");
    expect(out?.status).toBe("closed");
    expect(out?.lastReview?.approvedForCore).toBe(true);
  });

  it("rejects modules without boundaries", () => {
    const registry = new ModuleRegistryService(new TamvHumanCoherenceFilter());
    registry.register({
      id: "m2",
      name: "Todo motor global",
      summary: "",
      userValue: "Sin detalle",
      operationalNotes: "Sin criterios de privacidad.",
      limits: "",
    });

    const out = registry.evaluateAndClose("m2");
    expect(["rejected", "rework"]).toContain(out?.status);
  });
});
