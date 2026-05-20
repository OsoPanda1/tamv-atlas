import { tamvOpenWebCatalog, TamvOpenWebSource } from "@/data/tamv-open-web-catalog";
import { TamvHumanCoherenceFilter } from "../protocol/thcf.engine";

export interface CatalogModuleSeed {
  id: string;
  name: string;
  summary: string;
  userValue: string;
  operationalNotes: string;
  limits: string;
}

export class TamvCatalogService {
  constructor(private readonly thcf: TamvHumanCoherenceFilter) {}

  listSources(): TamvOpenWebSource[] {
    return [...tamvOpenWebCatalog];
  }

  buildInitialModuleSeeds(): CatalogModuleSeed[] {
    return [
      {
        id: "mdx4_protocol_core",
        name: "MD-X4 Protocol Core",
        summary: "Orquesta decisiones de protocolos con evaluación ética y trazabilidad técnica.",
        userValue: "Aporta claridad y seguridad para cada usuario en acciones críticas.",
        operationalNotes: "Integra EOCT + MSR + BookPI para evidencia auditable.",
        limits: "Incluye decisión, registro y narrativa. No incluye monetización ni recomendación.",
      },
      {
        id: "rdm_digital_node",
        name: "RDM Digital Node",
        summary: "Gestiona componentes base para experiencias locales y servicios XR interoperables.",
        userValue: "Mejora acceso de personas y comercios locales con flujos claros.",
        operationalNotes: "Usa DreamSpaces y reglas de acceso explícitas.",
        limits: "Incluye catálogo, acceso y telemetría ligera. No incluye vigilancia masiva.",
      },
      {
        id: "utamv_learning",
        name: "UTAMV Learning",
        summary: "Módulo de rutas formativas con progresión visible y objetivos comprensibles.",
        userValue: "Facilita aprendizaje y autonomía con lenguaje simple.",
        operationalNotes: "Permisos claros y trazabilidad de progreso.",
        limits: "Incluye cursos y evidencia de avance. No incluye ranking adictivo.",
      },
    ];
  }

  evaluateSeed(seed: CatalogModuleSeed) {
    return this.thcf.evaluate({
      moduleId: seed.id,
      summary: seed.summary,
      userValue: seed.userValue,
      operationalNotes: seed.operationalNotes,
      limits: seed.limits,
    });
  }
}
