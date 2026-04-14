import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function WebhooksEventos() {
  return (
    <div>
      <WikiBreadcrumb section="implementacion" page="webhooks-eventos" />
      <WikiH1>Webhooks y Eventos del Grafo</WikiH1>
      <WikiP>El grafo ISNI emite eventos cuando se crean, actualizan o vinculan perfiles. Los webhooks notifican a sistemas suscritos sobre cambios en identidades, nuevas publicaciones indexadas, credenciales emitidas y actualizaciones de relaciones entre entidades.</WikiP>
    </div>
  );
}
