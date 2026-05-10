import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Github, RefreshCw, UserCircle2 } from "lucide-react";
import { toast } from "sonner";

interface RepoRow {
  full_name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  open_issues: number;
  pushed_at: string | null;
}

export default function IntegrationsPanel() {
  const { hasMinRole, session } = useAuth();
  const isAdmin = hasMinRole("admin");
  const [repos, setRepos] = useState<RepoRow[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [orcidLoading, setOrcidLoading] = useState(false);

  const loadRepos = async () => {
    setLoadingRepos(true);
    const { data } = await supabase
      .from("github_repos")
      .select("full_name, description, language, stars, forks, open_issues, pushed_at")
      .order("pushed_at", { ascending: false })
      .limit(20);
    setRepos((data ?? []) as RepoRow[]);
    setLoadingRepos(false);
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const triggerGithubSync = async () => {
    if (!session) return toast.error("Inicia sesión como admin");
    setSyncing(true);
    const { data, error } = await supabase.functions.invoke("github-sync", {
      body: {},
    });
    setSyncing(false);
    if (error) return toast.error(`Error: ${error.message}`);
    toast.success(`Sincronizados ${(data as { count?: number })?.count ?? 0} repos OsoPanda1`);
    loadRepos();
  };

  const triggerOrcidFetch = async () => {
    setOrcidLoading(true);
    const { data, error } = await supabase.functions.invoke("orcid-fetch", { body: {} });
    setOrcidLoading(false);
    if (error) return toast.error(`Error: ${error.message}`);
    toast.success(`ORCID resuelto: ${(data as { display_name?: string })?.display_name ?? "ok"}`);
  };

  return (
    <section className="rounded-xl border border-border bg-card/40 p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Integraciones operativas</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Sincroniza repos de GitHub (OsoPanda1) y resuelve perfiles ORCID al grafo de identidad.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={orcidLoading}
            onClick={triggerOrcidFetch}
            className="gap-1"
          >
            <UserCircle2 className="w-3.5 h-3.5" /> {orcidLoading ? "Resolviendo…" : "Sync ORCID"}
          </Button>
          <Button
            size="sm"
            disabled={syncing || !isAdmin}
            onClick={triggerGithubSync}
            className="gap-1"
            title={isAdmin ? "Sincronizar repos OsoPanda1" : "Requiere rol admin"}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Sincronizando…" : "Sync GitHub"}
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Github className="w-3.5 h-3.5" />
          <span>Repos sincronizados ({loadingRepos ? "…" : repos.length})</span>
        </div>
        {repos.length === 0 && !loadingRepos && (
          <p className="text-xs text-muted-foreground italic">
            Sin repos aún. {isAdmin ? "Pulsa Sync GitHub." : "Un admin debe ejecutar la sincronización."}
          </p>
        )}
        <ul className="grid md:grid-cols-2 gap-2">
          {repos.map((r) => (
            <li
              key={r.full_name}
              className="rounded-md border border-border/50 bg-background/40 p-3 text-xs space-y-1"
            >
              <a
                href={`https://github.com/${r.full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-mono text-[11px]"
              >
                {r.full_name}
              </a>
              {r.description && <p className="text-muted-foreground line-clamp-2">{r.description}</p>}
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                {r.language && <span>{r.language}</span>}
                <span>★ {r.stars}</span>
                <span>⑂ {r.forks}</span>
                <span>issues {r.open_issues}</span>
                {r.pushed_at && <span>{new Date(r.pushed_at).toISOString().slice(0, 10)}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
