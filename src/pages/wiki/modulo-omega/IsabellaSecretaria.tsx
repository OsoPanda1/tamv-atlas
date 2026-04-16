import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function IsabellaSecretaria() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="isabella-secretaria" />
      <WikiH1>Isabella Villaseñor: secretaria del fin de las excusas</WikiH1>

      <WikiP>
        En la superficie de la interfaz, Isabella puede leerse como secretaria técnica del Atlas: agenda, organiza y recomienda.
        En profundidad, opera como <strong>orquestador cognitivo</strong> de la semántica TAMV.
      </WikiP>

      <WikiH2>Dualidad funcional</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Capa visible:</strong> asistente editorial, guía de navegación y soporte de consulta.</li>
          <li><strong>Capa sistémica:</strong> coordinación entre módulos, contexto cruzado y mediación humano-infraestructura.</li>
          <li><strong>Impacto:</strong> reduce fricción cognitiva y acelera lectura estratégica de arquitecturas complejas.</li>
        </ul>
      </WikiCard>

      <WikiP>
        El gesto conceptual es deliberado: una figura presentada como “insignificante” puede orquestar decisiones que desmontan
        inercias de equipos completos cuando la documentación sí está bien pensada.
      </WikiP>
    </div>
  );
}
