import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function Territoriales() {
  return (
    <div>
      <WikiBreadcrumb section="casos-de-uso" page="territoriales" />
      <WikiH1>Casos de Uso Territoriales</WikiH1>
      <WikiP>TAMV se instancia en territorios concretos como sistema operativo soberano. El caso de referencia es Real del Monte, Hidalgo, pero el modelo está diseñado para replicarse en cualquier territorio LATAM.</WikiP>

      <WikiH2>Real del Monte, Hidalgo</WikiH2>
      <WikiCard title="Nodo RDM-TOS — Primer territorio soberano" accent="cyan">
        <ul className="space-y-2">
          <li><strong>Despliegue:</strong> 4 de marzo de 2026 como sistema operativo urbano vivo</li>
          <li><strong>Subsistemas:</strong> Al menos 48 nodos cubriendo comercio, turismo, servicios urbanos, negocios y rutas inteligentes</li>
          <li><strong>Gemelo digital:</strong> Mapas 2D/3D con telemetría en tiempo real</li>
          <li><strong>Objetivo:</strong> Revertir el extractivismo de datos y generar economía gestionada por los propios actores territoriales</li>
          <li><strong>Impacto esperado:</strong> Mayor permanencia del turista y mayor derrama económica local</li>
        </ul>
      </WikiCard>

      <WikiH2>Modelo de replicación LATAM</WikiH2>
      <WikiP>El modelo territorial de TAMV está diseñado como "sistema operativo territorial exportable": cualquier pueblo, ciudad o región puede instanciar su propio nodo RDM-TOS adaptando los módulos a su contexto local sin perder la interoperabilidad con el ecosistema global.</WikiP>

      <WikiH2>Visión continental</WikiH2>
      <WikiP>La adopción esperada en LATAM se estima entre el 1% y 3% del mercado potencial, representando entre 500,000 y 1,500,000 usuarios activos. El modelo busca demostrar que la soberanía tecnológica territorial es viable y escalable desde Latinoamérica.</WikiP>
    </div>
  );
}
