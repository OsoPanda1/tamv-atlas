import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard, WikiTag, WikiLink } from "@/components/WikiComponents";

export default function Introduccion() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="introduccion" />
      <WikiH1>Introducción Conceptual a TAMV ONLINE</WikiH1>
      <WikiP>
        TAMV ONLINE (Tecnología Avanzada Mexicana Versátil) es un ecosistema digital civilizatorio nacido en Real del Monte, Hidalgo, México. A diferencia de las plataformas convencionales, TAMV no se limita a ofrecer servicios digitales aislados: propone un sistema operativo civilizatorio completo que conecta contenidos, experiencias inmersivas y servicios en línea dentro de una infraestructura tecnológica federada.
      </WikiP>

      <div className="flex flex-wrap mb-6">
        <WikiTag>Ecosistema Civilizatorio</WikiTag>
        <WikiTag>Federado</WikiTag>
        <WikiTag>Soberanía Tecnológica</WikiTag>
        <WikiTag>LATAM</WikiTag>
        <WikiTag>Antifrágil</WikiTag>
      </div>

      <WikiH2>Definición del ecosistema</WikiH2>
      <WikiP>
        TAMV ONLINE integra herramientas para publicación y gestión de contenidos audiovisuales, administración de usuarios con roles y accesos personalizados, control de membresías y suscripciones, e integración con experiencias inmersivas a través de los módulos MD‑X4 y MD‑X5. Todo esto se articula mediante un modelo de gobernanza basado en siete federaciones funcionales.
      </WikiP>

      <WikiCard title="Concepto central">
        El ecosistema está diseñado para que territorios, creadores y organizaciones de Latinoamérica operen su propio sistema operativo digital, en lugar de ser únicamente infraestructura de datos para terceros. Su filosofía se resume en la noción de <strong>Dignity‑by‑Design</strong>: cada módulo funciona como mecanismo de protección ética, no como herramienta de explotación.
      </WikiCard>

      <WikiH2>Alcance y adaptabilidad</WikiH2>
      <WikiP>
        TAMV se adapta a distintos modelos de negocio: catálogos privados, academias digitales, proyectos de turismo inteligente y plataformas públicas de difusión. En todos los casos, prioriza estabilidad, seguridad, claridad visual y facilidad de uso, tanto para administradores como para usuarios finales.
      </WikiP>

      <WikiH3>Capacidades principales</WikiH3>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>Publicación de contenidos audiovisuales en alta calidad (on‑demand y en vivo)</li>
        <li>Gestión de campañas, páginas informativas y módulos orientados a turismo y educación</li>
        <li>Integración con entornos interactivos y experiencias inmersivas (metaverso productivo)</li>
        <li>Infraestructura federada con criptografía post‑cuántica y modelo Zero‑Trust</li>
        <li>Campus digital educativo UTAMV con IA pedagógica integrada</li>
      </ul>

      <WikiH2>Posicionamiento</WikiH2>
      <WikiP>
        TAMV se posiciona como el primer ecosistema civilizatorio federado antifrágil nacido en Latinoamérica, con un avance real del 75% documentado y comprobable. Su hoja de ruta lo proyecta hacia Web 4.0 y Web 5.0, incorporando identidad digital avanzada, IA colaborativa y contextual, experiencias sensoriales y capas de seguridad diseñadas para defender personas, no para vigilarlas.
      </WikiP>

      <WikiCard title="Referencias canónicas" accent="orange">
        <ul className="space-y-1">
          <li>· Sitio oficial: <WikiLink href="https://tamvonline-oficial.odoo.com">tamvonline-oficial.odoo.com</WikiLink></li>
          <li>· Blog: <WikiLink href="https://tamvonlinenetwork.blogspot.com">tamvonlinenetwork.blogspot.com</WikiLink></li>
          <li>· GitHub: <WikiLink href="https://github.com/OsoPanda1">github.com/OsoPanda1</WikiLink></li>
          <li>· Zenodo (white paper): <WikiLink href="https://zenodo.org/records/19562517">DOI: 10.5281/zenodo.19562517</WikiLink></li>
        </ul>
      </WikiCard>
    </div>
  );
}
