import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function ProyectosPrincipales() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="proyectos-principales" />
      <WikiH1>Proyectos Principales</WikiH1>
      <WikiP>Los proyectos del ecosistema TAMV abarcan desde infraestructura de backend hasta interfaces de usuario inmersivas y herramientas de gobernanza.</WikiP>

      <WikiH2>MD‑X4 Kernel</WikiH2>
      <WikiP>Motor central del ecosistema que orquesta las siete federaciones funcionales. Implementa protocolos de seguridad Zero-Trust, gestión de identidad soberana y gobernanza ejecutable. Es el corazón técnico de toda la infraestructura TAMV.</WikiP>

      <WikiH2>RDM Digital / RDM‑TOS</WikiH2>
      <WikiP>Smart City OS y gemelo digital de Real del Monte. Incluye módulos de mapeo 2D/3D (Mapbox/Leaflet), telemetría en tiempo real (Supabase Realtime), y al menos 48 nodos que cubren comercio, turismo, servicios urbanos y rutas inteligentes.</WikiP>

      <WikiH2>Isabella Villaseñor AI</WikiH2>
      <WikiP>IA nativa ética con triple bloqueo (semántico, conductual, contextual). Opera como auditor maestro en gobernanza XR/4D y como IA ejecutiva para expansión de marcas. Diseñada para proteger identidad, mediar interacciones y garantizar transparencia.</WikiP>

      <WikiH2>UTAMV Campus</WikiH2>
      <WikiP>Campus digital de educación avanzada con motor de IA pedagógica (AI Academic Core 2026). Implementa doble pipeline normativo y académico, basado en la Taxonomía de Bloom con trazabilidad completa.</WikiP>

      <WikiH2>Blockchain MSR / BookPI</WikiH2>
      <WikiP>Propuesta de blockchain permissioned orientada a trazabilidad y reparación ética. El ledger BookPI (SHA-256) asegura memoria digital como derecho protegido y auditable, alejándose del modelo especulativo de criptomonedas.</WikiP>

      <WikiCard title="Subsistemas adicionales" accent="cyan">
        El ecosistema incluye más de 35 subsistemas propios: TENOCHTITLAN, ANUBIS/HORUS/DEKATEOTL, ID-NVIDA, THE SOF (The Shadow of Failure), DreamSpaces y módulos de gestión de eventos, entre otros.
      </WikiCard>
    </div>
  );
}
