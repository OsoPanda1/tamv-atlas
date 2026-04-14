import { WikiH1, WikiH2, WikiBreadcrumb, WikiCard, WikiLink, WikiTable } from "@/components/WikiComponents";

export default function ReferenciasAcademicas() {
  return (
    <div>
      <WikiBreadcrumb section="referencias" page="referencias-academicas" />
      <WikiH1>Referencias Académicas</WikiH1>

      <WikiH2>Publicaciones en Zenodo</WikiH2>
      <WikiTable
        headers={["Título", "DOI", "Tipo"]}
        rows={[
          ["Arquitectura de UTAMV y el Núcleo de IA Académica (Core 2026)", "10.5281/zenodo.19562517", "Technical Report"],
          ["Canon TAMV", "10.5281/zenodo.19436662", "Report"],
          ["Biografía y registro de identidad", "10.5281/zenodo.19411506", "Other"],
          ["Publicación adicional", "10.5281/zenodo.19414631", "Report"],
        ]}
      />

      <WikiH2>White Paper principal</WikiH2>
      <WikiCard accent="cyan">
        <strong>"Arquitectura Técnica y Marco de Gobernanza para UTAMV"</strong> describe la infraestructura y protocolos de UTAMV, un campus digital de educación avanzada diseñado bajo principios de soberanía tecnológica en México. Publicado bajo licencia CC BY 4.0 en las comunidades de Open Science, AI and Society y Educational Technology.
        <div className="mt-2">
          <WikiLink href="https://zenodo.org/records/19562517">Ver en Zenodo ↗</WikiLink>
        </div>
      </WikiCard>

      <WikiH2>Comunidades de investigación</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Open Science (Zenodo)</li>
        <li>AI and Society</li>
        <li>Educational Technology</li>
        <li>OpenAIRE (indexación europea)</li>
      </ul>
    </div>
  );
}
