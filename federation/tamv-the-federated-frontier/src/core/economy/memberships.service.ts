export type MembershipTier = "free" | "creator" | "guardian" | "institutional";

export interface MembershipPlan {
  tier: MembershipTier;
  monthlyCredits: number;
  canCreateDreamspaces: boolean;
}

export const MEMBERSHIP_PLANS: Record<MembershipTier, MembershipPlan> = {
  free: { tier: "free", monthlyCredits: 50, canCreateDreamspaces: false },
  creator: { tier: "creator", monthlyCredits: 250, canCreateDreamspaces: true },
  guardian: { tier: "guardian", monthlyCredits: 400, canCreateDreamspaces: true },
  institutional: { tier: "institutional", monthlyCredits: 1000, canCreateDreamspaces: true },
};
