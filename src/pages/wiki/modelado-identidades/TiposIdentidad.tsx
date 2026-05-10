import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
  WikiTable,
} from "@/components/WikiComponents";

export default function TipologiasIdentidad() {
  return (
    <div className="space-y-8">
      <WikiBreadcrumb
        section="modelado-identidades"
        page="tipologias-identidad"
      />

      <WikiH1>
        Tipologías de identidad en el modelo federado TAMV
      </WikiH1>

      <WikiP>
        El sistema de identidad TAMV estructura sus entidades mediante una
        taxonomía interoperable inspirada en estándares internacionales de
        identificación persistente y soberanía digital. Cada tipo de identidad
        posee atributos, reglas de gobernanza, mecanismos de verificación y
        relaciones semánticas específicas dentro del grafo federado.
      </WikiP>

      <WikiCard
        title="Principio de tipificación"
        accent="cyan"
      >
        Una identidad no se define únicamente por su representación técnica,
        sino por el conjunto de relaciones, responsabilidades y capacidades
        operativas que articula dentro del ecosistema.
      </WikiCard>

      <WikiH2>Matriz estructural de entidades</WikiH2>

      <WikiTable
        headers={[
          "Tipo",
          "Instancia de referencia",
          "PID interoperable",
          "DID interno",
          "Modelo de gobernanza",
        ]}
        rows={[
          [
            "Person",
            "Investigador afiliado",
            "ORCID",
            "did:tamv:person:*",
            "Autogestión verificable",
          ],
          [
            "Organization",
            "Nodo institucional TAMV",
            "ISNI / ROR",
            "did:tamv:org:*",
            "Marco estatutario federado",
          ],
          [
            "Territory",
            "Nodo territorial digital",
            "Identificador territorial",
            "did:tamv:territory:*",
            "Gobernanza contextual",
          ],
          [
            "Project",
            "Programa académico o técnico",
            "DOI / Zenodo",
            "did:tamv:project:*",
            "Ciclo documental trazable",
          ],
          [
            "Community",
            "Red colaborativa temática",
            "Identificador federado",
            "did:tamv:community:*",
            "Moderación colectiva",
          ],
        ]}
      />

      <WikiH2>Person</WikiH2>

      <WikiP>
        Corresponde a sujetos individuales vinculados mediante identificadores
        persistentes como ORCID y enriquecidos con roles, afiliaciones,
        credenciales verificables y relaciones semánticas tales como
        <em>memberOf</em>, <em>contributorTo</em> y <em>affiliatedWith</em>.
      </WikiP>

      <WikiP>
        Incluye mecanismos de normalización nominal, resolución de alias y
        preservación de continuidad identitaria entre contribuciones
        distribuidas.
      </WikiP>

      <WikiH2>Organization</WikiH2>

      <WikiP>
        Representa entidades institucionales, académicas, productivas o
        administrativas con capacidad operativa dentro del ecosistema.
      </WikiP>

      <WikiP>
        Estas organizaciones pueden articular nodos propios, integrar sistemas
        externos y mantener trazabilidad documental mediante mapeos
        interoperables con ROR, ISNI y estructuras ERP/CRM.
      </WikiP>

      <WikiH2>Territory</WikiH2>

      <WikiP>
        Modela espacios geográficos como unidades sistémicas digitalmente
        observables, integrando actores, procesos, infraestructura y métricas
        contextuales dentro de una representación federada.
      </WikiP>

      <WikiP>
        Su función es habilitar gobernanza territorial asistida por datos,
        preservando autonomía local y coordinación con el núcleo federado.
      </WikiP>

      <WikiH2>Project</WikiH2>

      <WikiP>
        Comprende iniciativas con trazabilidad técnica y documental explícita,
        versionado semántico y vinculación verificable con personas,
        organizaciones, publicaciones y repositorios.
      </WikiP>

      <WikiP>
        Cada proyecto constituye una unidad evolutiva dentro del ecosistema y
        puede ser auditado en función de su historia operativa.
      </WikiP>

      <WikiH2>Community</WikiH2>

      <WikiP>
        Agrupa colectivos, redes de colaboración y comunidades temáticas que
        comparten objetivos, prácticas o capacidades especializadas.
      </WikiP>

      <WikiP>
        Su gobernanza se articula mediante mecanismos participativos, reglas de
        moderación explícitas y credenciales colectivas interoperables.
      </WikiP>

      <WikiCard
        title="Axioma federativo"
        accent="green"
      >
        Toda identidad adquiere significado operativo cuando puede ser
        verificada, relacionada y situada dentro de una red documental
        consistente.
      </WikiCard>
    </div>
  );
}
