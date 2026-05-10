import { describe, expect, it } from "vitest";
import { AtlasKernel } from "@/lib/federated/atlasKernel";

describe("AtlasKernel", () => {
  it("creates user, membership, ledger and dreamspace with traceability", () => {
    const kernel = new AtlasKernel();
    const user = kernel.createUser("tamv_citizen", "TAMV Citizen");

    kernel.assignMembership(user.id, "creator");
    kernel.postLedger(user.id, 120, "Monthly creator contribution");
    kernel.createDreamSpace(user.id, "Civic Observatory", true);

    const snapshot = kernel.snapshot();

    expect(snapshot.users).toHaveLength(1);
    expect(snapshot.users[0].memberships).toContain("creator");
    expect(snapshot.ledger).toHaveLength(1);
    expect(snapshot.dreamSpaces[0].name).toBe("Civic Observatory");
    expect(snapshot.msrEvents.length).toBeGreaterThanOrEqual(4);
  });

  it("emits guardian signal when chosen protocol path has high ethical risk", () => {
    const kernel = new AtlasKernel();
    const user = kernel.createUser("guardian_node", "Guardian Node");

    const run = kernel.executeProtocol("black-hole", user.id, [
      { id: "safe", description: "Conservative route", score: 0.8, ethicalRisk: 0.1 },
      { id: "aggressive", description: "Fast route", score: 1.0, ethicalRisk: 0.7 },
    ]);

    expect(run.selectedPath.id).toBe("aggressive");

    const snapshot = kernel.snapshot();
    expect(snapshot.guardianSignals).toHaveLength(1);
    expect(snapshot.bookPi).toHaveLength(1);
  });
});
