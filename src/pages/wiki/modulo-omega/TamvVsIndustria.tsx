import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function TamvVsIndustria() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-omega" page="tamv-vs-industria" />
      <WikiH1>TAMV vs la industria: un espejo incómodo</WikiH1>

      <WikiP>
        La comparación no es entre “plataformas competidoras”, sino entre modelos mentales: la industria tradicional vende productos
        cerrados; TAMV describe una <strong>fábrica de plataformas</strong> legible por personas e inteligencias artificiales.
      </WikiP>

      <WikiH2>Posicionamiento</WikiH2>
      <WikiCard accent="orange">
        <strong>TAMV Online:</strong> sistema operativo de civilización digital firmado en una wiki viva.
      </WikiCard>

      <WikiP>
        Este enfoque resulta incómodo porque desplaza el centro de valor: de la interfaz vistosa a la arquitectura reproducible, de la
        promesa comercial a la capacidad de reconstrucción real del ecosistema.
      </WikiP>
    </div>
  );
}
