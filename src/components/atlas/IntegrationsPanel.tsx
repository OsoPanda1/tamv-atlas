import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Github,
  RefreshCw,
  UserCircle2,
  Shield,
  GitMerge,
  ActivitySquare,
  DatabaseZap,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { requestFusionPlan, runRepoFusion } from "@/lib/tamvApi";

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
  const [fusionPlanning, setFusionPlanning] = useState(false);
  const [fusionRunning, setFusionRunning] = useState(false);

  const loadRepos = async () => {
    setLoadingRepos(true);

    const { data } = await supabase
      .from("github_repos")
      .select(
        "full_name, description, language, stars, forks, open_issues, pushed_at"
      )
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

    if (error) return toast.error(error.message);

    toast.success(
      `Sincronizados ${(data as { count?: number })?.count ?? 0} repos`
    );

    loadRepos();
  };

  const planAndShowFusion = async () => {
    setFusionPlanning(true);

    try {
      const plan = await requestFusionPlan("OsoPanda1");
      toast.success(`${plan.repo_count} repos detectados`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo construir plan"
      );
    } finally {
      setFusionPlanning(false);
    }
  };

  const runFusionNow = async () => {
    if (!isAdmin)
      return toast.error("Se requiere rol admin");

    setFusionRunning(true);

    try {
      await runRepoFusion("OsoPanda1");
      toast.success("Fusión ejecutada");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error en fusión"
      );
    } finally {
      setFusionRunning(false);
    }
  };

  const triggerOrcidFetch = async () => {
    setOrcidLoading(true);

    const { data, error } =
      await supabase.functions.invoke("orcid-fetch", {
        body: {},
      });

    setOrcidLoading(false);

    if (error) return toast.error(error.message);

    toast.success(
      `ORCID: ${(data as { display_name?: string })?.display_name ?? "ok"}`
    );
  };

  const metrics = [
    {
      label: "Repos",
      value: loadingRepos ? "..." : repos.length,
      icon: Github,
    },
    {
      label: "Nivel",
      value: isAdmin ? "ADMIN" : "LIMITED",
      icon: Shield,
    },
    {
      label: "Estado",
      value: "ONLINE",
      icon: ActivitySquare,
    },
    {
      label: "Sync",
      value: syncing ? "RUNNING" : "READY",
      icon: DatabaseZap,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/80 p-8 backdrop-blur-3xl">
      {/* fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 space-y-8">
        {/* encabezado */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <span className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
              Federation Integration Layer
            </span>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              Consola Operativa
            </h2>

            <p className="mt-3 text-sm text-slate-400 max-w-2xl">
              Coordinación de sincronización académica,
              federación de repositorios y resolución de
              identidad distribuida.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={orcidLoading}
              onClick={triggerOrcidFetch}
            >
              <UserCircle2 className="w-4 h-4 mr-2" />
              {orcidLoading ? "Resolviendo..." : "Sync ORCID"}
            </Button>

            <Button
              size="sm"
              disabled={syncing || !isAdmin}
              onClick={triggerGithubSync}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${
                  syncing ? "animate-spin" : ""
                }`}
              />
              Sync GitHub
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={fusionPlanning}
              onClick={planAndShowFusion}
            >
              Plan Fusión
            </Button>

            <Button
              size="sm"
              disabled={fusionRunning || !isAdmin}
              onClick={runFusionNow}
            >
              <GitMerge className="w-4 h-4 mr-2" />
              Ejecutar
            </Button>
          </div>
        </div>

        {/* métricas */}
        <div className="grid md:grid-cols-4 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;

            return (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {m.label}
                  </span>
                  <Icon className="w-4 h-4 text-cyan-300" />
                </div>

                <div className="mt-3 text-xl font-semibold text-white">
                  {m.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* repos */}
        <ul className="grid md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <motion.li
              key={repo.full_name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:border-cyan-400/30 transition-all"
            >
              <a
                href={`https://github.com/${repo.full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-cyan-300 hover:underline"
              >
                {repo.full_name}
              </a>

              {repo.description && (
                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-slate-500">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stars}</span>
                <span>Forks {repo.forks}</span>
                <span>Issues {repo.open_issues}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
