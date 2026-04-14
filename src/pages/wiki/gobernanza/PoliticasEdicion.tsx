import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function PoliticasEdicion() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="politicas-edicion" />
      <WikiH1>Políticas de Edición, Revisión y Aprobación</WikiH1>
      <WikiP>Las identidades pasan por un flujo de edición → moderación → publicación → preservación. La edición permite crear y actualizar; la moderación verifica estructura/semántica y PIDs; la publicación expone en wiki, portales y APIs; la preservación almacena y versiona.</WikiP>
    </div>
  );
}
