import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function RoadmapAdopcion() {
  return (
    <div>
      <WikiBreadcrumb section="casos-uso" page="roadmap-adopcion" />
      <WikiH1>Roadmap de Adopción ISNI en UTAMV</WikiH1>
      <WikiP>
        Fase 1: Perfiles ISNI para docentes y estudiantes con ORCID vinculado. Fase 2: Emisión de credenciales verificables para certificaciones completadas. Fase 3: Activación opcional de DIDs para identidades de alta soberanía.
      </WikiP>
      <WikiCard accent="cyan">
        Fase 4: Wallets SSI y verificación automatizada por terceros.
      </WikiCard>
    </div>
  );
}
