import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function GrafoConocimiento() {
  return (
    <div>
      <WikiBreadcrumb section="arquitectura" page="grafo-conocimiento" />
      <WikiH1>Grafo de Conocimiento TAMV</WikiH1>
      <WikiP>
        El grafo de conocimiento TAMV conecta todas las entidades del ecosistema en una red semántica navegable: personas, organizaciones, territorios, proyectos, publicaciones y módulos de código.
      </WikiP>

      <WikiH2>Nodos del grafo</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Edwin O. Castillo Trejo</strong> → ORCID: 0009-0008-5050-1539 → Fundador de TAMV Online Network</li>
          <li><strong>TAMV Online Network</strong> → Organización → Real del Monte, Hidalgo</li>
          <li><strong>MD‑X4</strong> → Arquitectura → Kernel heptafederado</li>
          <li><strong>Isabella IA</strong> → IA ética → Reconocida AVIXA</li>
          <li><strong>RDM‑TOS</strong> → Nodo territorial → Gemelo digital Real del Monte</li>
          <li><strong>UTAMV</strong> → Campus educativo → DOI: 10.5281/zenodo.19562517</li>
          <li><strong>Blockchain MSR</strong> → Ledger → BookPI (SHA-256)</li>
        </ul>
      </WikiCard>

      <WikiH2>Integración con identificadores globales</WikiH2>
      <WikiP>
        El grafo se enlaza con sistemas de identificación persistente globales: ORCID para personas, DOI para publicaciones y datasets, ISNI para identidades de nombres y ROR para organizaciones de investigación. Esto permite que el conocimiento generado en TAMV sea descubrible y citable desde cualquier sistema académico o científico del mundo.
      </WikiP>

      <WikiH2>Integración con OpenAIRE</WikiH2>
      <WikiP>
        Las publicaciones del ecosistema están registradas en OpenAIRE, permitiendo su indexación en el grafo europeo de ciencia abierta. Esto conecta la producción intelectual de TAMV con la infraestructura global de Open Science y Open Access.
      </WikiP>
    </div>
  );
}
