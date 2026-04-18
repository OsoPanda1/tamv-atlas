import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function GobernanzaDatos() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="gobernanza-datos" />
      <WikiH1>Gobernanza Documental y de Datos</WikiH1>
      <WikiP>La gobernanza de datos en TAMV se rige por el Estatuto TAMV y opera bajo los principios de soberanía, transparencia y trazabilidad. Cada dato tiene un propietario identificado, un ciclo de vida definido y reglas de acceso granulares.</WikiP>

      <WikiH2>Principios de gobernanza</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Soberanía de datos:</strong> Los datos pertenecen a su generador, no a la plataforma</li>
          <li><strong>Trazabilidad:</strong> Cada operación sobre datos queda registrada en el ledger BookPI</li>
          <li><strong>Transparencia algorítmica:</strong> Las decisiones automatizadas son explicables y auditables</li>
          <li><strong>Seguridad a nivel de fila:</strong> RLS en PostgreSQL para control granular de acceso</li>
          <li><strong>Memoria inmutable:</strong> Los registros funcionan como derecho protegido, no como mercancía</li>
        </ul>
      </WikiCard>

      <WikiH2>Gobernanza documental</WikiH2>
      <WikiP>
        Toda la documentación del ecosistema sigue estándares de versionado semántico, identificación con DOI y licenciamiento abierto (CC BY 4.0). Los documentos son modulares, versionables y diseñados para URLs amigables que funcionan como IDs en el grafo de conocimiento.
      </WikiP>

      <WikiH2>SSoT, canon y autoridad editorial</WikiH2>
      <WikiCard title="Single Source of Truth" accent="orange">
        Atlas opera como <strong>fuente única autorizada</strong> para definiciones de arquitectura, políticas, modelos de IA,
        datasets, contratos semánticos y decisiones de despliegue. Cuando existe divergencia entre repos, presentaciones,
        chats o documentos dispersos, la referencia válida debe reconducirse al canon wiki versionado.
      </WikiCard>

      <WikiP>
        Este principio permite auditar el ecosistema completo: qué se decidió, por qué se aprobó, qué norma lo respalda y qué
        artefactos técnicos quedan afectados. La wiki no es un resumen; es el registro vivo de gobierno del sistema.
      </WikiP>

      <WikiH2>Capas de control</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Editorial:</strong> redacción, revisión, aprobación y publicación con trazabilidad.</li>
          <li><strong>Técnica:</strong> versionado, contratos JSON-LD, eventos, APIs y CI/CD constitucional.</li>
          <li><strong>Jurídica:</strong> prevalencia del español canónico, derechos culturales y control de interpretación.</li>
          <li><strong>Ética:</strong> evaluación de impacto, dignidad digital y cumplimiento UNESCO / ICCPR / UNDRIP.</li>
        </ul>
      </WikiCard>
    </div>
  );
}
