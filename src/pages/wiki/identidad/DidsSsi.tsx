import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function DidsSsi() {
  return (
    <div>
      <WikiBreadcrumb section="identidad" page="dids-ssi" />
      <WikiH1>DIDs y Self-Sovereign Identity</WikiH1>
      <WikiP>
        TAMV propone un modelo de identidad auto-soberana (SSI) donde cada persona, organización y territorio controla sus propios identificadores, credenciales y metadatos, sin depender de autoridades centralizadas.
      </WikiP>

      <WikiH2>Modelo did:tamv</WikiH2>
      <WikiP>
        El método DID propuesto por TAMV permite identificar de forma única y resoluble cualquier entidad del ecosistema: personas, organizaciones, territorios, proyectos y dispositivos. Cada DID es verificable, portable y controlado por su titular.
      </WikiP>
      <WikiCode>{`// Ejemplo de DID TAMV
did:tamv:person:edwin-castillo-trejo
did:tamv:org:tamv-online-network
did:tamv:territory:rdm-real-del-monte
did:tamv:project:utamv-campus
did:tamv:device:rdm-sensor-001`}</WikiCode>

      <WikiH2>Principios SSI en TAMV</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Control del usuario:</strong> Los datos de identidad residen con el titular, no con la plataforma</li>
          <li><strong>Verificabilidad:</strong> Las credenciales son criptográficamente verificables sin contactar al emisor</li>
          <li><strong>Portabilidad:</strong> La identidad funciona en cualquier nodo del ecosistema federado</li>
          <li><strong>Privacidad por diseño:</strong> Divulgación selectiva de atributos (zero-knowledge proofs)</li>
          <li><strong>Interoperabilidad:</strong> Compatible con estándares W3C DID y Verifiable Credentials</li>
        </ul>
      </WikiCard>

      <WikiH2>Integración con Zero-Trust</WikiH2>
      <WikiP>
        El modelo Zero-Trust de TAMV exige que cada interacción sea autenticada y autorizada independientemente de la ubicación o el contexto. Los DIDs actúan como base de esta arquitectura de confianza, complementados por credenciales verificables que prueban atributos específicos sin revelar información innecesaria.
      </WikiP>
    </div>
  );
}
