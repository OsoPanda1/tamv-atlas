import crypto from "crypto";
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

type IsoTime = string;
type EntityId = string;
type Hash = string;

type DomainCommand =
  | CreateUserCommand
  | AssignMembershipCommand
  | ExecuteProtocolCommand
  | CreateDreamSpaceCommand
  | PostLedgerCommand;

type DomainEvent =
  | UserCreatedEvent
  | MembershipAssignedEvent
  | ProtocolCollapsedEvent
  | GuardianTriggeredEvent
  | DreamSpaceCreatedEvent
  | LedgerPostedEvent
  | NarrativeWrittenEvent;

interface KernelMetadata {
  eventId: EntityId;
  timestamp: IsoTime;
  version: number;
  checksum: Hash;
  actorId: string;
}

interface EventEnvelope<T extends DomainEvent> {
  meta: KernelMetadata;
  data: T;
}

interface CreateUserCommand {
  type: "CreateUser";
  handle: string;
  displayName: string;
}

interface AssignMembershipCommand {
  type: "AssignMembership";
  userId: string;
  tier: MembershipTier;
}

interface ExecuteProtocolCommand {
  type: "ExecuteProtocol";
  protocolId: string;
  actorId: string;
  paths: ProtocolDecisionPath[];
}

interface CreateDreamSpaceCommand {
  type: "CreateDreamSpace";
  ownerId: string;
  name: string;
  isPublic: boolean;
}

interface PostLedgerCommand {
  type: "PostLedger";
  userId: string;
  amount: number;
  reason: string;
}

interface UserCreatedEvent {
  type: "UserCreated";
  user: UserProfile;
}

interface MembershipAssignedEvent {
  type: "MembershipAssigned";
  userId: string;
  tier: MembershipTier;
}

interface ProtocolCollapsedEvent {
  type: "ProtocolCollapsed";
  execution: ProtocolExecution;
}

interface GuardianTriggeredEvent {
  type: "GuardianTriggered";
  signal: GuardianSignal;
}

interface DreamSpaceCreatedEvent {
  type: "DreamSpaceCreated";
  dreamSpace: DreamSpace;
}

interface LedgerPostedEvent {
  type: "LedgerPosted";
  entry: LedgerEntry;
}

interface NarrativeWrittenEvent {
  type: "NarrativeWritten";
  entry: BookPiEntry;
}

interface KernelState {
  users: Record<string, UserProfile>;
  dreamSpaces: Record<string, DreamSpace>;
  ledger: LedgerEntry[];
  guardianSignals: GuardianSignal[];
  narratives: BookPiEntry[];
  protocolExecutions: ProtocolExecution[];
}

const initialState = (): KernelState => ({
  users: {},
  dreamSpaces: {},
  ledger: [],
  guardianSignals: [],
  narratives: [],
  protocolExecutions: [],
});

const nowIso = (): IsoTime => new Date().toISOString();
const id = (prefix: string): EntityId => `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
const checksum = (obj: unknown): Hash => crypto.createHash("sha512").update(JSON.stringify(obj)).digest("hex");

class EventStore {
  private readonly stream: EventEnvelope<DomainEvent>[] = [];

  append<T extends DomainEvent>(event: T, actorId: string): EventEnvelope<T> {
    const envelope: EventEnvelope<T> = {
      meta: {
        eventId: id("evt"),
        timestamp: nowIso(),
        version: this.stream.length + 1,
        checksum: checksum(event),
        actorId,
      },
      data: event,
    };
    this.stream.push(envelope);
    return envelope;
  }

  all(): EventEnvelope<DomainEvent>[] {
    return [...this.stream];
  }

  reset(events: EventEnvelope<DomainEvent>[] = []): void {
    this.stream.length = 0;
    this.stream.push(...events);
  }

  verifyIntegrity(): boolean {
    return this.stream.every((event) => checksum(event.data) === event.meta.checksum);
  }
}

function reduce(state: KernelState, event: DomainEvent): KernelState {
  switch (event.type) {
    case "UserCreated":
      return {
        ...state,
        users: { ...state.users, [event.user.id]: event.user },
      };
    case "MembershipAssigned": {
      const user = state.users[event.userId];
      if (!user) return state;
      if (user.memberships.includes(event.tier)) return state;
      return {
        ...state,
        users: {
          ...state.users,
          [event.userId]: { ...user, memberships: [...user.memberships, event.tier] },
        },
      };
    }
    case "DreamSpaceCreated":
      return {
        ...state,
        dreamSpaces: { ...state.dreamSpaces, [event.dreamSpace.id]: event.dreamSpace },
      };
    case "LedgerPosted":
      return { ...state, ledger: [...state.ledger, event.entry] };
    case "GuardianTriggered":
      return { ...state, guardianSignals: [...state.guardianSignals, event.signal] };
    case "NarrativeWritten":
      return { ...state, narratives: [...state.narratives, event.entry] };
    case "ProtocolCollapsed":
      return { ...state, protocolExecutions: [...state.protocolExecutions, event.execution] };
    default:
      return state;
  }
}

class ProtocolVM {
  static collapse(protocolId: string, paths: ProtocolDecisionPath[]): ProtocolExecution {
    if (!paths.length) throw new Error("No protocol paths");
    const ranked = [...paths].sort((a, b) => b.score - b.ethicalRisk * 2 - (a.score - a.ethicalRisk * 2));
    return {
      protocolId,
      phase: "active",
      selectedPath: ranked[0],
      evaluatedPaths: ranked,
      collapsedAt: nowIso(),
    };
  }
}

export class AtlasKernel {
  private readonly store = new EventStore();
  private state: KernelState = initialState();

  createUser(handle: string, displayName: string): UserProfile {
    const [event] = this.dispatch({ type: "CreateUser", handle, displayName }, "system");
    return (event as UserCreatedEvent).user;
  }

  assignMembership(userId: string, tier: MembershipTier): UserProfile {
    this.requireUser(userId);
    this.dispatch({ type: "AssignMembership", userId, tier }, "system");
    return this.state.users[userId];
  }

  executeProtocol(protocolId: string, actorId: string, paths: ProtocolDecisionPath[]): ProtocolExecution {
    const events = this.dispatch({ type: "ExecuteProtocol", protocolId, actorId, paths }, actorId);
    const collapsed = events.find((event): event is ProtocolCollapsedEvent => event.type === "ProtocolCollapsed");
    if (!collapsed) throw new Error("Protocol execution did not collapse");
    return collapsed.execution;
  }

  createDreamSpace(ownerId: string, name: string, isPublic: boolean): DreamSpace {
    this.requireUser(ownerId);
    const [event] = this.dispatch({ type: "CreateDreamSpace", ownerId, name, isPublic }, ownerId);
    return (event as DreamSpaceCreatedEvent).dreamSpace;
  }

  postLedger(userId: string, amount: number, reason: string): LedgerEntry {
    this.requireUser(userId);
    const [event] = this.dispatch({ type: "PostLedger", userId, amount, reason }, userId);
    return (event as LedgerPostedEvent).entry;
  }

  dispatch(command: DomainCommand, actorId = "system"): DomainEvent[] {
    const events = this.decide(command);
    for (const event of events) {
      this.store.append(event, actorId);
      this.state = reduce(this.state, event);
    }
    return events;
  }

  eventLog(): EventEnvelope<DomainEvent>[] {
    return this.store.all();
  }

  verify(): boolean {
    return this.store.verifyIntegrity();
  }

  replay(events: EventEnvelope<DomainEvent>[]): void {
    this.state = initialState();
    this.store.reset(events);
    for (const event of events) {
      this.state = reduce(this.state, event.data);
    }
  }

  snapshot() {
    const msrEvents: MsrEvent[] = this.store.all().map((event) => ({
      id: event.meta.eventId,
      type: `kernel.${event.data.type}`,
      actorId: event.meta.actorId,
      timestamp: event.meta.timestamp,
      payload: event.data as unknown as Record<string, unknown>,
    }));

    return {
      users: Object.values(this.state.users),
      msrEvents,
      bookPi: [...this.state.narratives],
      guardianSignals: [...this.state.guardianSignals],
      dreamSpaces: Object.values(this.state.dreamSpaces),
      ledger: [...this.state.ledger],
      protocolExecutions: [...this.state.protocolExecutions],
    };
  }

  private requireUser(userId: string): UserProfile {
    const user = this.state.users[userId];
    if (!user) throw new Error(`User ${userId} not found`);
    return user;
  }

  private decide(command: DomainCommand): DomainEvent[] {
    switch (command.type) {
      case "CreateUser":
        return [{
          type: "UserCreated",
          user: {
            id: id("usr"),
            handle: command.handle,
            displayName: command.displayName,
            roles: ["citizen"],
            memberships: ["free"],
            createdAt: nowIso(),
          },
        }];
      case "AssignMembership":
        return [{ type: "MembershipAssigned", userId: command.userId, tier: command.tier }];
      case "CreateDreamSpace":
        return [{
          type: "DreamSpaceCreated",
          dreamSpace: {
            id: id("xrs"),
            ownerId: command.ownerId,
            name: command.name,
            isPublic: command.isPublic,
            participants: [command.ownerId],
          },
        }];
      case "PostLedger":
        return [{
          type: "LedgerPosted",
          entry: {
            id: id("ldg"),
            userId: command.userId,
            amount: command.amount,
            reason: command.reason,
            kind: command.amount >= 0 ? "credit" : "debit",
            createdAt: nowIso(),
          },
        }];
      case "ExecuteProtocol": {
        const execution = ProtocolVM.collapse(command.protocolId, command.paths);
        const events: DomainEvent[] = [{ type: "ProtocolCollapsed", execution }];

        if (execution.selectedPath.ethicalRisk > 0.4) {
          events.push({
            type: "GuardianTriggered",
            signal: {
              id: id("grd"),
              protocolId: command.protocolId,
              severity: execution.selectedPath.ethicalRisk > 0.75 ? "high" : "medium",
              summary: "Risk above civil baseline; route to EOCT/Guardian review.",
              generatedAt: nowIso(),
            },
          });
        }

        events.push({
          type: "NarrativeWritten",
          entry: {
            id: id("bk"),
            eventId: command.protocolId,
            title: `Protocol ${command.protocolId} collapse narrative`,
            narrative: execution.selectedPath.description,
            createdAt: nowIso(),
          },
        });

        return events;
      }
    }
  }
}
