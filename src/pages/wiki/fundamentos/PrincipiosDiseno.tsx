import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function PrincipiosDiseno() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos" page="principios-diseno" />
      <WikiH1>Principios de Diseño</WikiH1>
      <WikiP>Los principios de diseño de TAMV guían cada decisión técnica y organizacional del ecosistema.</WikiP>

      <WikiH2>Soberanía tecnológica</WikiH2>
      <WikiP>Cada territorio o comunidad que adopte TAMV opera su propia instancia con control total sobre sus datos, reglas de gobernanza y políticas de acceso. La dependencia de proveedores externos se minimiza por diseño.</WikiP>

      <WikiH2>Dignity‑by‑Design</WikiH2>
      <WikiP>La privacidad, la identidad y la seguridad del usuario no son features opcionales sino condiciones arquitectónicas. Todo módulo se evalúa primero por su impacto en la dignidad humana y luego por su funcionalidad técnica.</WikiP>

      <WikiH2>Antifragilidad</WikiH2>
      <WikiP>El ecosistema no solo resiste perturbaciones: se fortalece con ellas. Las Q‑Cells (células lógicas autocurativas), la arquitectura federada y el modelo heptafederado garantizan que ningún fallo parcial comprometa el sistema completo.</WikiP>

      <WikiH2>Ética LATAM</WikiH2>
      <WikiP>TAMV se diseña desde y para Latinoamérica, reconociendo las realidades sociales, económicas y culturales de la región. No es una adaptación de modelos del norte global, sino un modelo nativo que prioriza equidad, acceso y relevancia territorial.</WikiP>

      <WikiCard title="Human‑in‑the‑Loop" accent="cyan">
        Toda decisión civilizatoria dentro del ecosistema tiene un responsable humano identificado. La automatización opera como herramienta de apoyo, no como sustituto de la deliberación humana en asuntos que afectan a personas y comunidades.
      </WikiCard>
    </div>
  );
}
