import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function UserJourneys() {
  return (
    <div>
      <WikiBreadcrumb section="flujos-viajes" page="user-journeys" />
      <WikiH1>Trayectorias de Usuario ISNI–UTAMV–Ecosistema</WikiH1>
      <WikiP>Las trayectorias conectan el perfil ISNI con las actividades en UTAMV y la visibilidad en ecosistemas externos (Zenodo, OpenAIRE, ORCID). Un estudiante que completa un módulo en UTAMV obtiene una VC que se vincula a su perfil ORCID y se indexa en OpenAIRE automáticamente.</WikiP>
    </div>
  );
}
