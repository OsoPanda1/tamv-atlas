import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function MarcoTeorico() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos-isni" page="marco-teorico" />
      <WikiH1>Marco Teórico: SSI, DIDs y PIDs</WikiH1>

      <WikiH2>Identidad como infraestructura</WikiH2>
      <WikiP>
        En ISNI, la identidad se concibe como una infraestructura hecha de atributos, eventos, vínculos, contextos y evidencias verificables. Una identidad sólida debe poder responder: quién es la entidad, qué produce, dónde opera, con qué comunidades se relaciona, qué documentos la respaldan y cómo ha evolucionado en el tiempo.
      </WikiP>

      <WikiH2>Self-Sovereign Identity (SSI)</WikiH2>
      <WikiP>
        SSI propone que las personas controlen sus identidades y credenciales sin depender de autoridades centrales, utilizando DIDs y Verifiable Credentials para autenticación y autorización. En este modelo hay tres roles clave:
      </WikiP>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Holder (Titular):</strong> Quien guarda y presenta sus credenciales — el ciudadano, estudiante o creador TAMV</li>
          <li><strong>Issuer (Emisor):</strong> Quien emite credenciales — UTAMV, TAMV Network, organizaciones validadas</li>
          <li><strong>Verifier (Verificador):</strong> Quien verifica credenciales — empleadores, instituciones, sistemas automatizados</li>
        </ul>
      </WikiCard>

      <WikiH2>Decentralized Identifiers (DIDs)</WikiH2>
      <WikiP>
        Los DIDs son un tipo de identificador definido por W3C que permite identidades verificables y descentralizadas, bajo control del sujeto de la identidad. A diferencia de los identificadores tradicionales (emails, usernames), los DIDs no dependen de un registro centralizado y son criptográficamente verificables.
      </WikiP>

      <WikiH2>Persistent Identifiers (PIDs)</WikiH2>
      <WikiCard accent="green">
        <ul className="space-y-2">
          <li><strong>ORCID:</strong> Identificador persistente para personas (autores, investigadores). Resuelve la ambigüedad de nombres y conecta al autor con toda su producción.</li>
          <li><strong>DOI:</strong> Identificador persistente para objetos digitales (artículos, datasets). Garantiza citabilidad y localización permanente.</li>
          <li><strong>ROR:</strong> Identificador para organizaciones de investigación (universidades, centros, institutos). Permite responder "qué publicaciones están asociadas a una institución dada".</li>
        </ul>
      </WikiCard>

      <WikiH2>Soberanía documental en ISNI</WikiH2>
      <WikiP>
        ISNI incorpora los PIDs globales pero preserva: nombres normalizados, alias y seudónimos; jerarquías institucionales y territoriales; reglas de edición y moderación propias; y narrativas y contexto de LATAM. No compite con ORCID/ROR/DOI: los integra como anclas externas confiables mientras añade contexto territorial, comunitario y narrativo que esos PIDs no contemplan.
      </WikiP>
    </div>
  );
}
