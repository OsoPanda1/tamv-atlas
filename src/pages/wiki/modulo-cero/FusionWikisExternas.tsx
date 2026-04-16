import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable, WikiLink, WikiTag } from "@/components/WikiComponents";

export default function FusionWikisExternas() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="fusion-wikis-externas" />
      <WikiH1>Fusión de fuentes externas (Cubic + GitHub) en la narrativa TAMV</WikiH1>

      <WikiP>
        Esta página consolida en un solo marco editorial la información de las wikis externas de Cubic y el README público del perfil
        <WikiLink href="https://github.com/OsoPanda1/OsoPanda1?tab=readme-ov-file#tamv-online--ecosistema-latam"> OsoPanda1/OsoPanda1</WikiLink>.
        El objetivo es mantener una versión canónica dentro del Atlas TAMV sin perder trazabilidad de origen.
      </WikiP>

      <div className="flex flex-wrap mb-6">
        <WikiTag>Integración editorial</WikiTag>
        <WikiTag>TAMV ONLINE</WikiTag>
        <WikiTag>MD-X4</WikiTag>
        <WikiTag>RDM-TOS</WikiTag>
        <WikiTag>Isabella IA</WikiTag>
      </div>

      <WikiH2>Síntesis integrada</WikiH2>
      <WikiTable
        headers={["Componente", "Lectura consolidada", "Dónde profundizar en este Atlas"]}
        rows={[
          [
            "TAMV ONLINE",
            "Ecosistema civilizatorio federado para soberanía tecnológica territorial en LATAM, no una app aislada.",
            "Introducción conceptual / Origen y propósito",
          ],
          [
            "MD-X4",
            "Kernel heptafederado con enfoque antifrágil, seguridad Zero-Trust y decisiones con responsable humano.",
            "Capas arquitectónicas / Roadmap civilizatorio",
          ],
          [
            "RDM-TOS",
            "Sistema operativo territorial en Real del Monte: gemelo digital, datos de operación local y gobernanza situada.",
            "RDM y Pueblos Digitales / Escenarios TAMV",
          ],
          [
            "Capa XR",
            "XR/2D/3D como interfaz productiva para turismo, formación y operaciones, no como metaverso especulativo.",
            "DreamSpaces XR / Economía cuántica / Casos de uso",
          ],
          [
            "Canon académico",
            "Integración de ORCID, DOI y OpenAIRE como evidencia de trazabilidad técnica y académica del ecosistema.",
            "Integración ORCID-DOI-ROR / Referencias académicas",
          ],
        ]}
      />

      <WikiH2>Decisiones de integración en esta wiki</WikiH2>
      <WikiCard title="Qué se normalizó" accent="cyan">
        <ul className="space-y-2">
          <li>Se unificó el lenguaje para presentar TAMV como programa único multiproyecto.</li>
          <li>Se alineó la triada narrativa base: <strong>MD-X4 → RDM-TOS → Interfaces XR/IA</strong>.</li>
          <li>Se reforzó el criterio de utilidad territorial (servicios reales, economía local y operación pública digital).</li>
          <li>Se dejó explícita la dimensión académico-documental (ORCID/DOI/OpenAIRE) como capa de legitimidad.</li>
        </ul>
      </WikiCard>

      <WikiH2>Diferencial frente a metaversos especulativos</WikiH2>
      <WikiP>
        La integración de fuentes converge en una distinción central: TAMV usa tecnologías inmersivas para resolver coordinación territorial
        y desarrollo económico real (turismo, comercio y servicios), evitando el enfoque centrado en compraventa de activos virtuales.
      </WikiP>

      <WikiH2>Estado de fuentes y gobernanza documental</WikiH2>
      <WikiCard title="Trazabilidad de esta fusión" accent="orange">
        <ul className="space-y-2">
          <li>
            Fuente accesible y consolidada: <WikiLink href="https://github.com/OsoPanda1/OsoPanda1?tab=readme-ov-file">README público de GitHub</WikiLink>.
          </li>
          <li>
            Fuentes Cubic referenciadas para continuidad editorial: <WikiLink href="https://www.cubic.dev/wikis/OsoPanda1/analiza-este-lovable-tamv?page=page-1">Analiza este lovable TAMV</WikiLink>,{" "}
            <WikiLink href="https://www.cubic.dev/wikis/OsoPanda1/tamv-digital-nexus?page=intro-setup">TAMV Digital Nexus</WikiLink> y{" "}
            <WikiLink href="https://www.cubic.dev/wiki/OsoPanda1/documentacion-total-tamv-online?page=page-intro">Documentación total TAMV Online</WikiLink>.
          </li>
          <li>
            Recomendación operativa: mantener sincronía mensual entre esta página y los documentos externos para detectar nuevas capas,
            métricas y cambios de naming.
          </li>
        </ul>
      </WikiCard>
    </div>
  );
}
