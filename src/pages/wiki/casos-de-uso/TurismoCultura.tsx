import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function TurismoCultura() {
  return (
    <div>
      <WikiBreadcrumb section="casos-de-uso" page="turismo-cultura" />
      <WikiH1>Turismo, Cultura y Economía Creativa</WikiH1>
      <WikiP>TAMV integra turismo inteligente, preservación cultural y economía creativa en una experiencia digital unificada que beneficia directamente a los actores territoriales.</WikiP>

      <WikiH2>Turismo inteligente</WikiH2>
      <WikiP>El visitante interactúa con un ecosistema vivo: rutas inteligentes contextualizadas, experiencias XR en puntos de interés, recomendaciones basadas en datos propios del territorio (no en algoritmos externos) y marketplaces phygital donde el comercio local se integra en la experiencia turística.</WikiP>

      <WikiH2>Preservación cultural</WikiH2>
      <WikiP>La Federación F4 (Preservación Cultural) del modelo heptafederado se dedica a documentar, proteger y difundir el patrimonio cultural de los territorios. Las experiencias inmersivas (DreamSpaces) permiten recorridos guiados virtuales y exhibiciones digitales que complementan la experiencia presencial.</WikiP>

      <WikiH2>Economía creativa</WikiH2>
      <WikiCard accent="orange">
        <ul className="space-y-2">
          <li><strong>Marketplaces phygital:</strong> Integración de comercio físico y digital en un solo ecosistema</li>
          <li><strong>Contenido audiovisual:</strong> Plataforma para creadores con gestión de membresías y suscripciones</li>
          <li><strong>Experiencias XR de pago:</strong> Recorridos inmersivos, simulaciones y formación como productos de valor</li>
          <li><strong>Artesanía digital:</strong> Vinculación de productos artesanales con trazabilidad y narrativa territorial</li>
        </ul>
      </WikiCard>
    </div>
  );
}
