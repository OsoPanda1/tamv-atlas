import { ModuleRegistryService } from "../domain/module-registry.service";
import { TamvHumanCoherenceFilter } from "../protocol/thcf.engine";

export class ThcfController {
  private readonly registry = new ModuleRegistryService(new TamvHumanCoherenceFilter());

  createModule(payload: {
    id: string; name: string; summary: string; userValue: string; operationalNotes: string; limits: string;
  }) {
    return this.registry.register(payload);
  }

  closeModule(moduleId: string) {
    return this.registry.evaluateAndClose(moduleId);
  }

  listModules() {
    return this.registry.list();
  }
}
