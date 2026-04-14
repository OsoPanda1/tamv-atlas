import { Link } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";

export default function WikiHome() {
  return (
    <div className="pt-8 lg:pt-0">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 text-xs font-mono text-primary border border-primary/30 rounded-full mb-6 bg-primary/5">
          ISNI · TAMV ONLINE NETWORK
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-glow-cyan">
          TAMV ONLINE
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          Documentación central del ecosistema civilizatorio federado
        </p>
        <p className="text-sm text-muted-foreground font-mono">
          Tecnología Avanzada Mexicana Versátil · Real del Monte, Hidalgo, MX
        </p>
      </div>

      {/* Identity card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-12 border-glow-cyan">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary font-mono shrink-0">
            AV
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Edwin O. Castillo Trejo</h2>
            <p className="text-sm text-primary font-mono mb-2">"Anubis Villaseñor"</p>
            <p className="text-sm text-muted-foreground mb-3">
              Chief Systems Architect · CEO & Founder, TAMV Online Network
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-muted-foreground">
              <span>ORCID: 0009-0008-5050-1539</span>
              <span>DOI: 10.5281/zenodo.19562517</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section grid */}
      <h2 className="text-xl font-semibold text-foreground mb-6">Mapa de navegación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wikiStructure.map((section) => (
          <Link
            key={section.id}
            to={`/wiki/${section.id}/${section.children[0].slug}`}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{section.icon}</span>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-1">
              {section.children.map((page) => (
                <li key={page.slug} className="text-xs text-muted-foreground">
                  · {page.title}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-sm font-semibold text-foreground mb-4">Enlaces externos</h2>
        <div className="flex flex-wrap gap-3 text-xs font-mono">
          {[
            { label: "Sitio oficial", href: "https://tamvonline-oficial.odoo.com" },
            { label: "Blog", href: "https://tamvonlinenetwork.blogspot.com" },
            { label: "GitHub", href: "https://github.com/OsoPanda1" },
            { label: "Zenodo", href: "https://zenodo.org/records/19562517" },
            { label: "ORCID", href: "https://orcid.org/0009-0008-5050-1539" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-border rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
