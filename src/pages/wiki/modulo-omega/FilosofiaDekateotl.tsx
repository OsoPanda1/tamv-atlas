import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function FilosofiaDekateotl() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="filosofia-dekateotl" />
      <WikiH1>Filosofía de diseño: DEKATEOTL, dignidad y vergüenza en la era de la IA</WikiH1>

      <WikiP>
        En TAMV, la filosofía DEKATEOTL se traduce en un criterio práctico: no existe conocimiento útil sin trazabilidad,
        ni despliegue legítimo sin responsabilidad.
      </WikiP>

      <WikiH2>Aplicación directa en la wiki</WikiH2>
      <WikiCard title="Norma operativa" accent="orange">
        Cada cambio editorial debe ser auditable y cada salida técnica debe poder explicarse a un humano responsable.
      </WikiCard>

      <WikiCode>{`DEKATEOTL aplicado al Atlas
1) Documento vivo > documento estático
2) Trazabilidad > opinión sin respaldo
3) Responsabilidad > automatización ciega
4) Memoria ética (BookPI) > olvido operativo`}</WikiCode>

      <WikiP>
        Esta filosofía incorpora dos ideas incómodas pero necesarias: dignidad en el diseño de sistemas y vergüenza técnica cuando
        un flujo no puede justificarse públicamente.
      </WikiP>
    </div>
  );
}
