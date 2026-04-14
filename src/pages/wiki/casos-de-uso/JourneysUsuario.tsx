import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function JourneysUsuario() {
  return (
    <div>
      <WikiBreadcrumb section="casos-de-uso" page="journeys-usuario" />
      <WikiH1>Journeys de Usuario</WikiH1>
      <WikiP>TAMV contempla diferentes perfiles de usuario, cada uno con un journey específico dentro del ecosistema.</WikiP>

      <WikiTable
        headers={["Perfil", "Necesidad principal", "Módulos clave"]}
        rows={[
          ["Ciudadano", "Servicios urbanos y participación", "RDM-TOS, F4 GOV, F5 ECON"],
          ["Turista", "Experiencia territorial enriquecida", "RDM-TOS, F6 VIS, DreamSpaces"],
          ["Investigador", "Acceso a datos y publicaciones", "UTAMV, Zenodo, ORCID, Grafo"],
          ["Creador", "Publicación y monetización", "Plataforma AV, membresías, marketplace"],
          ["Partner / Inversor", "Alianza estratégica", "Consultoría, licencias territoriales"],
          ["Desarrollador", "Contribución técnica", "GitHub, documentación, APIs"],
        ]}
      />

      <WikiH2>Journey del ciudadano</WikiH2>
      <WikiP>El ciudadano accede a servicios urbanos digitalizados, participa en decisiones de gobernanza local y se beneficia de una economía territorial que no extrae sus datos sino que los protege.</WikiP>

      <WikiH2>Journey del turista</WikiH2>
      <WikiP>El turista descubre el territorio a través de mapas interactivos, rutas inteligentes y experiencias XR. Su interacción genera valor para el comercio local de forma transparente y justa.</WikiP>

      <WikiH2>Journey del investigador</WikiH2>
      <WikiP>El investigador encuentra publicaciones con DOI, datos con trazabilidad, perfiles ORCID vinculados y documentación técnica completa. Puede citar, replicar y extender el trabajo del ecosistema con estándares académicos.</WikiP>
    </div>
  );
}
