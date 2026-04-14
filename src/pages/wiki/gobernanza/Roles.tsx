import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiTable } from "@/components/WikiComponents";

export default function Roles() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="roles" />
      <WikiH1>Roles y Estructura</WikiH1>

      <WikiTable
        headers={["Rol", "Responsabilidad", "Titular actual"]}
        rows={[
          ["CEO & Founder", "Visión, arquitectura, gobernanza global", "Edwin O. Castillo Trejo"],
          ["Chief Systems Architect", "Diseño técnico del ecosistema", "Edwin O. Castillo Trejo"],
          ["Isabella IA", "Auditor Maestro en Gobernanza XR/4D", "IA ética del ecosistema"],
          ["Colaboradores", "Desarrollo, documentación, testing", "Comunidad abierta"],
          ["Actores territoriales", "Gobernanza local del nodo", "Por nodo territorial"],
        ]}
      />

      <WikiH2>Estructura actual</WikiH2>
      <WikiP>
        Actualmente TAMV opera como "ecosistema de un solo humano": una sola persona ha conceptualizado, desarrollado, financiado y sostenido todo el proyecto. El siguiente paso evolutivo es abrir la estructura a colaboradores, manteniendo la gobernanza ética definida por el Estatuto TAMV.
      </WikiP>

      <WikiH2>Modelo de las 7 Federaciones como estructura organizacional</WikiH2>
      <WikiP>
        Cada federación funcional (DATA, INTEL, SEC, GOV, ECON, VIS, TERRITORY) opera como unidad organizacional con su propia gobernanza, responsables y protocolos. A medida que el ecosistema escale, cada federación podrá tener equipos dedicados con autonomía operativa pero alineados al Estatuto.
      </WikiP>
    </div>
  );
}
