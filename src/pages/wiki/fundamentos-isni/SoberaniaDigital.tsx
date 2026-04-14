import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function SoberaniaDigital() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos-isni" page="soberania-digital" />
      <WikiH1>Soberanía Digital y Enfoque LATAM</WikiH1>

      <WikiP>
        TAMV se diseña desde y para Latinoamérica. No es una adaptación de modelos del norte global, sino un modelo nativo que reconoce las realidades sociales, económicas y culturales de la región, priorizando equidad, acceso y relevancia territorial.
      </WikiP>

      <WikiH2>Pilares de la soberanía digital TAMV</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-3">
          <li><strong>Humanismo en código:</strong> Cada módulo se evalúa bajo un marco ético — protección de dignidad humana, privacidad por diseño (RLS, segmentación), resistencia a manipulación algorítmica y extractivismo de datos.</li>
          <li><strong>Autopoiesis técnica (Kernel MD-X):</strong> MD-X4 provee observabilidad total; MD-X5 autogenera y normaliza módulos (Protocolo HOYO NEGRO), evitando fragmentación de los 177 repos federados.</li>
          <li><strong>Validación científica global:</strong> Anclaje en ciencia abierta — DOIs, comunidad Zenodo, presencia en OpenAIRE y Loop. Documentos citables y verificables más allá del proyecto.</li>
        </ul>
      </WikiCard>

      <WikiH2>Dignity-by-Design</WikiH2>
      <WikiP>
        La privacidad, la identidad y la seguridad no son features opcionales sino condiciones arquitectónicas. Todo módulo se evalúa primero por su impacto en la dignidad humana y luego por su funcionalidad técnica. La IA (Isabella) opera con triple bloqueo ético y Human-in-the-Loop obligatorio.
      </WikiP>

      <WikiH2>Antifragilidad</WikiH2>
      <WikiP>
        El ecosistema no solo resiste perturbaciones: se fortalece con ellas. Las Q-Cells autocurativas, la arquitectura federada y el modelo heptafederado garantizan que ningún fallo parcial comprometa el sistema. El protocolo Fénix reconstituye automáticamente servicios caídos.
      </WikiP>

      <WikiH2>La innovación no necesita permiso</WikiH2>
      <WikiCard accent="orange">
        "La innovación en LATAM no depende de importar plataformas, sino de construir infraestructuras propias basadas en identidad, conocimiento y territorio. TAMV ONLINE es ese intento estructurado." — Desde una posición periférica y frecuentemente ignorada, ISNI demuestra que es posible construir una capa de identidad con estándares globales y una lectura territorial propia.
      </WikiCard>
    </div>
  );
}
