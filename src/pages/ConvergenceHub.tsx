import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, RefreshCw, Activity, Globe, BookOpen, Database, User,
  Network, Github, Star, GitFork, Cpu, Shield, Layers, Sparkles, Radio,
} from "lucide-react";
import { AtlasConstellation, type ConstellationNode } from "@/components/atlas/AtlasConstellation";
import { ParticleField } from "@/components/atlas/ParticleField";
import { MetricCounter } from "@/components/atlas/MetricCounter";

type ZenodoRec = { id: string; label: string; ok: boolean; doi: string | null; title: string | null; published: string | null; views: number; downloads: number; html: string };
type FigshareRec = { id: string; label: string; ok: boolean; doi: string | null; title: string | null; published: string | null; url: string };
type GhRepo = { name: string; full_name: string; description: string | null; html_url: string; language: string | null; stars: number; forks: number; updated_at: string; topics: string[] };
type HubPayload = {
  checked_at: string;
  orcid: { ok: boolean; orcid?: string; name?: string; works?: number; url?: string; error?: string };
  openaire: { ok: boolean; total?: number | null; error?: string };
  zenodo: ZenodoRec[];
  figshare: FigshareRec[];
  github: { repos: GhRepo[]; totals: { total: number; stars: number; forks: number; languages: string[] } };
  totals: { zenodo_views: number; zenodo_downloads: number; zenodo_ok: number; figshare_ok: number; github_repos: number; github_stars: number };
};

const EXTERNAL_LINKS = [
  { label: "ORCID · Perfil verificado", href: "https://orcid.org/0009-0008-5050-1539", group: "identidad", icon: User },
  { label: "OpenAIRE · Búsqueda TAMV", href: "https://explore.openaire.eu/search/find?fv0=0009-0008-5050-1539&f0=q", group: "ciencia abierta", icon: Globe },
  { label: "Zenodo · Comunidad TAMV", href: "https://zenodo.org/communities/tamvonline-oficial/", group: "ciencia abierta", icon: BookOpen },
  { label: "Figshare · Datasets FAIR", href: "https://figshare.com/authors/Edwin_Castillo/22063175", group: "datos abiertos", icon: Database },
  { label: "GitHub · OsoPanda1", href: "https://github.com/OsoPanda1", group: "código", icon: Github },
  { label: "Blog técnico TAMV", href: "https://tamvonlinenetwork.blogspot.com", group: "narrativa", icon: Radio },
  { label: "Odoo · TAMV ONLINE", href: "https://tamvonline-oficial.odoo.com", group: "operación", icon: Cpu },
  { label: "Groups.io · Ecosistema LATAM", href: "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM", group: "comunidad", icon: Network },
];

export default function ConvergenceHub() {
  const [data, setData] = useState<HubPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data: res, error: err } = await supabase.functions.invoke("external-sync");
      if (err) throw err;
      setData(res as HubPayload);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setLoading(false); }
  };

  useEffect(() => {
    load();
    const t = setInterval(() => setActive((a) => (a + 1) % 6), 3500);
    return () => clearInterval(t);
  }, []);

  const nodes: ConstellationNode[] = useMemo(() => [
    { id: "isni", short: "ISNI", label: "Identidad ISNI/SNI", desc: "Soberanía de identidad", angle: 0, metric: data?.orcid.works !== undefined ? `${data.orcid.works} works` : "ORCID ✓" },
    { id: "doc", short: "DOI", label: "Capa Documental", desc: "DOIs · Zenodo · Figshare", angle: 60, metric: data ? `${data.totals.zenodo_ok + data.totals.figshare_ok} pubs` : "—" },
    { id: "plat", short: "PLAT", label: "TAMV ONLINE", desc: "Plataforma federada", angle: 120, metric: data ? `${data.github.totals.total} repos` : "—" },
    { id: "data", short: "DATA", label: "Radares + Seguridad", desc: "Observabilidad + PQC", angle: 180, metric: "Zero-Trust" },
    { id: "ai", short: "AI", label: "Isabella + UTAMV", desc: "IA soberana ética", angle: 240, metric: "Active" },
    { id: "xr", short: "XR", label: "RDM + XR/4D", desc: "Territorio + Metaverso", angle: 300, metric: "DreamSpaces" },
  ], [data]);

  const stats = useMemo(() => data ? [
    { label: "Zenodo views", value: data.totals.zenodo_views, icon: Activity, accent: "primary" as const, sub: "ciencia abierta" },
    { label: "Zenodo downloads", value: data.totals.zenodo_downloads, icon: BookOpen, accent: "primary" as const, sub: "uso académico" },
    { label: "DOIs verificados", value: data.totals.zenodo_ok, icon: Sparkles, accent: "accent" as const, sub: `de ${data.zenodo.length}` },
    { label: "Datasets FAIR", value: data.totals.figshare_ok, icon: Database, accent: "accent" as const, sub: "Figshare" },
    { label: "GitHub repos", value: data.totals.github_repos, icon: Github, accent: "emerald" as const, sub: "OsoPanda1" },
    { label: "ORCID works", value: data.orcid.works ?? 0, icon: User, accent: "emerald" as const, sub: data.orcid.orcid ?? "" },
  ] : null, [data]);

  return (
    <div className="relative">
      {/* ambient particle field */}
      <ParticleField className="absolute inset-0 w-full h-full pointer-events-none opacity-60" density={70} />

      <div className="relative px-6 py-8 md:px-8 lg:px-10 space-y-6 max-w-[1600px] mx-auto">
        {/* HERO */}
        <header className="relative rounded-2xl border border-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card/50 to-background" />
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary))_0%,transparent_50%),radial-gradient(circle_at_80%_70%,hsl(var(--accent))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative p-6 md:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
                ATLAS TAMV · CONVERGENCE HUB · v4.0 ENTERPRISE
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              <span className="text-glow-cyan">TAMV ONLINE</span>
              <span className="text-muted-foreground"> · </span>
              <span className="text-glow-orange">Atlas Federado</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl leading-relaxed">
              Infraestructura civilizatoria soberana de identidad, ciencia abierta, código federado e
              inteligencia ética. Punto canónico de anclaje técnico-académico del ecosistema
              <span className="text-primary font-semibold"> LATAM</span>.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <Button onClick={load} disabled={loading} size="sm" className="font-mono text-xs gap-2">
                <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                {loading ? "sincronizando…" : "Sincronizar fuentes en vivo"}
              </Button>
              {data && (
                <Badge variant="outline" className="font-mono text-[10px] border-emerald-400/40 text-emerald-300">
                  ● live · {new Date(data.checked_at).toLocaleString("es-MX")}
                </Badge>
              )}
              <Badge variant="outline" className="font-mono text-[10px]">ISNI · ORCID · DOI · DID</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">PQC Ready</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">CC BY 4.0</Badge>
              {error && <Badge variant="destructive" className="font-mono text-[10px]">{error}</Badge>}
            </div>

            {/* hero-level live metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
              {stats?.map((s) => <MetricCounter key={s.label} {...s} />) ??
                Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-20 rounded-lg border border-border bg-card/40 animate-pulse" />)}
            </div>
          </div>
        </header>

        {/* CONSTELLATION + RIGHT COLUMN */}
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-12 lg:col-span-8 relative overflow-hidden bg-card/40 backdrop-blur-sm border-primary/20">
            <div className="absolute top-4 left-5 z-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/90">Constelación · 6 capas</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Nodo activo: <span className="text-primary font-mono font-semibold">{nodes[active].label}</span>
              </p>
            </div>
            <div className="absolute top-4 right-5 z-10 flex gap-1">
              {nodes.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`select ${i}`}
                  className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`} />
              ))}
            </div>
            <div className="aspect-square max-h-[640px] mx-auto p-4">
              <AtlasConstellation nodes={nodes} active={active} onSelect={setActive} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 pt-0">
              {nodes.map((n, i) => (
                <button key={n.id} onClick={() => setActive(i)}
                  className={`group text-left p-3 rounded-lg border backdrop-blur-sm transition-all ${
                    active === i
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
                      : "border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5"
                  }`}>
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-mono text-primary tracking-wider">L{i} · {n.short}</p>
                    {active === i && <Sparkles className="w-3 h-3 text-accent" />}
                  </div>
                  <p className="text-xs font-semibold text-foreground mt-1">{n.label}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{n.desc}</p>
                  {n.metric !== undefined && (
                    <p className="text-[10px] font-mono text-accent mt-1">{n.metric}</p>
                  )}
                </button>
              ))}
            </div>
          </Card>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card className="p-5 bg-card/40 backdrop-blur-sm border-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-3">Identidad soberana</p>
              <h3 className="text-lg font-bold text-foreground">{data?.orcid.name ?? "Edwin O. Castillo Trejo"}</h3>
              <p className="text-xs text-muted-foreground">Fundador · CEO · ORCID verificado</p>
              <div className="mt-4 space-y-2">
                <a href={data?.orcid.url ?? "https://orcid.org/0009-0008-5050-1539"} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded border border-emerald-400/30 hover:border-emerald-400 hover:bg-emerald-400/5 transition-all group">
                  <span className="font-mono text-[11px] text-emerald-300">ORCID 0009-0008-5050-1539</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="https://github.com/OsoPanda1" target="_blank" rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                  <span className="font-mono text-[11px] text-foreground"><Github className="w-3 h-3 inline mr-1" /> OsoPanda1</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="https://zenodo.org/communities/tamvonline-oficial/" target="_blank" rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                  <span className="font-mono text-[11px] text-foreground"><BookOpen className="w-3 h-3 inline mr-1" /> Comunidad Zenodo TAMV</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </Card>

            <Card className="p-5 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Estado del kernel</p>
                <Shield className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="space-y-2.5">
                {[
                  { k: "MD-X4 Kernel", v: "ACTIVE", color: "emerald" },
                  { k: "Hoyo Negro", v: "OPERATIVO", color: "emerald" },
                  { k: "BookPI Ledger", v: "WRITING", color: "primary" },
                  { k: "Isabella AI", v: "READY", color: "primary" },
                  { k: "Anubis Sentinel", v: "WATCH", color: "accent" },
                  { k: "PQC Crypto", v: "HYBRID", color: "accent" },
                ].map((s) => (
                  <div key={s.k} className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-muted-foreground">{s.k}</span>
                    <span className={`px-2 py-0.5 rounded ${
                      s.color === "emerald" ? "bg-emerald-400/10 text-emerald-300" :
                      s.color === "accent" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>{s.v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-primary/10 via-card/40 to-accent/10 backdrop-blur-sm border-primary/30">
              <Layers className="w-5 h-5 text-primary mb-2" />
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-1">7 capas civilizatorias</p>
              <p className="text-xs text-muted-foreground">
                Ontológica · Constitucional · Política · Económica · Cognitiva · Técnica · Histórica · <span className="text-accent">L7 Territorial (RDM)</span>
              </p>
            </Card>
          </div>
        </div>

        {/* DOIs */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">Capa Documental · DOIs Zenodo</p>
              <h2 className="text-xl font-bold text-foreground mt-1">Publicaciones verificadas en vivo</h2>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">CC BY 4.0</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data?.zenodo ?? []).map((r) => (
              <a key={r.id} href={r.html} target="_blank" rel="noreferrer"
                className="group relative p-4 rounded-lg border border-border bg-background/40 hover:border-primary/60 hover:bg-primary/5 transition-all overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono text-primary">{r.doi ?? `zenodo:${r.id}`}</p>
                    <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary mt-1">{r.title ?? r.label}</p>
                    <div className="flex gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
                      <span>{r.published ?? "—"}</span>
                      <span className="text-primary">👁 {(r.views ?? 0).toLocaleString()}</span>
                      <span className="text-accent">↓ {(r.downloads ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </Card>

        {/* GITHUB REPOS */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-emerald-400/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300 flex items-center gap-2">
                <Github className="w-3 h-3" /> Código Federado · OsoPanda1
              </p>
              <h2 className="text-xl font-bold text-foreground mt-1">Repositorios del ecosistema</h2>
            </div>
            {data?.github.totals && (
              <div className="flex gap-2">
                <Badge variant="outline" className="font-mono text-[10px] gap-1"><Star className="w-3 h-3" /> {data.github.totals.stars}</Badge>
                <Badge variant="outline" className="font-mono text-[10px] gap-1"><GitFork className="w-3 h-3" /> {data.github.totals.forks}</Badge>
              </div>
            )}
          </div>
          {data?.github.totals.languages && data.github.totals.languages.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {data.github.totals.languages.slice(0, 12).map((l) => (
                <span key={l} className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 text-[10px] font-mono">{l}</span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            {(data?.github.repos ?? []).map((r) => (
              <a key={r.full_name} href={r.html_url} target="_blank" rel="noreferrer"
                className="group p-4 rounded-lg border border-border bg-background/40 hover:border-emerald-400/60 hover:bg-emerald-400/5 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground group-hover:text-emerald-300 line-clamp-1 font-mono">{r.name}</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-emerald-300 shrink-0" />
                </div>
                {r.description && <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{r.description}</p>}
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
                  {r.language && <span className="text-emerald-300">● {r.language}</span>}
                  <span>★ {r.stars}</span>
                  <span>⑂ {r.forks}</span>
                  <span className="ml-auto opacity-60">{new Date(r.updated_at).toISOString().slice(0, 10)}</span>
                </div>
              </a>
            ))}
            {!data && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-lg border border-border bg-background/40 animate-pulse" />
            ))}
          </div>
        </Card>

        {/* Figshare */}
        {data?.figshare && data.figshare.length > 0 && (
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">Datasets FAIR · Figshare</p>
                <h2 className="text-xl font-bold text-foreground mt-1">Datasets del ecosistema</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.figshare.map((r) => (
                <a key={r.id} href={r.url} target="_blank" rel="noreferrer"
                  className="group p-4 rounded-lg border border-border bg-background/40 hover:border-accent/60 hover:bg-accent/5 transition-all">
                  <p className="text-[10px] font-mono text-accent">{r.doi ?? `figshare:${r.id}`}</p>
                  <p className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-accent mt-1">{r.title ?? r.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{r.published ?? "—"}</p>
                </a>
              ))}
            </div>
          </Card>
        )}

        {/* Federated links */}
        <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-4">Federación · Enlaces soberanos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXTERNAL_LINKS.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                className="group flex items-center gap-3 p-4 rounded-lg border border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <l.icon className="w-4 h-4 text-primary shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{l.group}</p>
                  <p className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary">{l.label}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            ))}
          </div>
        </Card>

        {/* About atlas */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-card/60 to-accent/5 backdrop-blur-sm border-primary/30 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">¿Qué es el Atlas TAMV?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Atlas TAMV · ISNI Convergence</h2>
            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                El <strong className="text-foreground">Atlas TAMV</strong> es la cartografía operativa del ecosistema civilizatorio federado
                <strong className="text-primary"> TAMV ONLINE</strong>: sistema multicapa que articula identidad soberana (ISNI/SNI),
                ciencia abierta (DOIs en Zenodo, datasets FAIR en Figshare, agregación en OpenAIRE), infraestructura técnica
                (kernel <span className="font-mono text-accent">MD-X4/X5</span>), inteligencia ética
                (<span className="font-mono">Isabella Villaseñor AI</span>, UTAMV AI Academic Core), territorio digitalizado
                (RDM Digital, Pueblos Digitales) y experiencias inmersivas (XR/4D · Metaverso LATAM).
              </p>
              <p>
                No es un portal: es <strong className="text-foreground">infraestructura de identidad, conocimiento y automatización</strong> donde
                cada persona, organización, territorio, obra o credencial se materializa como nodo del <em>grafo soberano TAMV</em>, citable
                mediante PIDs (ORCID · DOI · ROR) y verificable mediante DIDs (<span className="font-mono">did:tamv</span>) y credenciales SSI.
              </p>
              <p className="text-[11px] text-muted-foreground/70 italic border-l-2 border-primary/40 pl-3">
                No puede existir soberanía tecnológica sin soberanía de identidad, conocimiento e infraestructura.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
