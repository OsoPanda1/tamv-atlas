import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function CredencialesVc() {
  return (
    <div>
      <WikiBreadcrumb section="identidad" page="credenciales-vc" />
      <WikiH1>Credenciales Verificables</WikiH1>
      <WikiP>
        TAMV implementa Verifiable Credentials (VCs) siguiendo el estándar W3C para acreditar capacidades, roles, certificaciones y logros dentro del ecosistema de forma criptográficamente verificable.
      </WikiP>

      <WikiH2>Casos de uso en UTAMV</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Certificaciones académicas:</strong> Credenciales emitidas por UTAMV que acreditan completar módulos formativos, verificables sin contactar la institución</li>
          <li><strong>Roles en federaciones:</strong> VCs que acreditan el rol de una persona dentro de una federación específica del ecosistema</li>
          <li><strong>Competencias técnicas:</strong> Credenciales que certifican habilidades específicas demostradas en proyectos del ecosistema</li>
          <li><strong>Contribuciones comunitarias:</strong> Reconocimiento verificable de aportes al ecosistema (código, documentación, gobernanza)</li>
        </ul>
      </WikiCard>

      <WikiH2>Estructura de una VC TAMV</WikiH2>
      <WikiCode>{`{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://tamv.online/credentials/v1"
  ],
  "type": ["VerifiableCredential", "TAMVAcademicCredential"],
  "issuer": "did:tamv:org:utamv-campus",
  "issuanceDate": "2026-04-14T00:00:00Z",
  "credentialSubject": {
    "id": "did:tamv:person:ejemplo",
    "achievement": "Módulo de Arquitectura Antifrágil",
    "level": "Avanzado",
    "taxonomy": "Bloom:Analizar"
  },
  "proof": { "type": "Ed25519Signature2020" }
}`}</WikiCode>

      <WikiH2>Verificación</WikiH2>
      <WikiP>
        Las credenciales se verifican resolviendo el DID del emisor, comprobando la firma criptográfica y validando la vigencia. El proceso es completamente descentralizado: no requiere contactar al emisor ni a un registro central.
      </WikiP>
    </div>
  );
}
