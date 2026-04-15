import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function CredencialesVcSSI() {
  return (
    <div>
      <WikiBreadcrumb section="ssi-did" page="credenciales-vc" />
      <WikiH1>Credenciales Verificables (VC) en TAMV</WikiH1>
      <WikiP>
        Las Verifiable Credentials (VC) son afirmaciones digitales firmadas criptográficamente que permiten a una entidad (Issuer) certificar atributos de otra (Holder), verificables por terceros (Verifier) sin contactar al emisor original. En el ecosistema TAMV, las VC se aplican principalmente en UTAMV para credenciales académicas y en comunidades que requieren certificación soberana.
      </WikiP>
      <WikiH2>Flujo de emisión UTAMV</WikiH2>
      <WikiP>
        Cuando un estudiante completa un programa en UTAMV, el sistema emite una credencial verificable que incluye: identidad del estudiante (PersonProfile + opcional did:tamv), programa completado, fecha de emisión, firma digital del emisor (UTAMV) y un enlace al DID Document del emisor para verificación independiente. El estudiante almacena esta VC en su wallet digital y puede compartirla con empleadores o instituciones que la verifican automáticamente.
      </WikiP>
      <WikiCard accent="cyan">
        Las credenciales verificables TAMV siguen el estándar W3C Verifiable Credentials Data Model v2.0, con extensiones JSON-LD propias para contexto LATAM y territorialización.
      </WikiCard>
      <WikiH2>Tipos de credenciales en TAMV</WikiH2>
      <WikiP>
        El ecosistema contempla cuatro tipos principales: (1) Credenciales académicas — títulos, diplomados, certificaciones UTAMV; (2) Credenciales profesionales — certificaciones AVIXA, competencias técnicas; (3) Credenciales territoriales — pertenencia a nodos RDM, roles comunitarios; (4) Credenciales de contribución — aportes a repos, wiki, proyectos documentados en el grafo ISNI.
      </WikiP>
    </div>
  );
}
