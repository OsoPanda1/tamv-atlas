import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard } from "@/components/WikiComponents";

export default function HumanismoEnCodigo() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="humanismo-en-codigo" />
      <WikiH1>Humanismo en Código · Visión del CEO</WikiH1>

      <WikiP>
        La visión que impulsa TAMV ONLINE trasciende lo técnico: cada línea de código, cada decisión arquitectónica y cada módulo del ecosistema está concebido como un acto de reparación ética y un mecanismo de protección de la dignidad humana. Esta filosofía, denominada <strong>Dignity‑by‑Design</strong>, permea toda la arquitectura.
      </WikiP>

      <WikiH2>Principios fundacionales</WikiH2>
      <WikiCard accent="cyan">
        <ul className="space-y-3">
          <li><strong>Código como defensa:</strong> La tecnología debe actuar como cinturón de seguridad, no como herramienta de explotación. Cada sistema se diseña primero para proteger, después para funcionar.</li>
          <li><strong>Memoria inmutable:</strong> Los registros y datos operan como derecho protegido y auditable, no como mercancía transable. El ledger BookPI (SHA-256) garantiza trazabilidad sin especulación.</li>
          <li><strong>Transparencia algorítmica:</strong> A diferencia de las IA comerciales de caja negra, Isabella IA opera bajo triple bloqueo (semántico, conductual, contextual), asegurando que las decisiones automatizadas sean explicables y auditables.</li>
          <li><strong>Soberanía como derecho:</strong> Ningún territorio, comunidad ni individuo debe depender de infraestructuras externas que los conviertan en producto. TAMV ofrece autonomía operativa real.</li>
        </ul>
      </WikiCard>

      <WikiH2>El Estatuto TAMV</WikiH2>
      <WikiP>
        El Estatuto de TAMV establece que cada módulo del ecosistema funcione como mecanismo de reparación ética, memoria inmutable y prevención de abuso algorítmico. Este documento rector define los límites éticos que ningún desarrollo, partnership o inversión puede transgredir.
      </WikiP>

      <WikiH2>Visión de futuro</WikiH2>
      <WikiP>
        TAMV proyecta modelos de economía justa, protección a comunidades vulnerables y plataformas donde la dignidad del usuario, la soberanía de datos y la no‑explotación de información son condiciones de diseño, no promesas posteriores. Si alguna empresa o institución ve el potencial real del proyecto, las alianzas están abiertas bajo una condición clara: respetar el ADN ético y civilizatorio de TAMV.
      </WikiP>

      <WikiCard title="Compromiso inamovible" accent="orange">
        "Seguiré dejando huellas — documentos, código, modelos, relatos — para que, algún día, Latinoamérica pueda mirar atrás y ver lo que pudo tener en sus manos." — Edwin O. Castillo Trejo
      </WikiCard>
    </div>
  );
}
