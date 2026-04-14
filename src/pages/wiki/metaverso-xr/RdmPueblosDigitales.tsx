import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function RdmPueblosDigitales() {
  return (
    <div>
      <WikiBreadcrumb section="metaverso-xr" page="rdm-pueblos-digitales" />
      <WikiH1>RDM y Pueblos Digitales</WikiH1>
      <WikiP>
        RDM Digital (Real del Monte Digital) es el primer nodo territorial: digitalización de economía, cultura y educación en un Pueblo Mágico. Despliegue: 4 de marzo de 2026. 48+ nodos cubriendo comercio, turismo, servicios urbanos y rutas inteligentes.
      </WikiP>
      <WikiCard accent="cyan">
        Gemelo digital 2D/3D con telemetría en tiempo real. MD-X5 ofrece plantillas para replicar en otros pueblos mágicos LATAM. Nodos phygital como Artesanías el Rosario integran producción local con marketplaces digitales.
      </WikiCard>
    </div>
  );
}
