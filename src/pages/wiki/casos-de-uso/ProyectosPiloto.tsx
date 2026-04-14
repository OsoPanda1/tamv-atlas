import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function ProyectosPiloto() {
  return (
    <div>
      <WikiBreadcrumb section="casos-de-uso" page="proyectos-piloto" />
      <WikiH1>Proyectos Piloto y Colaboraciones</WikiH1>

      <WikiH2>RDM Digital — Piloto territorial</WikiH2>
      <WikiCard accent="cyan">
        Real del Monte, Hidalgo, funciona como el piloto territorial de referencia del ecosistema TAMV. El despliegue del 4 de marzo de 2026 convierte a este pueblo mágico en el primer territorio donde la arquitectura civilizatoria opera sobre la vida diaria de una comunidad.
      </WikiCard>

      <WikiH2>AVIXA</WikiH2>
      <WikiP>
        Isabella IA, la inteligencia artificial ética del ecosistema, ha sido reconocida por AVIXA (Audiovisual and Integrated Experience Association) como inteligencia ética nacida en Real del Monte, validando el enfoque de gobernanza XR/4D y la propuesta de IA como Auditor Maestro.
      </WikiP>

      <WikiH2>Comunidades académicas</WikiH2>
      <WikiP>
        Las publicaciones de TAMV participan en las comunidades de Open Science, AI and Society, y Educational Technology en Zenodo/OpenAIRE, conectando la producción intelectual con la infraestructura global de ciencia abierta.
      </WikiP>

      <WikiH2>Alianzas abiertas</WikiH2>
      <WikiP>
        TAMV permanece abierto a alianzas estratégicas con empresas, instituciones y organizaciones bajo una condición clara: que respeten el ADN ético y civilizatorio del ecosistema. Las oportunidades incluyen licencias territoriales, consultoría de gobernanza y transferencia de modelo.
      </WikiP>

      <WikiCard title="Contacto para alianzas" accent="orange">
        Para explorar colaboraciones: <WikiLink href="https://tamvonline-oficial.odoo.com">tamvonline-oficial.odoo.com</WikiLink>
      </WikiCard>
    </div>
  );
}
