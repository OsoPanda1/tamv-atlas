import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function EticaPrivacidad() {
  return (
    <div>
      <WikiBreadcrumb section="gobernanza" page="etica-privacidad" />
      <WikiH1>Ética, Privacidad y Soberanía Digital</WikiH1>

      <WikiH2>Dignity-by-Design</WikiH2>
      <WikiP>
        El principio rector de TAMV establece que la dignidad humana es una condición arquitectónica, no un feature opcional. Cada módulo se evalúa primero por su impacto en las personas y después por su funcionalidad técnica.
      </WikiP>

      <WikiH2>Privacidad</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>Datos mínimos:</strong> Solo se recopilan los datos estrictamente necesarios</li>
          <li><strong>Divulgación selectiva:</strong> El usuario decide qué atributos compartir en cada interacción</li>
          <li><strong>No-explotación:</strong> Los datos nunca se monetizan ni se comparten con terceros sin consentimiento</li>
          <li><strong>Derecho al olvido:</strong> El usuario puede solicitar la eliminación de sus datos</li>
        </ul>
      </WikiCard>

      <WikiH2>Equidad y acceso</WikiH2>
      <WikiP>
        TAMV se diseña reconociendo las desigualdades digitales de Latinoamérica. El ecosistema busca democratizar el acceso a infraestructura tecnológica de alta calidad, permitiendo que comunidades con recursos limitados operen su propio sistema digital soberano.
      </WikiP>

      <WikiH2>Soberanía digital</WikiH2>
      <WikiP>
        La soberanía digital en TAMV significa que cada territorio, organización o persona tiene control real sobre su infraestructura, datos y reglas de operación. No se trata de aislamiento sino de autonomía con interoperabilidad: cada nodo se conecta al ecosistema global manteniendo su independencia.
      </WikiP>

      <WikiH2>Blindaje internacional aplicable</WikiH2>
      <WikiCard title="Marcos de referencia integrados" accent="orange">
        <ul className="space-y-2">
          <li><strong>UNESCO AI Ethics:</strong> diversidad cultural, explicabilidad, supervisión humana y mitigación de sesgos.</li>
          <li><strong>GDPR / RGPD:</strong> minimización, base legal, transparencia y derechos del titular cuando exista dato personal.</li>
          <li><strong>ICCPR:</strong> no discriminación por lengua y defensa del derecho a participar en el entorno digital en la lengua propia.</li>
          <li><strong>UNDRIP:</strong> respeto a pueblos originarios, consentimiento informado y soberanía sobre datos culturales.</li>
        </ul>
      </WikiCard>

      <WikiP>
        En TAMV, estos marcos no se agregan al final como cumplimiento decorativo: condicionan diseño de interfaz, políticas de
        datos, decisiones algorítmicas, etiquetado lingüístico, auditorías de IA y despliegues territoriales sensibles.
      </WikiP>
    </div>
  );
}
