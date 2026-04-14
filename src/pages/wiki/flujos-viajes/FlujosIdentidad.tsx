import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function FlujosIdentidad() {
  return (
    <div>
      <WikiBreadcrumb section="flujos-viajes" page="flujos-identidad" />
      <WikiH1>Flujos de Identidad</WikiH1>
      <WikiP>Cada rol en TAMV (estudiante, docente, institución, creador, ciudadano, turista) tiene un flujo de identidad específico: desde la creación del perfil ISNI, pasando por la participación en programas UTAMV, la emisión de credenciales verificables, hasta la verificación por terceros sin contactar a TAMV directamente.</WikiP>
    </div>
  );
}
