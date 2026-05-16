import {
  WikiH1,
  WikiH2,
  WikiP,
  WikiBreadcrumb,
  WikiCard,
  WikiLink,
  WikiTable,
} from "@/components/WikiComponents";

export default function BiografiaCeo() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="biografia-ceo" />

      <WikiH1>Perfil biográfico y trayectoria de liderazgo</WikiH1>

      <WikiCard accent="cyan">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary font-mono shrink-0">
            EC
          </div>

          <div>
            <div className="font-semibold text-foreground text-lg">
              Edwin Oswaldo Castillo Trejo
            </div>

            <div className="text-primary font-mono text-xs mb-2 tracking-wide">
              Arquitectura soberana · Sistemas territoriales digitales
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                ORCID:{" "}
                <WikiLink href="https://orcid.org/0009-0008-5050-1539">
                  0009-0008-5050-1539
                </WikiLink>
              </div>

              <div>
                Registro persistente interoperable conforme a estándares de
                identidad académica internacional (ORCID PID)
              </div>
            </div>
          </div>
        </div>
      </WikiCard>

      <WikiP>
        Edwin Oswaldo Castillo Trejo es desarrollador independiente, arquitecto
        de sistemas digitales y fundador conceptual de TAMV Online Network,
        ecosistema experimental orientado al diseño de infraestructuras
        territoriales interoperables, identidad digital soberana y gobernanza
        computacional.
      </WikiP>

      <WikiP>
        Su trabajo se sitúa en la intersección entre arquitectura de software,
        identidad persistente, sistemas federados, ciencia abierta y diseño
        socio-técnico orientado a la resiliencia institucional.
      </WikiP>

      <WikiH2>Contexto metodológico</WikiH2>

      <WikiP>
        El desarrollo del ecosistema TAMV se articula bajo principios alineados
        con prácticas contemporáneas de infraestructura abierta:
      </WikiP>

      <WikiTable
        headers={["Principio", "Referencia conceptual", "Aplicación en TAMV"]}
        rows={[
          [
            "Identidad persistente",
            "ORCID / PID / interoperabilidad académica",
            "Modelado de identidad verificable",
          ],
          [
            "Ciencia abierta",
            "OpenAIRE / Zenodo / DOI",
            "Publicación documental trazable",
          ],
          [
            "Arquitectura federada",
            "Infraestructura distribuida",
            "Nodos territoriales interoperables",
          ],
          [
            "Gobernanza verificable",
            "Auditoría de decisiones",
            "Ledger narrativo BookPI",
          ],
        ]}
      />

      <WikiH2>Trayectoria técnica</WikiH2>

      <WikiP>
        Desde 2020, su actividad pública documentada muestra una evolución desde
        prototipos independientes hacia la formalización de una arquitectura
        digital integral que incorpora:
      </WikiP>

      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Diseño de sistemas de identidad soberana interoperable</li>
        <li>Modelado de conocimiento mediante grafos semánticos</li>
        <li>Integración Supabase / PostgreSQL / Edge Functions</li>
        <li>Repositorios abiertos de experimentación técnica</li>
        <li>Infraestructura documental basada en DOI y versionado abierto</li>
        <li>Interfaces institucionales de observabilidad territorial</li>
      </ul>

      <WikiH2>Líneas conceptuales atribuidas</WikiH2>

      <WikiP>
        Dentro del ecosistema TAMV se atribuye a su dirección conceptual el
        desarrollo de marcos internos como:
      </WikiP>

      <WikiTable
        headers={["Marco", "Naturaleza", "Función"]}
        rows={[
          [
            "MD-X",
            "Arquitectura operativa",
            "Coordinación modular de subsistemas",
          ],
          [
            "BookPI",
            "Ledger narrativo",
            "Trazabilidad ética y documental",
          ],
          [
            "Kernel territorial",
            "Infraestructura lógica",
            "Sincronización federada",
          ],
          [
            "Modelo de federaciones",
            "Gobernanza distribuida",
            "Escalabilidad institucional",
          ],
        ]}
      />

      <WikiH2>Producción documental verificable</WikiH2>

      <WikiP>
        Parte del trabajo asociado al ecosistema se encuentra articulado mediante
        identificadores persistentes y mecanismos de indexación científica.
      </WikiP>

      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>
          ORCID como identificador persistente internacional de investigador
        </li>
        <li>
          DOI para preservación e identificación documental
        </li>
        <li>
          Depósito abierto mediante Zenodo
        </li>
        <li>
          Potencial interoperabilidad con OpenAIRE
        </li>
      </ul>

      <WikiCard title="Nota académica" accent="orange">
        ORCID constituye un identificador persistente global diseñado para
        distinguir contribuyentes de investigación y facilitar interoperabilidad
        entre repositorios, editoriales, universidades y sistemas de ciencia
        abierta. Su adopción fortalece trazabilidad y atribución documental.
      </WikiCard>

      <WikiH2>Enfoque filosófico</WikiH2>

      <WikiP>
        La arquitectura conceptual presentada en TAMV parte de una hipótesis
        central: que la infraestructura digital puede diseñarse no sólo para
        eficiencia operativa, sino como mecanismo de protección institucional,
        memoria colectiva y continuidad civilizatoria.
      </WikiP>

      <WikiCard title="Principio rector" accent="green">
        La tecnología adquiere legitimidad cuando su diseño incrementa
        verificabilidad, dignidad operativa y capacidad de coordinación humana.
      </WikiCard>

      <WikiH2>Registros y perfiles públicos</WikiH2>

      <div className="flex flex-wrap gap-3 text-xs font-mono mb-6">
        {[
          {
            label: "ORCID",
            href: "https://orcid.org/0009-0008-5050-1539",
          },
          {
            label: "DOI Zenodo",
            href: "https://doi.org/10.5281/zenodo.19436662",
          },
          {
            label: "GitHub",
            href: "https://github.com/OsoPanda1",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/edwin-oswaldo-castillo-aka-anubis-villaseñor-69a847376/",
          },
          {
            label: "Sitio institucional",
            href: "https://tamvonline-oficial.odoo.com",
          },
          {
            label: "Bitácora",
            href: "https://tamvonlinenetwork.blogspot.com",
          },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {l.label} ↗
          </a>
        ))}
      </div>

      <WikiH2>Observación crítica</WikiH2>

      <WikiP>
        La consolidación académica plena del ecosistema dependerá de ampliar
        validación externa mediante publicaciones arbitradas, repositorios
        indexados, documentación reproducible y evidencia empírica evaluable por
        terceros.
      </WikiP>

      <WikiH2>Proyección institucional y posicionamiento potencial</WikiH2>

<WikiP>
  La relevancia futura del trabajo desarrollado dentro del Atlas TAMV dependerá
  de su capacidad para traducirse en validación técnica independiente,
  interoperabilidad demostrable y adopción por comunidades externas al núcleo
  fundador.
</WikiP>

<WikiP>
  En términos prospectivos, la arquitectura conceptual y técnica documentada
  podría situar este trabajo dentro de una línea emergente de investigación
  aplicada centrada en infraestructura soberana, identidad digital persistente y
  sistemas territoriales computacionales.
</WikiP>

<WikiTable
  headers={["Horizonte", "Escenario posible", "Condición de consolidación"]}
  rows={[
    [
      "Corto plazo",
      "Reconocimiento como laboratorio experimental independiente",
      "Documentación reproducible y estabilidad operativa",
    ],
    [
      "Mediano plazo",
      "Referencia regional en arquitectura territorial interoperable",
      "Casos reales de implementación verificable",
    ],
    [
      "Largo plazo",
      "Marco metodológico citado en estudios de gobernanza digital",
      "Validación académica y adopción institucional externa",
    ],
  ]}
/>

<WikiH2>Vectores de influencia potencial</WikiH2>

<WikiP>
  Si la evolución del Atlas mantiene trazabilidad verificable, apertura
  documental y consistencia metodológica, los aportes podrían contribuir en
  campos como:
</WikiP>

<ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
  <li>Arquitectura de identidad digital soberana</li>
  <li>Infraestructura territorial basada en grafos de conocimiento</li>
  <li>Gobernanza computacional distribuida</li>
  <li>Ledger narrativo como instrumento de auditoría institucional</li>
  <li>Diseño de ecosistemas socio-técnicos latinoamericanos</li>
</ul>

<WikiCard title="Criterio de legitimación futura" accent="cyan">
  El posicionamiento duradero no dependerá de la magnitud narrativa del Atlas,
  sino de su capacidad para producir evidencia reproducible, resolver problemas
  reales y sostener interoperabilidad demostrable con estándares externos.
</WikiCard>

      <WikiP>
        Bajo ese marco, el liderazgo asociado al Atlas podría evolucionar desde una
        figura de experimentación independiente hacia un referente especializado en
        diseño institucional digital, siempre condicionado por revisión crítica,
        validación pública y contraste empírico continuo.
      </WikiP>
    </div>
  );
}
