import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiTag, WikiLink, WikiCode } from "@/components/WikiComponents";

export default function Introduccion() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="introduccion" />
      <WikiH1>Introducción Conceptual a TAMV ONLINE</WikiH1>

      <WikiP>
        TAMV ONLINE (Tecnología Avanzada Mexicana Versátil) se define como un <strong>Ecosistema Civilizatorio Federado</strong> de nueva generación, diseñado para operar como infraestructura base de soberanía tecnológica en América Latina. No es una simple plataforma o aplicación: es un Sistema Operativo Social y Técnico que articula identidad, conocimiento, inteligencia artificial, economía y territorio dentro de una misma arquitectura.
      </WikiP>

      <div className="flex flex-wrap mb-6">
        <WikiTag>Ecosistema Civilizatorio</WikiTag>
        <WikiTag>Federado</WikiTag>
        <WikiTag>Soberanía Tecnológica</WikiTag>
        <WikiTag>LATAM</WikiTag>
        <WikiTag>Antifrágil</WikiTag>
        <WikiTag>Web 4.0 / 5.0</WikiTag>
        <WikiTag>ISNI</WikiTag>
      </div>

      <WikiH2>Naturaleza del sistema</WikiH2>
      <WikiP>
        TAMV ONLINE es un sistema híbrido con cinco dimensiones interdependientes:
      </WikiP>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Dimensión ontológica:</strong> Define qué entidades existen (personas, organizaciones, territorios, proyectos, comunidades) mediante ISNI, PIDs (ORCID, DOI, ROR) y DIDs/SSI.</li>
          <li><strong>Dimensión técnica (MD‑X4 / MD‑X5):</strong> Provee la infraestructura de ejecución, observabilidad y evolución del ecosistema — kernel heptafederado con protocolo HOYO NEGRO.</li>
          <li><strong>Dimensión cognitiva (Isabella AI):</strong> Orquesta cómo el sistema piensa, interpreta y media interacciones, con IA acompañante responsable y seguridad cognitiva.</li>
          <li><strong>Dimensión académica (UTAMV):</strong> Estructura el conocimiento, valida competencias y conecta con la red de ciencia abierta (UTAMV AI Core, ORCID, Zenodo, OpenAIRE).</li>
          <li><strong>Dimensión territorial (RDM Digital):</strong> Ancla TAMV al mundo físico mediante nodos como Real del Monte Digital, que digitalizan economías y culturas locales.</li>
        </ul>
      </WikiCard>

      <WikiH2>Paradigma: Infraestructura vs. Plataforma</WikiH2>
      <WikiP>
        La distinción central de TAMV ONLINE es que se concibe como <strong>Infraestructura Crítica de Conocimiento</strong>, no como "plataforma" de captura de usuarios. Una plataforma encierra al usuario en un entorno cautivo; TAMV ofrece cimientos para que la identidad sea propiedad del usuario, la IA sea un aliado ético y el territorio se digitalice sin perder su esencia.
      </WikiP>

      <WikiH2>Problema estructural que aborda</WikiH2>
      <WikiP>TAMV surge frente a cuatro fallas estructurales en LATAM:</WikiP>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Dependencia de infraestructuras tecnológicas externas</li>
        <li>Fragmentación del conocimiento y de la identidad académica</li>
        <li>Invisibilidad de producción local en redes globales</li>
        <li>Desconexión entre tecnología y territorio</li>
      </ul>

      <WikiH2>Principio fundacional</WikiH2>
      <WikiCard title="Axioma innegociable" accent="orange">
        <em>"No puede existir soberanía tecnológica sin soberanía de identidad, conocimiento e infraestructura."</em>
        <div className="mt-3 space-y-1">
          <div><strong>Identidad (ISNI/SNI):</strong> Infraestructura soberana de nombres e identidades</div>
          <div><strong>Infraestructura (MD-X4/X5):</strong> Kernel operativo antifrágil</div>
          <div><strong>Inteligencia (Isabella AI):</strong> Conciencia operativa ética</div>
        </div>
      </WikiCard>

      <WikiH2>Arquitectura base del ecosistema</WikiH2>
      <WikiCode>{`Nivel 0 — ISNI / SNI (Identidad y Ontología)
  └── Infraestructura soberana de nombres e identidades
  └── Ontología JSON-LD/schema.org, perfiles tipo ORCID

Nivel 1 — MD-X4 / MD-X5 (Infraestructura y Evolución)
  └── Observabilidad, autopoiesis, protocolo HOYO NEGRO
  └── Normalización de 177 repos federados

Nivel 2 — Isabella Villaseñor AI / TAMVAI (Inteligencia)
  └── Conciencia operativa, mediación XR
  └── Triple bloqueo: semántico, conductual, contextual

Nivel 3 — UTAMV (Transferencia Cognitiva)
  └── Campus digital, AI Academic Core 2026
  └── Doble pipeline: Normativo + Académico (Bloom)

Nivel 4 — RDM Digital y Pueblos Digitales
  └── Nodos territoriales, gemelo digital 2D/3D
  └── 48+ nodos: comercio, turismo, servicios, rutas

Nivel 5 — Integración global (Odoo, XR/4D, redes)
  └── ERP/CRM soberano, ciencia abierta, metaverso`}</WikiCode>

      <WikiH2>Componentes del DM-X4™</WikiH2>
      <WikiP>
        El DM-X4™ (Digital Nexus) es el primer API global 5D multisensorial que activa DreamSpaces, DAO, marketplace, universidad y economía XR en tiempo real, con capa post-cuántica y voz emocional. Integra 11 dominios activos y 48 nodos federados operando con seguridad "Zero-Trust" y arquitectura híbrida.
      </WikiP>

      <WikiCard title="Referencias canónicas" accent="green">
        <ul className="space-y-1">
          <li>· Portal ISNI: <WikiLink href="https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM/wiki/ISNI-Home">groups.io/ISNI-Home</WikiLink></li>
          <li>· Sitio oficial: <WikiLink href="https://tamvonline-oficial.odoo.com">tamvonline-oficial.odoo.com</WikiLink></li>
          <li>· Blog: <WikiLink href="https://tamvonlinenetwork.blogspot.com">tamvonlinenetwork.blogspot.com</WikiLink></li>
          <li>· GitHub: <WikiLink href="https://github.com/OsoPanda1">github.com/OsoPanda1</WikiLink></li>
          <li>· Zenodo: <WikiLink href="https://zenodo.org/records/19562517">DOI: 10.5281/zenodo.19562517</WikiLink></li>
          <li>· Comunidad Zenodo: <WikiLink href="https://zenodo.org/communities/tamvonline-oficial/">tamvonline-oficial</WikiLink></li>
        </ul>
      </WikiCard>
    </div>
  );
}
