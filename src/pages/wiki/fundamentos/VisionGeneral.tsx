import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiTag } from "@/components/WikiComponents";

export default function VisionGeneral() {
  return (
    <div>
      <WikiBreadcrumb section="fundamentos" page="vision-general" />
      <WikiH1>Visión General del Ecosistema</WikiH1>
      <WikiP>
        El ecosistema TAMV se estructura como una infraestructura federada de siete capas funcionales (heptafederaciones) coordinadas por el kernel MD‑X4. Cada federación opera como módulo autónomo pero interconectado, permitiendo que el sistema evolucione sin romper su integridad.
      </WikiP>
      <WikiH2>Componentes del ecosistema</WikiH2>
      <WikiCard title="MD‑X4 — Kernel heptafederado" accent="cyan">
        Motor central que organiza las siete federaciones funcionales con modelo antifrágil y Zero‑Trust. Integra gobernanza ejecutable, criptografía post‑cuántica y supervisión humana obligatoria (Human‑in‑the‑Loop).
      </WikiCard>
      <WikiCard title="Isabella Villaseñor AI" accent="orange">
        IA nativa y ética nacida en Real del Monte, reconocida por AVIXA. Opera como Auditor Maestro en Gobernanza XR/4D con triple bloqueo (semántico, conductual, contextual). Protege identidad, media interacciones y garantiza transparencia.
      </WikiCard>
      <WikiCard title="RDM‑TOS — Nodo Territorial" accent="green">
        Sovereign Territorial Operating System que instancia MD‑X4 sobre Real del Monte. Modela el pueblo como sistema crítico de alta disponibilidad con gemelo digital 2D/3D, integrando datos de comercios, turismo, movilidad y riesgos.
      </WikiCard>
      <WikiCard title="UTAMV — Campus Educativo">
        Campus digital de educación avanzada con IA pedagógica (AI Academic Core 2026). Implementa doble pipeline (Normativo y Académico) basado en la Taxonomía de Bloom, con trazabilidad pedagógica y transparencia algorítmica.
      </WikiCard>
      <WikiCard title="Blockchain MSR">
        Blockchain permissioned orientada a trazabilidad, antifraude y reparación ética. Se articula con el ledger BookPI (SHA‑256) para memoria digital como derecho protegido.
      </WikiCard>
      <WikiH2>Modelo de las 7 Federaciones</WikiH2>
      <div className="flex flex-wrap mb-4">
        <WikiTag>F1 · DATA</WikiTag><WikiTag>F2 · INTEL</WikiTag><WikiTag>F3 · SEC</WikiTag>
        <WikiTag>F4 · GOV</WikiTag><WikiTag>F5 · ECON</WikiTag><WikiTag>F6 · VIS</WikiTag>
        <WikiTag>F7 · TERRITORY</WikiTag>
      </div>
      <WikiP>
        Evolución crítica del modelo Triple Hélice: sustituye la coordinación Gobierno‑Academia‑Industria por siete federaciones funcionales como base de control soberano. Cada federación tiene gobernanza propia, protocolos de interoperabilidad definidos y responsables humanos identificados.
      </WikiP>
    </div>
  );
}
