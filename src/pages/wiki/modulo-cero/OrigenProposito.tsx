import { WikiH1, WikiH2, WikiH3, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function OrigenProposito() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="origen-proposito" />
      <WikiH1>Origen, Propósito y Misión</WikiH1>

      <WikiH2>Dónde nace TAMV ONLINE</WikiH2>
      <WikiP>
        TAMV ONLINE nace "desde el corazón mismo de México, entre montañas y neblina", como proyecto orgullosamente mexicano y latinoamericano. No surge de un hub tecnológico financiado, sino de Real del Monte, Hidalgo — un rincón casi invisible del mapa tecnológico, desde la experiencia personal de su fundador Edwin Oswaldo Castillo Trejo.
      </WikiP>
      <WikiP>
        Es soñado, conceptualizado, desarrollado y sostenido técnica, económica y legalmente por un solo individuo a lo largo de más de 21,600 horas de trabajo, atravesando rechazo, falta de oportunidades laborales y sacrificios personales extremos.
      </WikiP>

      <WikiH2>Misión</WikiH2>
      <WikiCard accent="cyan">
        Construir la primera infraestructura civilizatoria federada nacida en Latinoamérica: un sistema operativo digital soberano que conecte territorios, creadores y organizaciones bajo principios de dignidad, transparencia y autonomía tecnológica.
      </WikiCard>

      <WikiH2>Visión</WikiH2>
      <WikiP>
        Convertirse en el referente latinoamericano de ecosistemas digitales soberanos, demostrando que es posible diseñar tecnología de clase mundial que priorice personas sobre datos, comunidades sobre métricas y soberanía sobre dependencia.
      </WikiP>

      <WikiH2>Cronología del avance</WikiH2>
      <WikiH3>Conceptualización (2020)</WikiH3>
      <WikiP>
        El punto de partida fue un diagnóstico brutal: tras miles de horas de autoestudio, el fundador concluyó que el sistema educativo y el contenido online eran fragmentados y superficiales para construir proyectos de alto nivel. De esa frustración nace la idea de un ecosistema civilizatorio que uniera identidad soberana, educación profunda, metaverso, economía y guardianía ética.
      </WikiP>

      <WikiH3>Construcción al 75% (2020–2025)</WikiH3>
      <WikiP>
        Más de 21,600 horas invertidas en diseño, código, documentación, narrativa, investigación y pruebas. Desarrollo de múltiples frentes en paralelo: arquitectura MSR, cells federados, diseño de UTAMV, Isabella AI, TENOCHTITLAN, ANUBIS/HORUS/DEKATEOTL e ID‑NVIDA.
      </WikiP>

      <WikiH3>Punto de inflexión (2026)</WikiH3>
      <WikiP>
        Se busca registrar la marca TAMV ONLINE, completar el MD‑X4 y desplegarlo en producción, consolidando la seguridad y abriendo las puertas a los primeros ciudadanos del sistema civilizatorio. El despliegue oficial de RDM Digital se marca el 4 de marzo de 2026.
      </WikiP>

      <WikiH2>Sostenibilidad</WikiH2>
      <WikiCard title="Micronegocios que sostienen TAMV" accent="green">
        <ul className="space-y-1">
          <li>· <strong>El Oso Feliz</strong> — Producción de abono orgánico</li>
          <li>· <strong>Artesanías El Rosario</strong> — Creación y venta de artesanías</li>
          <li>· <strong>TAMV Enterprise</strong> — Creación de sitios web y apps de servicio</li>
        </ul>
      </WikiCard>
    </div>
  );
}
