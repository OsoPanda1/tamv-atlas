import { WikiH1, WikiH2, WikiBreadcrumb, WikiLink } from "@/components/WikiComponents";

export default function DocumentacionEstandares() {
  return (
    <div>
      <WikiBreadcrumb section="referencias" page="documentacion-estandares" />
      <WikiH1>Documentación de Estándares</WikiH1>

      <WikiH2>Identificadores persistentes (PIDs)</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://orcid.org">ORCID</WikiLink> — Open Researcher and Contributor ID</li>
        <li><WikiLink href="https://www.doi.org">DOI</WikiLink> — Digital Object Identifier System</li>
        <li><WikiLink href="https://isni.org">ISNI</WikiLink> — International Standard Name Identifier</li>
        <li><WikiLink href="https://ror.org">ROR</WikiLink> — Research Organization Registry</li>
      </ul>

      <WikiH2>Self-Sovereign Identity (SSI)</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://www.w3.org/TR/did-core/">W3C DID Core</WikiLink> — Decentralized Identifiers</li>
        <li><WikiLink href="https://www.w3.org/TR/vc-data-model/">W3C Verifiable Credentials</WikiLink> — Credenciales verificables</li>
      </ul>

      <WikiH2>Datos semánticos</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://json-ld.org">JSON-LD</WikiLink> — Linked Data en formato JSON</li>
        <li><WikiLink href="https://schema.org">Schema.org</WikiLink> — Vocabulario de datos estructurados</li>
      </ul>

      <WikiH2>Seguridad</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://csrc.nist.gov/projects/post-quantum-cryptography">NIST PQC</WikiLink> — Post-Quantum Cryptography</li>
        <li><WikiLink href="https://www.nist.gov/publications/zero-trust-architecture">Zero Trust Architecture</WikiLink> — NIST SP 800-207</li>
      </ul>

      <WikiH2>Organizaciones</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li><WikiLink href="https://www.avixa.org">AVIXA</WikiLink> — Audiovisual and Integrated Experience Association</li>
        <li><WikiLink href="https://www.openaire.eu">OpenAIRE</WikiLink> — Open Access Infrastructure for Research in Europe</li>
        <li><WikiLink href="https://zenodo.org">Zenodo</WikiLink> — Repositorio de acceso abierto del CERN</li>
      </ul>
    </div>
  );
}
