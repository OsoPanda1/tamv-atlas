import { describe, expect, it } from "vitest";
import { TamvCatalogService } from "@/core/catalog/tamv.catalog.service";
import { TamvHumanCoherenceFilter } from "@/core/protocol/thcf.engine";

describe("TAMV open-web catalog integration", () => {
  it("provides source catalog and evaluable module seeds", () => {
    const service = new TamvCatalogService(new TamvHumanCoherenceFilter());
    const sources = service.listSources();
    const seeds = service.buildInitialModuleSeeds();

    expect(sources.length).toBeGreaterThan(2);
    expect(seeds.length).toBeGreaterThan(2);

    const result = service.evaluateSeed(seeds[0]);
    expect(["approved", "rework", "rejected"]).toContain(result.decision);
  });
});
