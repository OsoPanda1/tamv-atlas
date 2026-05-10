import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, RefreshCw, Activity, Globe, BookOpen, Database, User, Network } from "lucide-react";
import { ArchitectureMiniMap } from "@/components/atlas/ArchitectureMiniMap";

type ZenodoRec = { id: string; label: string; ok: boolean; doi: string | null; title: string | null; published: string | null; views: number; downloads: number; html: string };
type FigshareRec = { id: string; label: string; ok: boolean; doi: string | null; title: string | null; published: string | null; url: string };
type HubPayload = {
  checked_at: string;
  orcid: { ok: boolean; orcid?: string; name?: string; works?: number; url?: string; error?: string };
  openaire: { ok: boolean; total?: number | null; error?: string };
  zenodo: ZenodoRec[];
  figshare: FigshareRec[];
  totals: { zenodo_views: number; zenodo_downloads: number; zenodo_ok: number; figshare_ok: number };
};

const EXTERNAL_LINKS = [
  { label: "ORCID · Perfil verificado", href: "https://orcid.org/0009-0008-5050-1539", group: "identidad" },
  { label: "OpenAIRE · Búsqueda TAMV", href: "https://explore.openaire.eu/search/result?pid=10.5281/zenodo.20071455", group: "ciencia abierta" },
  { label: "Zenodo · Comunidad TAMV", href: "https://zenodo.org/communities/tamvonline-oficial/", group: "ciencia abierta" },
  { label: "GitHub · OsoPanda1", href: "https://github.com/OsoPanda1", group: "código" },
  { label: "Blog técnico TAMV", href: "https://tamvonlinenetwork.blogspot.com", group: "narrativa" },
  { label: "Odoo · TAMV ONLINE", href: "https://tamvonline-oficial.odoo.com", group: "operación" },
  { label: "Groups.io · Ecosistema LATAM", href: "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM", group: "comunidad" },
];

const HEX_NODES = [
  { id: "isni", label: "ISNI / SNI", desc: "Identidad soberana", angle: 0 },
  { id: "doc", label: "DOIs / PIDs", desc: "Documental científica", angle: 60 },
  { id: "platform", label: "TAMV ONLINE", desc: "Plataforma + servicios", angle: 120 },
  { id: "data", label: "Radares + Seguridad", desc: "Datos + observabilidad", angle: 180 },
  { id: "ai", label: "Isabella + UTAMV", desc: "IA soberana", angle: 240 },
  { id: "xr", label: "RDM + XR/4D", desc: "Territorio + Metaverso", angle: 300 },
];

function HexagonalGraph({ active }: { active: number }) {
  const cx = 200;
  const cy = 200;
  const r = 130;
  const points = HEX_NODES.map((n, i) => {
    const rad = ((n.angle - 90) * Math.PI) / 180;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), idx: i };
  });

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* concentric rings */}
      {[40, 80, 120, 160].map((rr) => (
        <circle key={rr} cx={cx} cy={cy} r={rr} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.08" />
      ))}

      {/* edges between adjacent nodes */}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length];
        return <line key={`e-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="url(#edge)" strokeWidth="1" />;
      })}

      {/* spokes */}
      {points.map((p, i) => (
        <line key={`s-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--primary))" strokeOpacity={active === i ? "0.9" : "0.25"} strokeWidth={active === i ? "1.5" : "0.6"} />
      ))}

      {/* core */}
      <circle cx={cx} cy={cy} r="55" fill="url(#core)" />
      <circle cx={cx} cy={cy} r="18" fill="hsl(var(--primary))" className="animate-pulse" />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-primary-foreground text-[10px] font-mono font-bold">TAMV</text>

      {/* nodes */}
      {points.map((p, i) => (
        <g key={p.id} className="transition-all">
          <circle cx={p.x} cy={p.y} r={active === i ? 16 : 11} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth={active === i ? "2" : "1"} />
          <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--accent))" />
          <text x={p.x} y={p.y - 22} textAnchor="middle" className="fill-foreground text-[9px] font-mono font-semibold">{p.label}</text>
          <text x={p.x} y={p.y + 28} textAnchor="middle" className="fill-muted-foreground text-[8px]">{p.desc}</text>
        </g>
      ))}
    </svg>
  );
}

export default function ConvergenceHub() {
  const [data, setData] = useState<HubPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: err } = await supabase.functions.invoke("external-sync");
      if (err) throw err;
      setData(res as HubPayload);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(() => setActive((a) => (a + 1) % HEX_NODES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    return [
      { label: "Zenodo records", value: `${data.totals.zenodo_ok}/${data.zenodo.length}`, icon: BookOpen },
      { label: "Figshare datasets", value: `${data.totals.figshare_ok}/${data.figshare.length}`, icon: Database },
      { label: "Zenodo views", value: data.totals.zenodo_views.toLocaleString(), icon: Activity },
      { label: "Zenodo downloads", value: data.totals.zenodo_downloads.toLocaleString(), icon: Network },
      { label: "ORCID works", value: data.orcid.works ?? "—", icon: User },
      { label: "OpenAIRE", value: data.openaire.total ?? "—", icon: Globe },
    ];
  }, [data]);

  return (
    <div className="px-6 py-8 md:px-8 lg:px-10 space-y-6">
      <header className="rounded-xl border border-border bg-gradient-to-br from-card via-card/60 to-background p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_40%),radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_40%)]" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_hsl(142_71%_45%)] animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">ISNI · CONVERGENCE HUB · v3.1</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-glow-cyan">TAMV ONLINE · Hub Técnico-Académico</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-3xl">
            Punto de anclaje citable del ecosistema federado: convergencia entre identidad soberana (ISNI/ORCID/DID),
            ciencia abierta (Zenodo · OpenAIRE · Figshare), código (GitHub) y comunidad (Groups.io · Odoo).
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button onClick={load} disabled={loading} size="sm" variant="outline" className="font-mono text-xs">
              <RefreshCw className={`w-3 h-3 mr-1 ${loading ? "animate-spin" : ""}`} />
              {loading ? "sincronizando…" : "sync external sources"}
            </Button>
            {data && (
              <Badge variant="outline" className="font-mono text-[10px]">
                checked: {new Date(data.checked_at).toLocaleString("es-MX")}
              </Badge>
            )}
            {error && <Badge variant="destructive" className="font-mono text-[10px]">{error}</Badge>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* hexagonal graph */}
        <Card className="col-span-12 lg:col-span-7 p-4 bg-card/40 border-border relative overflow-hidden">
          <div className="absolute top-3 left-4 z-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80">MAPA HEXAGONAL · 6 CAPAS</p>
            <p className="text-xs text-muted-foreground">Nodo activo: <span className="text-primary font-mono">{HEX_NODES[active].label}</span></p>
          </div>
          <div className="aspect-square max-w-[500px] mx-auto">
            <HexagonalGraph active={active} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {HEX_NODES.map((n, i) => (
              <button
                key={n.id}
                onClick={() => setActive(i)}
                className={`text-left p-2 rounded border transition-all ${
                  active === i
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background/40 hover:border-primary/50"
                }`}
              >
                <p className="text-[9px] font-mono text-primary">{`L${i}`}</p>
                <p className="text-[10px] font-semibold text-foreground">{n.label}</p>
                <p className="text-[9px] text-muted-foreground line-clamp-1">{n.desc}</p>
              </button>
            ))}
          </div>
        </Card>

        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Card className="p-4 bg-card/40 border-border">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-3">MÉTRICAS EN VIVO</p>
            <div className="grid grid-cols-2 gap-2">
              {stats?.map((s) => (
                <div key={s.label} className="p-3 rounded border border-border bg-background/40">
                  <s.icon className="w-3 h-3 text-primary mb-1" />
                  <p className="text-[9px] uppercase text-muted-foreground tracking-wider">{s.label}</p>
                  <p className="text-lg font-mono font-bold text-foreground">{s.value}</p>
                </div>
              )) ?? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-3 rounded border border-border bg-background/40 h-20 animate-pulse" />
              ))}
            </div>
          </Card>

          <ArchitectureMiniMap />
        </div>
      </div>

      {/* DOIs */}
      <Card className="p-5 bg-card/40 border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">CAPA DOCUMENTAL · DOIs</p>
            <h2 className="text-lg font-semibold text-foreground">Publicaciones Zenodo verificadas en vivo</h2>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">CC BY 4.0</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {(data?.zenodo ?? []).map((r) => (
            <a
              key={r.id}
              href={r.html}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded border border-border bg-background/40 hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-primary">{r.doi ?? `zenodo:${r.id}`}</p>
                  <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary">{r.title ?? r.label}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {r.published ?? "—"} · {r.views ?? 0} views · {r.downloads ?? 0} dl
                  </p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* Figshare */}
      <Card className="p-5 bg-card/40 border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">DATASETS FAIR · FIGSHARE</p>
            <h2 className="text-lg font-semibold text-foreground">Datasets del ecosistema</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {(data?.figshare ?? []).map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded border border-border bg-background/40 hover:border-accent/60 hover:bg-accent/5 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-accent">{r.doi ?? `figshare:${r.id}`}</p>
                  <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-accent">{r.title ?? r.label}</p>
                  <p className="text-[10px] text-muted-foreground">{r.published ?? "—"}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-accent shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* Federated links */}
      <Card className="p-5 bg-card/40 border-border">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-3">FEDERACIÓN · ENLACES SOBERANOS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {EXTERNAL_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between p-3 rounded border border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="min-w-0">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{l.group}</p>
                <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary">{l.label}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
            </a>
          ))}
        </div>
      </Card>

      {/* About atlas */}
      <Card className="p-6 bg-gradient-to-br from-card via-card/60 to-background border-border">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">¿QUÉ ES EL ATLAS TAMV?</p>
        <h2 className="text-xl font-bold text-foreground mb-3">Atlas TAMV · ISNI Convergence</h2>
        <div className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-3">
          <p>
            El <strong className="text-foreground">Atlas TAMV</strong> es la cartografía operativa del ecosistema civilizatorio federado
            <strong className="text-primary"> TAMV ONLINE</strong>: un sistema multicapa que articula identidad soberana (ISNI/SNI), ciencia abierta
            (DOIs en Zenodo, datasets FAIR en Figshare, agregación en OpenAIRE), infraestructura técnica (kernel <span className="font-mono text-accent">MD-X4/X5</span>),
            inteligencia ética (<span className="font-mono">Isabella Villaseñor AI</span>, UTAMV AI Academic Core), territorio digitalizado
            (RDM Digital, Pueblos Digitales) y experiencias inmersivas (XR/4D · Metaverso LATAM).
          </p>
          <p>
            No es un portal ni una app: es <strong className="text-foreground">infraestructura de identidad, conocimiento y automatización</strong> donde
            cada persona, organización, territorio, obra o credencial se materializa como nodo del <em>grafo soberano TAMV</em>, citable mediante PIDs
            (ORCID · DOI · ROR) y opcionalmente verificable mediante DIDs (<span className="font-mono">did:tamv</span>) y credenciales SSI.
          </p>
          <p>
            Este Hub funciona como <strong className="text-foreground">punto de anclaje técnico-académico</strong>: sincroniza en vivo las publicaciones
            con DOI, datasets FAIR, perfiles ORCID y la presencia en OpenAIRE, y ofrece redirecciones soberanas hacia el código
            (<a className="text-primary hover:underline" href="https://github.com/OsoPanda1" target="_blank" rel="noreferrer">GitHub OsoPanda1</a>),
            la operación (<a className="text-primary hover:underline" href="https://tamvonline-oficial.odoo.com" target="_blank" rel="noreferrer">Odoo TAMV</a>),
            la narrativa (<a className="text-primary hover:underline" href="https://tamvonlinenetwork.blogspot.com" target="_blank" rel="noreferrer">Blog técnico</a>)
            y la comunidad LATAM (<a className="text-primary hover:underline" href="https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM" target="_blank" rel="noreferrer">Groups.io · Ecosistema LATAM</a>),
            unificando la wiki interna del Atlas con la wiki distribuida en groups.io.
          </p>
          <p className="text-[11px] text-muted-foreground/70 italic">
            Principio rector: no puede existir soberanía tecnológica sin soberanía de identidad, conocimiento e infraestructura.
          </p>
        </div>
      </Card>
    </div>
  );
}
