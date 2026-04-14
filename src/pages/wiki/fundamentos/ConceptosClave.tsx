import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function ConceptosClave() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos" page="conceptos-clave" />
      <WikiH1>Conceptos Clave</WikiH1>

      <WikiH2>Ecosistema Civilizatorio</WikiH2>
      <WikiP>Un sistema completo que integra identidad, economía, cultura, gobernanza, seguridad, IA e infraestructura en un modelo federado. No es solo tecnología: es una propuesta de organización social digital.</WikiP>

      <WikiH2>Heptafederaciones</WikiH2>
      <WikiP>Las siete federaciones funcionales del kernel MD‑X4: DATA (persistencia y geoespacial), INTEL (IA cognitiva y agéntica), SEC (seguridad post-cuántica), GOV (gobernanza ejecutable), ECON (economía local/phygital), VIS (motor geovisual 2D/3D) y TERRITORY (edge computing, IoT y malla humana).</WikiP>

      <WikiH2>Identidad Soberana</WikiH2>
      <WikiP>Modelo de identidad digital donde el usuario controla sus datos, credenciales y metadatos. Combina estándares abiertos (ORCID, DOI, ISNI) con arquitectura SSI (Self-Sovereign Identity) y DIDs (Identificadores Descentralizados).</WikiP>

      <WikiH2>Territorio como Sistema Operativo</WikiH2>
      <WikiP>A diferencia de los "smart city dashboards" convencionales, TAMV modela cada territorio como un sistema operativo vivo donde los actores locales toman decisiones basadas en datos propios, no en métricas externas.</WikiP>

      <WikiH2>Grafos de Conocimiento</WikiH2>
      <WikiP>Estructuras semánticas que vinculan personas, organizaciones, territorios, proyectos y documentos en una red de relaciones navegable y consultable. TAMV usa JSON‑LD, Schema.org y PIDs como base de interoperabilidad.</WikiP>

      <WikiCard title="Glosario rápido" accent="cyan">
        <ul className="space-y-1">
          <li><strong>PQC:</strong> Post-Quantum Cryptography — criptografía resistente a computación cuántica</li>
          <li><strong>Q-Cells:</strong> Células lógicas autocurativas del modelo antifrágil</li>
          <li><strong>PIDs:</strong> Persistent Identifiers — identificadores permanentes y resolubles</li>
          <li><strong>SSI:</strong> Self-Sovereign Identity — identidad auto-soberana</li>
          <li><strong>RLS:</strong> Row-Level Security — seguridad a nivel de fila en bases de datos</li>
          <li><strong>Phygital:</strong> Convergencia entre experiencias físicas y digitales</li>
        </ul>
      </WikiCard>
    </div>
  );
}
