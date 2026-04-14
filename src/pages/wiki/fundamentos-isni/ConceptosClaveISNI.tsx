import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function ConceptosClaveISNI() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos-isni" page="conceptos-clave" />
      <WikiH1>Conceptos Clave de Identidad y Grafo</WikiH1>

      <WikiH2>Ecosistema Civilizatorio</WikiH2>
      <WikiP>Un sistema completo que integra identidad, economía, cultura, gobernanza, seguridad, IA e infraestructura en un modelo federado. TAMV no es solo tecnología: es una propuesta de organización social digital que opera como Sistema Operativo Social y Técnico.</WikiP>

      <WikiH2>Heptafederaciones (Modelo de 7 Federaciones)</WikiH2>
      <WikiP>Evolución del modelo Triple Hélice: siete federaciones funcionales como base de control soberano — DATA (persistencia), INTEL (IA cognitiva), SEC (seguridad PQC), GOV (gobernanza ejecutable), ECON (economía phygital), VIS (motor geovisual 2D/3D) y TERRITORY (edge computing e IoT).</WikiP>

      <WikiH2>Identidad como infraestructura</WikiH2>
      <WikiP>La identidad en ISNI no es un "login": es un grafo de atributos, eventos, vínculos, contextos y evidencias verificables que responde quién es la entidad, qué produce, dónde opera, con quién se relaciona y cómo ha evolucionado.</WikiP>

      <WikiH2>Grafos de conocimiento</WikiH2>
      <WikiP>Estructuras semánticas JSON-LD que vinculan personas, organizaciones, territorios, proyectos y documentos en una red navegable. Usan Schema.org como vocabulario base y PIDs como anclas de interoperabilidad global.</WikiP>

      <WikiH2>Territorio como Sistema Operativo</WikiH2>
      <WikiP>A diferencia de los "smart city dashboards", TAMV modela cada territorio como un sistema operativo vivo (RDM-TOS) donde los actores locales toman decisiones con datos propios. Real del Monte es el primer nodo con 48+ subsistemas.</WikiP>

      <WikiCard title="Glosario rápido" accent="cyan">
        <ul className="space-y-1">
          <li><strong>ISNI:</strong> Infraestructura Soberana de Nombres e Identidades</li>
          <li><strong>PQC:</strong> Post-Quantum Cryptography</li>
          <li><strong>Q-Cells:</strong> Células lógicas autocurativas del modelo antifrágil</li>
          <li><strong>PIDs:</strong> Persistent Identifiers (ORCID, DOI, ROR, ISNI)</li>
          <li><strong>SSI:</strong> Self-Sovereign Identity</li>
          <li><strong>DID:</strong> Decentralized Identifier</li>
          <li><strong>VC:</strong> Verifiable Credential</li>
          <li><strong>IN:</strong> Inteligencia Nativa — lógica en infraestructura propia</li>
          <li><strong>BookPI:</strong> Ledger de evidencia intelectual (SHA-256)</li>
          <li><strong>MSR:</strong> Master Sovereign Record — ledger inmutable civilizatorio</li>
          <li><strong>PRISMA:</strong> Sistema de validación de conocimiento (módulos A-J)</li>
          <li><strong>Kórima:</strong> Filosofía Rarámuri de reciprocidad</li>
          <li><strong>DEKATEOTL:</strong> 11 capas de seguridad biológica</li>
          <li><strong>Phygital:</strong> Convergencia física-digital</li>
        </ul>
      </WikiCard>
    </div>
  );
}
