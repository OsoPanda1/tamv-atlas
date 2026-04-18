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

      <WikiH2>Lengua canónica del sistema</WikiH2>
      <WikiCard title="Manifiesto de lenguaje TAMV" accent="orange">
        El español es la <strong>lengua primaria de pensamiento, diseño y memoria normativa</strong> del Atlas. Las traducciones
        al inglés u otras lenguas son auxiliares para interoperabilidad internacional, pero no sustituyen al texto fuente para
        interpretación conceptual, técnica o jurídica.
      </WikiCard>

      <WikiP>
        Esta decisión no es cosmética: responde a soberanía cultural, justicia epistémica y derecho de los territorios a pensar
        su infraestructura digital en su propia lengua. La interoperabilidad se resuelve en la ontología y en los metadatos
        bilingües; la fuente normativa permanece en español.
      </WikiP>

      <WikiH2>Mandato operativo</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Documento fundacional:</strong> se redacta primero en español.</li>
          <li><strong>Versión internacional:</strong> conserva estructura y remite al original canónico.</li>
          <li><strong>Wiki viva:</strong> la documentación es interfaz ejecutiva entre gobernanza, ingeniería y despliegue.</li>
          <li><strong>BookPI / MSR:</strong> toda decisión crítica debe poder rastrearse y justificarse públicamente.</li>
        </ul>
      </WikiCard>
    </div>
  );
}
