import { WikiH1, WikiH2, WikiP, WikiBreadcrumb, WikiCard, WikiLink } from "@/components/WikiComponents";

export default function Creditos() {
  return (
    <div>
      <WikiBreadcrumb section="referencias" page="creditos" />
      <WikiH1>Créditos y Agradecimientos</WikiH1>

      <WikiH2>Autor y arquitecto</WikiH2>
      <WikiCard accent="cyan">
        <strong>Edwin Oswaldo Castillo Trejo ("Anubis Villaseñor")</strong><br />
        CEO & Founder, TAMV Online Network<br />
        Chief Systems Architect<br />
        ORCID: <WikiLink href="https://orcid.org/0009-0008-5050-1539">0009-0008-5050-1539</WikiLink><br />
        Ubicación: Real del Monte, Hidalgo, México
      </WikiCard>

      <WikiH2>Propiedad intelectual</WikiH2>
      <WikiP>
        Este ecosistema es propiedad intelectual de © 2026, TAMV Online Network / Edwin Oswaldo Castillo Trejo. La documentación técnica se publica bajo licencia Creative Commons Attribution 4.0 International (CC BY 4.0).
      </WikiP>

      <WikiH2>Reconocimientos</WikiH2>
      <ul className="list-disc list-inside space-y-2 text-secondary-foreground mb-6 text-sm">
        <li>AVIXA por el reconocimiento de Isabella IA como inteligencia ética</li>
        <li>Zenodo / CERN por la infraestructura de acceso abierto</li>
        <li>OpenAIRE por la indexación en el grafo europeo de ciencia</li>
        <li>La comunidad de Real del Monte, Hidalgo, como territorio de referencia</li>
      </ul>

      <WikiH2>Contacto</WikiH2>
      <WikiP>
        Para consultas sobre alianzas estratégicas, contribuciones o despliegue institucional:
      </WikiP>
      <div className="flex flex-wrap gap-3 text-xs font-mono mb-6">
        <a href="https://tamvonline-oficial.odoo.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">Sitio oficial ↗</a>
        <a href="https://github.com/OsoPanda1" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/edwin-oswaldo-castillo-aka-anubis-villaseñor-69a847376/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">LinkedIn ↗</a>
      </div>

      <WikiCard title="Dedicatoria" accent="orange">
        "Este proyecto no nació de un pitch deck ni de un bootcamp. Nació de montañas, neblina, días sin comer y la convicción de que desde Latinoamérica se puede construir tecnología que defienda la dignidad humana. A todos los que creen que la innovación no necesita permiso."
      </WikiCard>
    </div>
  );
}
