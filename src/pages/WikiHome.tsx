import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { wikiStructure } from "@/data/wikiStructure";
import MatrixRain from "@/components/MatrixRain";
import { Input } from "@/components/ui/input";
import { searchWikiStructure } from "@/lib/wikiSearch";

const totalArticles = wikiStructure.reduce((acc, m) => acc + m.children.length, 0);

const ECOSYSTEM_LAYERS = [
  { level: "Nivel 0", name: "ISNI / SNI", desc: "Identidad y Ontología Soberana", color: "#60a5fa", items: ["JSON-LD", "PIDs", "DIDs", "schema.org"] },
  { level: "Nivel 1", name: "MD-X4 / MD-X5", desc: "Kernel Operativo e Infraestructura", color: "#a78bfa", items: ["Observabilidad", "Autopoiesis", "HOYO NEGRO", "GitOps"] },
  { level: "Nivel 2", name: "Isabella AI / IN", desc: "Conciencia Operativa y Seguridad Cognitiva", color: "#34d399", items: ["Triple bloqueo", "Pipeline hexagonal", "Master Canon", "TTS Kore"] },
  { level: "Nivel 3", name: "UTAMV", desc: "Transferencia Cognitiva y Academia", color: "#fbbf24", items: ["Campus XR", "AI Academic Core", "Credenciales VC", "Bloom"] },
  { level: "Nivel 4", name: "RDM Digital", desc: "Nodos Territoriales y Pueblos Digitales", color: "#f472b6", items: ["Smart Destinations", "Comercio digital", "XR tours", "Artesanías"] },
  { level: "Nivel 5", name: "Integración Global", desc: "Odoo, XR/4D, Ciencia Abierta, Redes", color: "#2dd4bf", items: ["Odoo ERP", "ORCID", "Zenodo", "AVIXA"] },
];

const COMPARISON = [
  { feature: "Identidad soberana (DIDs/SSI)", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Grafo de conocimiento semántico", tamv: true, wikipedia: true, prisma: false, sourcegraph: false },
  { feature: "Visualización 3D de ecosistema", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Integración ORCID/DOI/ROR nativa", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Pipeline hexagonal doble flujo", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "IA ética integrada (Isabella)", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Niveles de acceso por rol", tamv: true, wikipedia: false, prisma: true, sourcegraph: true },
  { feature: "XR/4D inmersivo", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Credenciales verificables", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
  { feature: "Territorialización LATAM", tamv: true, wikipedia: false, prisma: false, sourcegraph: false },
];

export default function WikiHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => searchWikiStructure(wikiStructure, searchQuery).slice(0, 12), [searchQuery]);

  return (
    <div className="relative min-h-screen">
      {/* Subtle matrix in background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <MatrixRain color="platinum" />
      </div>
      <div className="fixed inset-0 bg-slate-950/70 z-[1] pointer-events-none" />

      <div className="relative z-10 px-4 py-6 md:px-8 lg:px-10 space-y-8 max-w-7xl mx-auto">

        {/* Hero */}
        <section className="rounded-xl border border-blue-500/25 bg-gradient-to-br from-slate-900/95 to-slate-950/95 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-mono text-blue-400 mb-1 tracking-widest">TAMV ATLAS · INFRAESTRUCTURA SOBERANA DE NOMBRES E IDENTIDADES</p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3" style={{ textShadow: "0 0 20px rgba(96,165,250,0.3)" }}>
                Ecosistema Civilizatorio Federado
              </h1>
              <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
                Documentación central del sistema ISNI / TAMV ONLINE — arquitectura de identidad soberana,
                grafo de conocimiento semántico, kernel MD-X, Isabella AI, UTAMV y nodos territoriales RDM Digital.
                Diseñada para ingenieros, investigadores, gobiernos y comunidades LATAM.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2 py-1 border border-blue-500/30 rounded bg-slate-900/80 text-blue-300">13 módulos</span>
              <span className="px-2 py-1 border border-blue-500/30 rounded bg-slate-900/80 text-blue-300">{totalArticles} artículos</span>
              <span className="px-2 py-1 border border-emerald-500/30 rounded bg-slate-900/80 text-emerald-300">7 federaciones</span>
              <span className="px-2 py-1 border border-purple-500/30 rounded bg-slate-900/80 text-purple-300">48+ nodos</span>
            </div>
          </div>
        </section>

        {/* Ecosystem Architecture Map */}
        <section className="rounded-xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-sm p-5">
          <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#60a5fa]" />
            Mapa de Arquitectura del Ecosistema TAMV
          </h2>
          <div className="space-y-2">
            {ECOSYSTEM_LAYERS.map((layer, i) => (
              <div key={layer.level} className="flex items-stretch gap-3 group">
                <div className="w-20 flex-shrink-0 flex flex-col justify-center">
                  <span className="text-[9px] font-mono font-bold" style={{ color: layer.color }}>{layer.level}</span>
                </div>
                <div
                  className="flex-1 rounded-lg p-3 border transition-colors"
                  style={{ borderColor: `${layer.color}25`, background: `${layer.color}08` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color, boxShadow: `0 0 6px ${layer.color}` }} />
                    <h3 className="text-[11px] font-bold text-slate-200">{layer.name}</h3>
                    <span className="text-[9px] text-slate-500">— {layer.desc}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {layer.items.map(item => (
                      <span key={item} className="text-[8px] px-1.5 py-0.5 rounded bg-slate-950/60 border border-slate-700/50 text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < ECOSYSTEM_LAYERS.length - 1 && (
                  <div className="w-4 flex justify-center">
                    <div className="w-px h-full bg-gradient-to-b from-blue-500/20 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Grafo Lógico ASCII */}
        <section className="rounded-xl border border-purple-500/20 bg-slate-900/40 backdrop-blur-sm p-5">
          <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a78bfa]" />
            Grafo Lógico Integrado — Mapa Maestro
          </h2>
          <pre className="text-[10px] font-mono leading-relaxed overflow-x-auto p-4 bg-slate-950/60 rounded-lg border border-slate-800">
{`        ┌─────────────────────────────────┐
        │     VALIDACIÓN GLOBAL           │
        │  ORCID · ROR · DOI · Zenodo     │
        │  OpenAIRE · LinkedIn · GitHub   │
        └───────────────┬─────────────────┘
                        │ PIDs / APIs
               ┌────────┴────────┐
               │   ISNI / SNI    │  ← Identidad soberana
               └────────┬────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
    ┌─────┴─────┐ ┌─────┴─────┐ ┌────┴─────┐
    │  MD-X4/X5 │ │  ISABELLA │ │  BOOKPI  │
    │  Infra    │ │ Conciencia│ │  Ética   │
    └─────┬─────┘ └─────┬─────┘ └────┬─────┘
          └─────────────┼─────────────┘
                        │
               ┌────────┴────────┐
               │      UTAMV      │  ← Cognición académica
               └────────┬────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
    ┌─────┴──────┐        ┌───────────┴──────┐
    │RDM DIGITAL │        │  OTROS NODOS     │
    │ Territorio │        │ Pueblos digitales │
    └─────┬──────┘        └──────────────────┘
          │
          ▼
  ┌───────────────────────┐
  │ Odoo · Web · XR · 4D  │
  │  Economía soberana     │
  └───────────────────────┘`}
          </pre>
        </section>

        {/* Comparison Table */}
        <section className="rounded-xl border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm p-5">
          <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
            TAMV Atlas vs Wikipedia · Sourcegraph · Prisma
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-2 text-slate-400 font-mono">Funcionalidad</th>
                  <th className="text-center py-2 px-2 text-blue-400 font-bold">TAMV</th>
                  <th className="text-center py-2 px-2 text-slate-500">Wikipedia</th>
                  <th className="text-center py-2 px-2 text-slate-500">Prisma</th>
                  <th className="text-center py-2 px-2 text-slate-500">Sourcegraph</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(row => (
                  <tr key={row.feature} className="border-b border-slate-800/50">
                    <td className="py-1.5 px-2 text-slate-300">{row.feature}</td>
                    <td className="text-center">{row.tamv ? <span className="text-emerald-400">✓</span> : <span className="text-slate-600">—</span>}</td>
                    <td className="text-center">{row.wikipedia ? <span className="text-emerald-400/50">✓</span> : <span className="text-slate-600">—</span>}</td>
                    <td className="text-center">{row.prisma ? <span className="text-emerald-400/50">✓</span> : <span className="text-slate-600">—</span>}</td>
                    <td className="text-center">{row.sourcegraph ? <span className="text-emerald-400/50">✓</span> : <span className="text-slate-600">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Search */}
        <section className="rounded-xl border border-emerald-500/20 bg-slate-900/40 backdrop-blur-sm p-5 space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
              Buscador global del Atlas
            </h2>
            <span className="text-[10px] font-mono text-slate-500">title · slug · módulo</span>
          </div>

          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Busca por artículo, slug o módulo (ej. credenciales, dekateotl, implementación...)"
            className="border-emerald-500/30 bg-slate-950/60 text-slate-200 placeholder:text-slate-500"
            aria-label="Buscar en el Atlas TAMV"
          />

          {searchQuery.trim().length > 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              {searchResults.length > 0 ? (
                <ul className="space-y-1">
                  {searchResults.map((result) => (
                    <li key={result.slug} className="text-[11px]">
                      <Link
                        to={`/articulo/${result.slug}`}
                        className="flex items-center justify-between gap-2 rounded px-2 py-1.5 hover:bg-slate-900/60 transition-colors"
                      >
                        <span className="text-slate-300">{result.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{result.sectionTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-slate-500">Sin coincidencias. Prueba términos como: SSI, orcid, economy, pipelines o zenodo.</p>
              )}
            </div>
          )}
        </section>

        {/* Full Module Index */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Índice global · Módulos 0–12</h2>
            <span className="text-[10px] font-mono text-slate-500">{totalArticles} artículos enlazados</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {wikiStructure.map((section, moduleIndex) => (
              <div key={section.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-blue-500/30 transition-colors backdrop-blur-sm group">
                <Link to={`/modulo/${moduleIndex}`} className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{section.icon}</span>
                  <h3 className="text-[11px] font-bold text-slate-200 group-hover:text-blue-300 transition-colors">{section.title}</h3>
                </Link>
                <ul className="space-y-0.5">
                  {section.children.map(page => (
                    <li key={page.slug}>
                      <Link to={`/articulo/${page.slug}`} className="text-[10px] text-slate-500 hover:text-blue-300 transition-colors block py-0.5">
                        · {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Identity & External Links */}
        <section className="rounded-xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-5">
          <h2 className="text-sm font-bold text-slate-300 mb-3">Identidad Central del Ecosistema</h2>
          <div className="grid md:grid-cols-2 gap-4 text-[10px]">
            <div className="space-y-1.5">
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Autor:</span> Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)</p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Rol:</span> Chief Systems Architect · CEO & Founder</p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">ORCID:</span> <a href="https://orcid.org/0009-0008-5050-1539" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">0009-0008-5050-1539</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">DOI:</span> <a href="https://doi.org/10.5281/zenodo.19562517" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">10.5281/zenodo.19562517</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Nodo:</span> Real del Monte, Hidalgo, México</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-slate-400"><span className="text-blue-400 font-bold">GitHub:</span> <a href="https://github.com/OsoPanda1" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">github.com/OsoPanda1</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Odoo:</span> <a href="https://tamvonline-oficial.odoo.com" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">tamvonline-oficial.odoo.com</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Blog:</span> <a href="https://tamvonlinenetwork.blogspot.com" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">tamvonlinenetwork.blogspot.com</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">Zenodo:</span> <a href="https://zenodo.org/communities/tamvonline-oficial/" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">Comunidad TAMV</a></p>
              <p className="text-slate-400"><span className="text-blue-400 font-bold">AVIXA:</span> <a href="https://xchange.avixa.org" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">AVIXA Xchange</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
