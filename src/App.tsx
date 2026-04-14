import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import WikiLayout from "@/components/WikiLayout";
import WikiHome from "@/pages/WikiHome";
import NotFound from "@/pages/NotFound";

// Módulo Cero
import Introduccion from "@/pages/wiki/modulo-cero/Introduccion";
import Diferenciadores from "@/pages/wiki/modulo-cero/Diferenciadores";
import OrigenProposito from "@/pages/wiki/modulo-cero/OrigenProposito";
import BiografiaCeo from "@/pages/wiki/modulo-cero/BiografiaCeo";
import HumanismoEnCodigo from "@/pages/wiki/modulo-cero/HumanismoEnCodigo";
// Fundamentos
import VisionGeneral from "@/pages/wiki/fundamentos/VisionGeneral";
import PrincipiosDiseno from "@/pages/wiki/fundamentos/PrincipiosDiseno";
import ConceptosClave from "@/pages/wiki/fundamentos/ConceptosClave";
import SmartDestinations from "@/pages/wiki/fundamentos/SmartDestinations";
// Arquitectura
import CapasArquitectonicas from "@/pages/wiki/arquitectura/CapasArquitectonicas";
import OntologiasDatos from "@/pages/wiki/arquitectura/OntologiasDatos";
import GrafoConocimiento from "@/pages/wiki/arquitectura/GrafoConocimiento";
import Interoperabilidad from "@/pages/wiki/arquitectura/Interoperabilidad";
// Ecosistema de Código
import GithubRepos from "@/pages/wiki/ecosistema-codigo/GithubRepos";
import ProyectosPrincipales from "@/pages/wiki/ecosistema-codigo/ProyectosPrincipales";
import StackTecnologico from "@/pages/wiki/ecosistema-codigo/StackTecnologico";
import RoadmapTecnico from "@/pages/wiki/ecosistema-codigo/RoadmapTecnico";
// Identidad
import OrcidDoiIsni from "@/pages/wiki/identidad/OrcidDoiIsni";
import DidsSsi from "@/pages/wiki/identidad/DidsSsi";
import Perfiles from "@/pages/wiki/identidad/Perfiles";
import CredencialesVc from "@/pages/wiki/identidad/CredencialesVc";
// Casos de uso
import Territoriales from "@/pages/wiki/casos-de-uso/Territoriales";
import TurismoCultura from "@/pages/wiki/casos-de-uso/TurismoCultura";
import JourneysUsuario from "@/pages/wiki/casos-de-uso/JourneysUsuario";
import ProyectosPiloto from "@/pages/wiki/casos-de-uso/ProyectosPiloto";
// Gobernanza
import GobernanzaDatos from "@/pages/wiki/gobernanza/GobernanzaDatos";
import Roles from "@/pages/wiki/gobernanza/Roles";
import EticaPrivacidad from "@/pages/wiki/gobernanza/EticaPrivacidad";
import Contribucion from "@/pages/wiki/gobernanza/Contribucion";
// Referencias
import ReferenciasAcademicas from "@/pages/wiki/referencias/ReferenciasAcademicas";
import DocumentacionEstandares from "@/pages/wiki/referencias/DocumentacionEstandares";
import RecursosSmartCities from "@/pages/wiki/referencias/RecursosSmartCities";
import Creditos from "@/pages/wiki/referencias/Creditos";

const pageMap: Record<string, Record<string, React.ComponentType>> = {
  "modulo-cero": { introduccion: Introduccion, diferenciadores: Diferenciadores, "origen-proposito": OrigenProposito, "biografia-ceo": BiografiaCeo, "humanismo-en-codigo": HumanismoEnCodigo },
  fundamentos: { "vision-general": VisionGeneral, "principios-diseno": PrincipiosDiseno, "conceptos-clave": ConceptosClave, "smart-destinations": SmartDestinations },
  arquitectura: { "capas-arquitectonicas": CapasArquitectonicas, "ontologias-datos": OntologiasDatos, "grafo-conocimiento": GrafoConocimiento, interoperabilidad: Interoperabilidad },
  "ecosistema-codigo": { "github-repos": GithubRepos, "proyectos-principales": ProyectosPrincipales, "stack-tecnologico": StackTecnologico, "roadmap-tecnico": RoadmapTecnico },
  identidad: { "orcid-doi-isni": OrcidDoiIsni, "dids-ssi": DidsSsi, perfiles: Perfiles, "credenciales-vc": CredencialesVc },
  "casos-de-uso": { territoriales: Territoriales, "turismo-cultura": TurismoCultura, "journeys-usuario": JourneysUsuario, "proyectos-piloto": ProyectosPiloto },
  gobernanza: { "gobernanza-datos": GobernanzaDatos, roles: Roles, "etica-privacidad": EticaPrivacidad, contribucion: Contribucion },
  referencias: { "referencias-academicas": ReferenciasAcademicas, "documentacion-estandares": DocumentacionEstandares, "recursos-smart-cities": RecursosSmartCities, creditos: Creditos },
};

function WikiPage() {
  const params = new URL(window.location.href);
  const parts = params.pathname.split("/").filter(Boolean);
  const sectionId = parts[1];
  const pageSlug = parts[2];
  const Page = pageMap[sectionId]?.[pageSlug];
  if (!Page) return <NotFound />;
  return <Page />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WikiLayout />}>
            <Route path="/" element={<WikiHome />} />
            <Route path="/wiki/:sectionId/:pageSlug" element={<WikiPageRouter />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function WikiPageRouter() {
  const { sectionId, pageSlug } = useParamsHelper();
  const Page = pageMap[sectionId]?.[pageSlug];
  if (!Page) return <Navigate to="/" replace />;
  return <Page />;
}

function useParamsHelper() {
  const url = window.location.pathname.split("/").filter(Boolean);
  return { sectionId: url[1] || "", pageSlug: url[2] || "" };
}

export default App;
