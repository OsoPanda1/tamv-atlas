import { TamvHumanCoherenceFilter } from "../protocol/thcf.engine";
import { ThcfResult } from "../protocol/thcf.types";

export type ModuleStatus = "draft" | "in_review" | "closed" | "rework" | "rejected";

export interface TamvModule {
  id: string;
  name: string;
  summary: string;
  userValue: string;
  operationalNotes: string;
  limits: string;
  status: ModuleStatus;
  lastReview?: ThcfResult;
}

export class ModuleRegistryService {
  private modules: TamvModule[] = [];
  constructor(private readonly thcf: TamvHumanCoherenceFilter) {}

  register(module: Omit<TamvModule, "status">): TamvModule {
    const item: TamvModule = { ...module, status: "draft" };
    this.modules.push(item);
    return item;
  }

  evaluateAndClose(moduleId: string): TamvModule | null {
    const mod = this.modules.find((m) => m.id === moduleId);
    if (!mod) return null;
    mod.status = "in_review";
    const result = this.thcf.evaluate(mod);
    mod.lastReview = result;
    mod.status = result.decision === "approved" ? "closed" : result.decision;
    return mod;
  }

  list(): TamvModule[] { return [...this.modules]; }
}
