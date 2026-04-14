import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTable } from "@/components/WikiComponents";

export default function Diferenciadores() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="diferenciadores" />
      <WikiH1>Por qué TAMV y qué nos diferencia</WikiH1>
      <WikiP>
        TAMV nace de una constatación directa: para aprender y construir tecnología de alto nivel en Latinoamérica, la mayoría de los caminos disponibles son costosos, superficiales o condicionados por intereses corporativos. TAMV surge como respuesta a ese vacío, ofreciendo una infraestructura pensada para quien quiere aprender, construir y operar tecnología de forma profunda y sostenible.
      </WikiP>

      <WikiH2>Diferenciadores clave</WikiH2>
      <WikiTable
        headers={["Aspecto", "Plataformas convencionales", "TAMV ONLINE"]}
        rows={[
          ["Propósito", "Maximizar engagement y datos", "Soberanía tecnológica y dignidad humana"],
          ["Modelo de datos", "Centralizado, extractivo", "Federado, soberano, antifrágil"],
          ["Territorio", "Abstracto / virtual", "Anclado a territorio físico real (RDM‑TOS)"],
          ["IA", "Black-box comercial", "Isabella IA: ética, triple bloqueo, transparente"],
          ["Seguridad", "Perimetral convencional", "Post-cuántica (PQC), Zero-Trust, Q-Cells"],
          ["Metaverso", "Especulativo (NFTs, LAND)", "Productivo: turismo, educación, gobierno"],
          ["Validación", "Marketing y VC funding", "Académica: ORCID, DOI, OpenAIRE"],
        ]}
      />

      <WikiH2>Propósito civilizatorio</WikiH2>
      <WikiP>
        TAMV no se concibe como una simple plataforma o aplicación, sino como un ecosistema narrativo, emocional y abierto donde la tecnología existe para proteger, cuidar y conectar, en lugar de manipular, explotar o fragmentar comunidades. El proyecto demuestra que desde México y Latinoamérica es posible diseñar un sistema operativo civilizatorio completo: técnicamente competitivo con cualquier infraestructura global, pero más humano en su propósito.
      </WikiP>

      <WikiCard title="Revanchismo sano" accent="orange">
        TAMV es también una respuesta existencial: la decisión de construir infraestructura propia en vez de adaptarse a un sistema que no reconoce el talento independiente. Nacido desde la resiliencia personal de su fundador, es la prueba de que la innovación no requiere permiso institucional para existir.
      </WikiCard>
    </div>
  );
}
