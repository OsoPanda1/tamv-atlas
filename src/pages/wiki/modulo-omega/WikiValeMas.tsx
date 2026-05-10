import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
  WikiTable,
} from "@/components/WikiComponents";

export default function WikiEpistemica() {
  return (
    <div className="space-y-8">
      <WikiBreadcrumb
        section="modulo-omega"
        page="infraestructura-epistemica"
      />

      <WikiH1>
        La wiki como infraestructura epistemológica del ecosistema
      </WikiH1>

      <WikiP>
        En TAMV, el código constituye la capa ejecutiva del sistema; la wiki,
        en cambio, articula su arquitectura semántica, normativa y
        civilizatoria. No se limita a describir implementaciones: define los
        principios, relaciones, restricciones y criterios que hacen posible una
        evolución técnica coherente.
      </WikiP>

      <WikiP>
        Mientras el software materializa funciones, esta base documental
        preserva continuidad lógica entre identidad, operación, memoria y
        gobernanza. Su valor no radica únicamente en registrar conocimiento,
        sino en permitir que dicho conocimiento sea interpretable, verificable y
        reconstruible por generaciones sucesivas de agentes humanos y
        computacionales.
      </WikiP>

      <WikiH2>Matriz estructural de valor sistémico</WikiH2>

      <WikiTable
        headers={[
          "Capa estructural",
          "Función documental",
          "Capacidad sistémica habilitada",
        ]}
        rows={[
          [
            "Identidad soberana",
            "Modelado de ISNI, SSI, DID y PIDs",
            "Persistencia verificable de actores, trayectorias y afiliaciones",
          ],
          [
            "Operación federada",
            "Formalización de protocolos MD-X",
            "Ejecución territorial coordinada con trazabilidad técnica",
          ],
          [
            "Ética computacional",
            "Criterios DEKATEOTL y BookPI",
            "Gobernanza auditable y límites normativos explícitos",
          ],
          [
            "Memoria institucional",
            "Versionado y continuidad documental",
            "Reconstrucción histórica y transferencia intergeneracional",
          ],
          [
            "Interoperabilidad",
            "Mapeo semántico entre nodos y sistemas externos",
            "Integración coherente sin pérdida contextual",
          ],
        ]}
      />

      <WikiH2>Principio de reconstruibilidad</WikiH2>

      <WikiCard
        title="Axioma epistemológico"
        accent="cyan"
      >
        Un sistema alcanza madurez arquitectónica cuando su estructura puede ser
        reconstruida, auditada y extendida a partir de su documentación formal.
        Bajo este criterio, la wiki no constituye un anexo operativo, sino una
        capa constitutiva del propio sistema.
      </WikiCard>

      <WikiP>
        La preservación del ecosistema TAMV no depende exclusivamente de la
        persistencia de su código fuente, sino de la existencia de una gramática
        documental capaz de transmitir intención, estructura y legitimidad
        operativa.
      </WikiP>

      <WikiCard
        title="Implicación estratégica"
        accent="green"
      >
        Si una inteligencia artificial, un equipo técnico o una institución
        externa pueden reconstruir funcionalmente el sistema mediante esta base
        documental, entonces la wiki opera como activo estratégico de
        soberanía cognitiva.
      </WikiCard>
    </div>
  );
}
