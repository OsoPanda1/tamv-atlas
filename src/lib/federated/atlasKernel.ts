import type {
  BookPiEntry,
  DreamSpace,
  GuardianSignal,
  LedgerEntry,
  MembershipTier,
  MsrEvent,
  ProtocolDecisionPath,
  ProtocolExecution,
  UserProfile,
} from "./types";

const nowIso = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

export class AtlasKernel {
  private users = new Map<string, UserProfile>();
  private msrEvents: MsrEvent[] = [];
  private bookPi: BookPiEntry[] = [];
  private guardianSignals: GuardianSignal[] = [];
  private dreamSpaces = new Map<string, DreamSpace>();
  private ledger: LedgerEntry[] = [];

  createUser(handle: string, displayName: string): UserProfile {
    const user: UserProfile = {
      id: id("usr"),
      handle,
      displayName,
      roles: ["citizen"],
      memberships: ["free"],
      createdAt: nowIso(),
    };
    this.users.set(user.id, user);
    this.logEvent("identity.user.created", user.id, { handle, displayName });
    return user;
  }

  assignMembership(userId: string, tier: MembershipTier): UserProfile {
    const user = this.requireUser(userId);
    if (!user.memberships.includes(tier)) user.memberships.push(tier);
    this.logEvent("economy.membership.assigned", userId, { tier });
    return user;
  }

  executeProtocol(protocolId: string, actorId: string, paths: ProtocolDecisionPath[]): ProtocolExecution {
    const ranked = [...paths].sort((a, b) => (b.score - b.ethicalRisk) - (a.score - a.ethicalRisk));
    const selectedPath = ranked[0];

    const run: ProtocolExecution = {
      protocolId,
      phase: "active",
      selectedPath,
      evaluatedPaths: ranked,
      collapsedAt: nowIso(),
    };

    this.logEvent("protocol.collapsed", actorId, {
      protocolId,
      selectedPath: selectedPath.id,
      evaluatedPathCount: ranked.length,
    });

    if (selectedPath.ethicalRisk > 0.4) {
      this.guardianSignals.push({
        id: id("grd"),
        protocolId,
        severity: selectedPath.ethicalRisk > 0.75 ? "high" : "medium",
        summary: "Risk above civil baseline; route to EOCT/Guardian review.",
        generatedAt: nowIso(),
      });
    }

    this.bookPi.push({
      id: id("bk"),
      eventId: this.msrEvents[this.msrEvents.length - 1]?.id ?? "",
      title: `Protocol ${protocolId} collapse narrative`,
      narrative: `Selected path ${selectedPath.description} with ethical risk ${selectedPath.ethicalRisk.toFixed(2)}.`,
      createdAt: nowIso(),
    });

    return run;
  }

  createDreamSpace(ownerId: string, name: string, isPublic: boolean): DreamSpace {
    this.requireUser(ownerId);
    const dreamSpace: DreamSpace = { id: id("xrs"), name, ownerId, isPublic, participants: [ownerId] };
    this.dreamSpaces.set(dreamSpace.id, dreamSpace);
    this.logEvent("xr.dreamspace.created", ownerId, { dreamSpaceId: dreamSpace.id, isPublic });
    return dreamSpace;
  }

  postLedger(userId: string, amount: number, reason: string): LedgerEntry {
    this.requireUser(userId);
    const entry: LedgerEntry = {
      id: id("ldg"),
      userId,
      kind: amount >= 0 ? "credit" : "debit",
      amount,
      reason,
      createdAt: nowIso(),
    };
    this.ledger.push(entry);
    this.logEvent("economy.ledger.posted", userId, { amount, reason, kind: entry.kind });
    return entry;
  }

  snapshot() {
    return {
      users: Array.from(this.users.values()),
      msrEvents: this.msrEvents,
      bookPi: this.bookPi,
      guardianSignals: this.guardianSignals,
      dreamSpaces: Array.from(this.dreamSpaces.values()),
      ledger: this.ledger,
    };
  }

  private requireUser(userId: string) {
    const user = this.users.get(userId);
    if (!user) throw new Error(`User ${userId} not found`);
    return user;
  }

  private logEvent(type: string, actorId: string, payload: Record<string, unknown>) {
    this.msrEvents.push({ id: id("msr"), type, actorId, timestamp: nowIso(), payload });
  }
}
