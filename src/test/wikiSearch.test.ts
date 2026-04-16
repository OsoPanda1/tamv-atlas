import { describe, expect, it } from "vitest";

import { wikiStructure } from "@/data/wikiStructure";
import { searchWikiStructure } from "@/lib/wikiSearch";

describe("searchWikiStructure", () => {
  it("returns empty results when query is empty", () => {
    expect(searchWikiStructure(wikiStructure, "   ")).toEqual([]);
  });

  it("finds pages by title, slug and module", () => {
    const byTitle = searchWikiStructure(wikiStructure, "credenciales");
    expect(byTitle.some((result) => result.slug === "credenciales-vc")).toBe(true);

    const bySlug = searchWikiStructure(wikiStructure, "jsonld-implementacion");
    expect(bySlug[0]?.slug).toBe("jsonld-implementacion");

    const byModule = searchWikiStructure(wikiStructure, "gobernanza");
    expect(byModule.some((result) => result.sectionId === "gobernanza")).toBe(true);
  });

  it("normalizes accents", () => {
    const normalized = searchWikiStructure(wikiStructure, "adopcion");
    expect(normalized.some((result) => result.slug === "roadmap-adopcion")).toBe(true);
  });
});
