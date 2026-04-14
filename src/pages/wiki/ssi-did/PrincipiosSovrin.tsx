import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function PrincipiosSovrin() {
  return (
    <div>
      <WikiBreadcrumb section="ssi-did" page="principios-sovrin" />
      <WikiH1>Principios SSI de Sovrin Aplicados a TAMV</WikiH1>
      <WikiP>Los principios de la Fundación Sovrin para Self-Sovereign Identity se aplican directamente en la arquitectura ISNI de TAMV.</WikiP>

      <WikiCard accent="cyan">
        <ul className="space-y-3">
          <li><strong>Existencia:</strong> Los usuarios deben tener una existencia independiente en el ecosistema</li>
          <li><strong>Control:</strong> Los usuarios deben controlar sus identidades — TAMV implementa esto via DIDs</li>
          <li><strong>Acceso:</strong> Los usuarios deben tener acceso a sus propios datos — perfiles TAMV son legibles por el titular</li>
          <li><strong>Transparencia:</strong> Los sistemas deben ser abiertos — ISNI publica ontología en JSON-LD abierto</li>
          <li><strong>Persistencia:</strong> Las identidades deben ser duraderas — PIDs + DIDs garantizan permanencia</li>
          <li><strong>Portabilidad:</strong> La identidad debe funcionar en cualquier nodo federado</li>
          <li><strong>Interoperabilidad:</strong> Las identidades deben funcionar entre sistemas — integración ORCID/ROR/DOI</li>
          <li><strong>Consentimiento:</strong> El uso de identidad requiere consentimiento del titular</li>
          <li><strong>Minimalismo:</strong> Divulgación mínima de atributos (zero-knowledge proofs)</li>
          <li><strong>Protección:</strong> Los derechos del usuario deben prevalecer — Dignity-by-Design</li>
        </ul>
      </WikiCard>

      <WikiH2>Aplicación en TAMV</WikiH2>
      <WikiP>TAMV materializa estos principios mediante la arquitectura de cuatro capas de ISNI, donde cada capa refuerza un aspecto de la soberanía: la capa documental garantiza existencia, la semántica transparencia, la interoperable portabilidad, y la de automatización/DID el control total del usuario.</WikiP>
    </div>
  );
}
