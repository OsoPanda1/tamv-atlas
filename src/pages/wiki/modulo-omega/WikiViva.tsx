import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function WikiViva() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="wiki-viva" />
      <WikiH1>Wiki viva: cuando la documentación despliega mundos</WikiH1>

      <WikiP>
        En TAMV, un artículo no es solo lectura: puede convertirse en especificación ejecutable para activar pipelines de identidad,
        operación territorial, analítica académica o experiencias XR.
      </WikiP>

      <WikiH2>Modelo operativo</WikiH2>
      <WikiCode>{`Artículo wiki -> decisión validada -> pipeline ejecutado
- Provisionar entorno UTAMV
- Levantar nodo RDM
- Emitir credenciales verificables
- Registrar evidencia en BookPI`}</WikiCode>

      <WikiCard title="Resultado estratégico" accent="cyan">
        La documentación deja de ser estática y pasa a ser interfaz viva entre gobernanza, ingeniería y despliegue territorial.
      </WikiCard>
    </div>
  );
}
