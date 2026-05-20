// ============================================================================
// ADAPTIVE PIPELINES HOOK - ENTERPRISE AAA CONCURRENCY ORCHESTRATOR
// Thread Budgeting, Race-Condition Prevention & State Unification
// ============================================================================

import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ParallelPipelineOrchestrator,
  type PipelineSection,
  sectionFromPathname,
  type PipelineTask,
} from "@/systems/ParallelPipelineOrchestrator";
import {
  prefetchDAOProposals,
  prefetchDashboardSummary,
  prefetchMSREvents,
  prefetchRepoUnificationSummary,
  prefetchSentinelStatus,
  prefetchSystemHealth,
  prefetchWalletTransactions,
} from "@/services/pipelinePrefetch";

type MembershipTier = "free" | "starter" | "pro" | "business" | "enterprise" | "custom";

const CONCURRENCY_BUDGET: Record<MembershipTier, { primary: number; secondary: number }> = {
  free: { primary: 1, secondary: 1 },
  starter: { primary: 2, secondary: 1 },
  pro: { primary: 2, secondary: 1 },
  business: { primary: 3, secondary: 2 },
  enterprise: { primary: 4, secondary: 2 },
  custom: { primary: 4, secondary: 3 },
};

const getTier = (): MembershipTier => {
  const raw = (localStorage.getItem("tamv.membershipTier") || "free").toLowerCase();
  if (["free", "starter", "pro", "business", "enterprise", "custom"].includes(raw)) {
    return raw as MembershipTier;
  }
  return "free";
};

// Enmascaramos las tareas inyectando una señal de cancelación explícita
const createCancellableTask = (
  id: string,
  section: PipelineSection,
  run: (signal?: AbortSignal) => Promise<unknown>,
  signal?: AbortSignal
): PipelineTask => ({
  id,
  section,
  run: async () => {
    if (signal?.aborted) return;
    try {
      await run(signal);
    } catch (error) {
      // Evitamos la propagación de errores si la tarea fue cancelada intencionalmente
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      throw error;
    }
  },
});

export const useAdaptivePipelines = () => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  
  // Instancia única y persistente del orquestador de tuberías paralelas
  const orchestrator = useMemo(() => new ParallelPipelineOrchestrator(), []);
  
  // Referencia para rastrear y abortar operaciones asíncronas en vuelo al cambiar de sección
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 1. Fase de Limpieza: Abortamos de inmediato cualquier canalización activa previa
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Instanciamos el nuevo controlador para el ciclo de vida de la ruta actual
    const currentController = new AbortController();
    abortControllerRef.current = currentController;
    const { signal } = currentController;

    const section = sectionFromPathname(pathname);
    const tier = getTier();
    const budget = CONCURRENCY_BUDGET[tier];

    // 2. Definición y Construcción Aislada de Tareas (Cancellable Thread-Safe)
    const globalSecondary: PipelineTask[] = [
      createCancellableTask("system-health", "other", () => queryClient.prefetchQuery({ queryKey: ["tamv", "health", "system"], queryFn: prefetchSystemHealth, staleTime: 60_000 }), signal),
      createCancellableTask("sentinel-status", "other", () => queryClient.prefetchQuery({ queryKey: ["tamv", "sentinel", "status"], queryFn: prefetchSentinelStatus, staleTime: 60_000 }), signal),
      createCancellableTask("msr-events", "other", () => queryClient.prefetchQuery({ queryKey: ["tamv", "msr", "events"], queryFn: prefetchMSREvents, staleTime: 45_000 }), signal),
    ];

    const sectionPrimary: Record<PipelineSection, PipelineTask[]> = {
      home: [
        createCancellableTask("home-health", "home", () => queryClient.prefetchQuery({ queryKey: ["tamv", "health", "system"], queryFn: prefetchSystemHealth, staleTime: 60_000 }), signal)
      ],
      dashboard: [
        createCancellableTask("dashboard-metrics", "dashboard", () => queryClient.prefetchQuery({ queryKey: ["tamv", "dashboard", "summary"], queryFn: prefetchDashboardSummary, staleTime: 30_000 }), signal),
        createCancellableTask("dashboard-sentinel", "dashboard", "dashboard", () => queryClient.prefetchQuery({ queryKey: ["tamv", "sentinel", "status"], queryFn: prefetchSentinelStatus, staleTime: 60_000 }), signal),
      ],
      community: [
        createCancellableTask("community-msr", "community", () => queryClient.prefetchQuery({ queryKey: ["tamv", "msr", "events"], queryFn: prefetchMSREvents, staleTime: 45_000 }), signal)
      ],
      isabella: [
        createCancellableTask("isabella-health", "isabella", () => queryClient.prefetchQuery({ queryKey: ["tamv", "health", "system"], queryFn: prefetchSystemHealth, staleTime: 60_000 }), signal)
      ],
      economy: [
        createCancellableTask("economy-wallet-transactions", "economy", () => queryClient.prefetchQuery({ queryKey: ["tamv", "economy", "transactions"], queryFn: prefetchWalletTransactions, staleTime: 15_000 }), signal),
        createCancellableTask("economy-dashboard", "economy", () => queryClient.prefetchQuery({ queryKey: ["tamv", "dashboard", "summary"], queryFn: prefetchDashboardSummary, staleTime: 30_000 }), signal),
      ],
      governance: [
        // Salvaguarda del Modelo Híbrido: Solo la deliberación e indicadores son precargados.
        // La gobernanza del algoritmo central de red permanece protegida fuera de manipulación colectiva.
        createCancellableTask("governance-dao-proposals", "governance", () => queryClient.prefetchQuery({ queryKey: ["tamv", "dao", "proposals"], queryFn: prefetchDAOProposals, staleTime: 30_000 }), signal),
        createCancellableTask("governance-msr-audit", "governance", () => queryClient.prefetchQuery({ queryKey: ["tamv", "msr", "events"], queryFn: prefetchMSREvents, staleTime: 45_000 }), signal),
      ],
      "repo-unification": [
        createCancellableTask("repo-wave-status", "repo-unification", () => queryClient.prefetchQuery({ queryKey: ["tamv", "repo", "summary"], queryFn: prefetchRepoUnificationSummary, staleTime: 300_000 }), signal)
      ],
      other: [],
    };

    const primary = sectionPrimary[section] || [];

    // 3. Ejecución del Flujo con Aislamiento de Hilos
    if (primary.length > 0) {
      orchestrator.runPrimary(primary, budget.primary).catch((error) => {
        // Silenciamos logs de abortos para mantener la consola de producción Enterprise impecable
        if (error?.name !== "AbortError") {
          console.error(`[Pipeline Orchestrator Error][Primary]:`, error);
        }
      });
    }

    if (globalSecondary.length > 0) {
      orchestrator.runSecondary(globalSecondary, budget.secondary);
    }

    // 4. Cleanup atómico al desmontar o cambiar de ruta
    return () => {
      currentController.abort();
    };
  }, [orchestrator, pathname, queryClient]);
};
