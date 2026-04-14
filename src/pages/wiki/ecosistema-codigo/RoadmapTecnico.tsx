import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function RoadmapTecnico() {
  return (
    <div>
      <WikiBreadcrumb section="ecosistema-codigo" page="roadmap-tecnico" />
      <WikiH1>Roadmap Técnico</WikiH1>

      <WikiH2>Estado actual (75% de avance)</WikiH2>
      <WikiP>Gran parte de la estructura conceptual, narrativa y técnica está definida, con implementaciones funcionales iniciales. El siguiente tramo requiere consolidar UX, escalar infraestructura y abrir el ecosistema a colaboradores.</WikiP>

      <WikiCard title="2026 — Año de inflexión" accent="cyan">
        <ul className="space-y-2">
          <li><strong>Q1:</strong> Despliegue oficial RDM Digital (4 de marzo). Encendido del núcleo MD-X4 como sistema vivo.</li>
          <li><strong>Q2:</strong> Registro de marca TAMV ONLINE. Consolidación de seguridad y estabilización de UX.</li>
          <li><strong>Q3-Q4:</strong> Apertura progresiva al público. Búsqueda de alianzas e inversión bajo condiciones éticas.</li>
        </ul>
      </WikiCard>

      <WikiH2>Líneas de evolución</WikiH2>
      <ul className="list-disc list-inside space-y-3 text-secondary-foreground mb-6 text-sm">
        <li><strong>Web 4.0 / 5.0:</strong> Identidad digital avanzada, IA colaborativa contextual, canales IA-IA gobernados</li>
        <li><strong>Experiencias sensoriales:</strong> Onboarding inmersivo, DreamSpaces XR, cabinas de mando territoriales</li>
        <li><strong>Escalabilidad federada:</strong> Replicar RDM-TOS en otros territorios LATAM</li>
        <li><strong>UTAMV:</strong> Campus educativo completo con IA pedagógica validada</li>
        <li><strong>Blockchain MSR:</strong> Maduración del ledger BookPI para trazabilidad institucional</li>
      </ul>

      <WikiH2>Del 75% al 100%</WikiH2>
      <WikiP>
        El siguiente tramo implica pasar de "obra de un solo autor" a infraestructura compartida, sin perder el ADN ético y la historia de resistencia que lo originó. Se necesitan colaboradores técnicos, validación institucional y sostenibilidad financiera.
      </WikiP>
    </div>
  );
}
