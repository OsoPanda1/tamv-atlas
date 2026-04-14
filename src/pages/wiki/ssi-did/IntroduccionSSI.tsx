import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiCode } from "@/components/WikiComponents";

export default function IntroduccionSSI() {
  return (
    <div>
      <WikiBreadcrumb section="ssi-did" page="introduccion-ssi" />
      <WikiH1>Introducción a SSI y DID</WikiH1>
      <WikiP>Self-Sovereign Identity (SSI) es el modelo donde las personas controlan sus credenciales digitales sin depender de plataformas centralizadas. TAMV adopta este paradigma como pilar de soberanía digital.</WikiP>

      <WikiH2>Conceptos básicos</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-2">
          <li><strong>SSI:</strong> Modelo donde tú controlas tus credenciales digitales, no la plataforma</li>
          <li><strong>DID:</strong> Identificador descentralizado que representa tu identidad en SSI (W3C standard)</li>
          <li><strong>Credencial verificable (VC):</strong> Algo que alguien emite sobre ti (ej. "completó la Maestría UTAMV") que otra parte puede verificar criptográficamente</li>
          <li><strong>DID Document:</strong> Documento JSON que contiene las claves públicas y endpoints de un DID</li>
          <li><strong>Wallet SSI:</strong> Aplicación donde el usuario almacena sus DIDs y credenciales</li>
        </ul>
      </WikiCard>

      <WikiH2>Flujo típico (rol estudiante TAMV)</WikiH2>
      <ul className="list-decimal list-inside space-y-3 text-secondary-foreground mb-6 text-sm">
        <li><strong>Creación de identidad:</strong> Te das de alta en TAMV; el sistema crea tu PersonProfile y opcionalmente un did:tamv</li>
        <li><strong>Participación:</strong> Cursas una maestría o programa; tus avances se registran en ISNI</li>
        <li><strong>Emisión de credenciales:</strong> Al terminar, UTAMV emite una VC que dice "X completó el programa Y en fecha Z"</li>
        <li><strong>Uso de credencial:</strong> Cuando una empresa quiere validar, tú compartes tu VC; ellos verifican la firma y el DID sin necesidad de llamar a TAMV directamente</li>
      </ul>

      <WikiH2>Buenas prácticas de usabilidad</WikiH2>
      <WikiCard accent="orange">
        <ul className="space-y-1">
          <li>· Ofrecer rutas simples ("¿Quieres activar identidad SSI avanzada? Sí/No")</li>
          <li>· Evitar jerga técnica en la UI: hablar de "constancias verificables" en lugar de "VCs"</li>
          <li>· Permitir recuperación segura con procesos comunitarios o co-firma (sin romper el modelo de control del usuario)</li>
        </ul>
      </WikiCard>
    </div>
  );
}
