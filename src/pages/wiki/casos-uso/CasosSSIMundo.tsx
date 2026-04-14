import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function CasosSSIMundo() {
  return (
    <div>
      <WikiBreadcrumb section="casos-uso" page="casos-ssi-mundo" />
      <WikiH1>Adopción SSI/SSDI en el Mundo</WikiH1>
      <WikiP>
        Universidades implementan SSI para dar IDs de por vida a estudiantes. Empresas verifican certificados instantáneamente reduciendo semanas de verificación manual. Gobiernos usan SSI para eGovernment (IDs nacionales, permisos).
      </WikiP>
      <WikiCard accent="cyan">
        TAMV se alinea a esta ola tecnológica con un enfoque soberano LATAM.
      </WikiCard>
    </div>
  );
}
