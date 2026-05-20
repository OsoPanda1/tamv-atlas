import { describe, expect, it } from "vitest";
import { MsrEngine } from "@/core/memory/msr.engine";
import { BookPi } from "@/core/memory/bookpi";
import { EoctService } from "@/core/eoct/eoct.service";
import { ProtocolMsrAdapter } from "@/core/protocol/protocol.msr.adapter";
import { ProtocolBookPiAdapter } from "@/core/protocol/protocol.bookpi.adapter";
import { ProtocolEngine } from "@/core/protocol/protocol.engine";
import { ProtocolOrchestrator } from "@/core/protocol/protocol.orchestrator";
import { ProtocolMonitoringGuardian } from "@/core/guardian/protocol.monitoring.guardian";
import { translateGuardianSignalToScene } from "@/core/xr/protocol.visual.xr";
import { InternalLedger } from "@/core/economy/ledger.internal";
import { EconomyService } from "@/core/economy/economy.service";
import { IdNvidaService } from "@/core/identity/idnvida.service";

describe("TAMV core integration", () => {
  it("executes protocol and records MSR + BookPI", () => {
    const msr = new MsrEngine();
    const bookpi = new BookPi();
    const engine = new ProtocolEngine(new EoctService(), new ProtocolMsrAdapter(msr), new ProtocolBookPiAdapter(bookpi));
    const orchestrator = new ProtocolOrchestrator(engine);

    const out = orchestrator.run({ protocolId: "p1", action: "publish", actorId: "u1", context: { topic: "education" } });
    expect(out.state).toBe("executed");
    expect(msr.list()).toHaveLength(1);
    expect(bookpi.list()).toHaveLength(1);
  });

  it("guardian signal translates to XR scene", () => {
    const guardian = new ProtocolMonitoringGuardian();
    const signal = guardian.observe("Riesgo alto", "red");
    const scene = translateGuardianSignalToScene(signal);
    expect(scene.atmosphere).toBe("critical");
  });

  it("allocates economy credits and supports identity login", () => {
    const id = new IdNvidaService();
    const user = id.signup("test@tamv.org", "123456", "creator");
    const login = id.login("test@tamv.org", "123456");

    const ledger = new InternalLedger();
    const economy = new EconomyService(ledger);
    economy.allocateMonthlyCredits(user.id, "creator");

    expect(login?.user.id).toBe(user.id);
    expect(ledger.listByAccount(user.id)[0].amount).toBeGreaterThan(0);
  });
});
