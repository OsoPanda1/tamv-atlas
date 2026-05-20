import { InternalLedger } from "./ledger.internal";
import { MEMBERSHIP_PLANS, MembershipTier } from "./memberships.service";

export class EconomyService {
  constructor(private readonly ledger: InternalLedger) {}

  allocateMonthlyCredits(accountId: string, tier: MembershipTier) {
    const plan = MEMBERSHIP_PLANS[tier];
    return this.ledger.register(accountId, plan.monthlyCredits, `Asignación mensual ${tier}`);
  }
}
