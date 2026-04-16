import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function WikiValeMas() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="wiki-vale-mas" />
      <WikiH1>Por qué esta wiki vale más que su código</WikiH1>

      <WikiP>
        El código implementa; la wiki decide <em>qué</em> vale la pena implementar, <em>por qué</em> y con <em>qué límites éticos</em>.
        Por eso el valor civilizatorio no está solo en los repositorios, sino en la arquitectura de sentido que esta documentación sostiene.
      </WikiP>

      <WikiH2>Matriz de valor</WikiH2>
      <WikiTable
        headers={["Capa", "Lo que codifica", "Valor generado"]}
        rows={[
          ["Identidad", "ISNI, SSI, DIDs y PIDs", "Soberanía y portabilidad de personas e instituciones"],
          ["Operación", "Flujos y protocolos MD-X", "Ejecución territorial con trazabilidad"],
          ["Ética", "Criterios DEKATEOTL + BookPI", "Responsabilidad verificable"],
          ["Memoria", "Versionado y narrativa técnica", "Continuidad intergeneracional del ecosistema"],
        ]}
      />

      <WikiCard title="Principio" accent="green">
        Si una IA y un equipo humano pueden reconstruir el sistema leyendo esta wiki, entonces la wiki es parte del activo estratégico,
        no solo documentación auxiliar.
      </WikiCard>
    </div>
  );
}
