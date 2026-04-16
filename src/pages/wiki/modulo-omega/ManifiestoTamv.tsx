import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTag } from "@/components/WikiComponents";

export default function ManifiestoTamv() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="manifiesto-tamv" />
      <WikiH1>Manifiesto TAMV: una civilización escrita en código</WikiH1>

      <WikiP>
        TAMV no se presenta como una app, sino como un <strong>ecosistema civilizatorio</strong> donde convergen identidad,
        infraestructura, economía, ética y territorio en un mismo lenguaje operativo.
      </WikiP>

      <div className="flex flex-wrap mb-6 gap-2">
        <WikiTag>ISNI + SSI + DIDs + PIDs</WikiTag>
        <WikiTag>MD-X4/X5</WikiTag>
        <WikiTag>Isabella AI</WikiTag>
        <WikiTag>BookPI</WikiTag>
      </div>

      <WikiH2>Tesis de base</WikiH2>
      <WikiCard accent="cyan">
        La wiki TAMV funciona como <strong>corteza prefrontal</strong> del sistema: aquí el ecosistema se explica, se cuestiona y decide
        qué despliegues merecen pasar del concepto a la operación.
      </WikiCard>

      <WikiP>
        En este marco, la soberanía digital deja de ser discurso y se vuelve método: cada módulo articula conocimiento verificable,
        cada flujo tiene finalidad social, y cada integración mantiene trazabilidad.
      </WikiP>
    </div>
  );
}
