import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function DiagramasSecuencia() {
  return (
    <div>
      <WikiBreadcrumb section="flujos-viajes" page="diagramas-secuencia" />
      <WikiH1>Diagramas de Secuencia y Casos de Uso</WikiH1>
      <WikiP>Diagramas que muestran la interacción entre componentes: creación de perfil ISNI → validación → publicación; emisión de VC por UTAMV → firma → entrega al Holder; verificación por empresa → resolución DID → validación de firma; y el flujo completo de Isabella AI a través del Hexagonal Pipeline.</WikiP>
    </div>
  );
}
