import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function DidTamv() {
  return (
    <div>
      <WikiBreadcrumb section="ssi-did" page="did-tamv" />
      <WikiH1>Esquema did:tamv y Documento DID</WikiH1>
      <WikiP>TAMV propone el método DID did:tamv para identificar de forma única y resoluble cualquier entidad del ecosistema.</WikiP>

      <WikiH2>Formato propuesto</WikiH2>
      <WikiCode>{`did:tamv:<hash>

Ejemplos:
did:tamv:person:abc123
did:tamv:org:tamv-online-network
did:tamv:territory:rdm-real-del-monte
did:tamv:project:utamv-campus
did:tamv:community:ecosistem-latam
did:tamv:device:rdm-sensor-001`}</WikiCode>

      <WikiH2>Estructura mínima de DID Document</WikiH2>
      <WikiCode>{`{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:tamv:abc123...",
  "controller": "did:tamv:abc123...",
  "verificationMethod": [
    {
      "id": "did:tamv:abc123#keys-1",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:tamv:abc123...",
      "publicKeyMultibase": "z...."
    }
  ],
  "service": [
    {
      "id": "did:tamv:abc123#profile",
      "type": "TAMVProfileService",
      "serviceEndpoint": "https://tamvonline-oficial.odoo.com/isni/profiles/abc123"
    }
  ]
}`}</WikiCode>

      <WikiH2>Usos de DIDs en TAMV</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Identidad persistente:</strong> Estudiantes y creadores con control fuerte sobre sus credenciales</li>
          <li><strong>Credenciales verificables:</strong> Certificaciones UTAMV firmadas por entidad emisora TAMV</li>
          <li><strong>Casos sensibles:</strong> Comunidades vulnerables o defensores donde no se quiere depender de plataformas centralizadas</li>
          <li><strong>Acceso XR:</strong> Identidad verificable para acceso a espacios XR/4D sensibles</li>
        </ul>
      </WikiCard>
    </div>
  );
}
