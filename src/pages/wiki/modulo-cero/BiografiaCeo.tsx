import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function BiografiaCeo() {
  return (
    <div>
      <WikiBreadcrumb section="modulo-cero" page="biografia-ceo" />
      <WikiH1>Biografía de liderazgo TAMV</WikiH1>

      <WikiCard accent="cyan">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary font-mono shrink-0">AV</div>
          <div>
            <div className="font-semibold text-foreground">Titular ORCID 0009-0008-5050-1539</div>
            <div className="text-primary font-mono text-xs mb-1">"Perfil soberano TAMV"</div>
            <div className="text-xs text-muted-foreground">Perfil con trazabilidad pública · ORCID: 0009-0008-5050-1539</div>
          </div>
        </div>
      </WikiCard>

      <WikiP>
        Titular ORCID 0009-0008-5050-1539 es arquitecto de ecosistemas digitales, desarrollador independiente y fundador de TAMV Online Network y TAMV Enterprise. Operando bajo el seudónimo profesional Anubis Villaseñor, es autor intelectual de la arquitectura MD‑X4 / MD‑X4 Quantum, del Modelo de las 7 Federaciones, de la IA ética Isabella Villaseñor, del ledger BookPI y de más de 35 subsistemas que conforman el ecosistema TAMV.
      </WikiP>

      <WikiH2>Génesis de la resistencia</WikiH2>
      <WikiP>
        La praxis tecnológica del liderazgo TAMV no nace del privilegio corporativo, sino de una respuesta defensiva ante violencia sistémica en el entorno digital. Tras enfrentar robo de identidad, hostigamiento digital y violencia simbólica, convierte esas experiencias en el eje de una arquitectura antifrágil centrada en la protección de la dignidad humana.
      </WikiP>

      <WikiCard title="Arquitectura Anubis — Filosofía de referencia" accent="orange">
        "La tecnología no es neutral si nace de la necesidad de protección. El código debe ser creado en defensa de la dignidad humana."
      </WikiCard>

      <WikiH2>Trayectoria</WikiH2>
      <WikiP>
        Liderazgo técnico y estratégico de TAMV Enterprise/TAMV Online Network desde 2020. Ha liderado más de 21,600 horas de desarrollo independiente, cristalizadas en un ecosistema civilizatorio que integra IA soberana, metaverso, blockchain ético y sistema operativo territorial. Su trayectoria abarca desde la artesanía y el trabajo manual hasta la arquitectura de software, IA aplicada y sistemas territoriales soberanos.
      </WikiP>

      <WikiH2>Reconocimientos y registros</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>ORCID: <WikiLink href="https://orcid.org/0009-0008-5050-1539">0009-0008-5050-1539</WikiLink></li>
        <li>DOI Canon TAMV: <WikiLink href="https://doi.org/10.5281/zenodo.19436662">10.5281/zenodo.19436662</WikiLink></li>
        <li>Isabella AI reconocida por AVIXA como inteligencia ética nacida en Real del Monte</li>
        <li>Registros en OpenAIRE y comunidades de Open Science</li>
      </ul>

      <WikiH2>Perfiles oficiales</WikiH2>
      <div className="flex flex-wrap gap-3 text-xs font-mono mb-6">
        {[
          { label: "Sitio TAMV", href: "https://tamvonline-oficial.odoo.com" },
          { label: "Blog", href: "https://tamvonlinenetwork.blogspot.com" },
          { label: "GitHub", href: "https://github.com/OsoPanda1" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/edwin-oswaldo-castillo-aka-anubis-villaseñor-69a847376/" },
          { label: "Comunidad", href: "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM/topics" },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
