import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function PerfilesOrgTerritorio() {
  return (
    <div>
      <WikiBreadcrumb section="perfiles-tamv" page="perfiles-org-territorio" />
      <WikiH1>Perfiles de Organizaciones y Territorios</WikiH1>
      <WikiP>Las organizaciones se modelan con ISNI/ROR y gobernanza definida por el Estatuto TAMV. Los territorios se modelan como sistemas operativos vivos con gemelo digital, actores identificados y protocolos de gobernanza local. Odoo funciona como ERP/CRM mapeado a perfiles ISNI vía JSON-LD.</WikiP>
    </div>
  );
}
