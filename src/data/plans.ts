export type PlanFeature = { text: string; included: boolean };

export type PlanSlug = "starter" | "student" | "premium";

export type Plan = {
  slug: PlanSlug;
  name: string;
  /** Deposit amount in USD. */
  price: number;
  /** Duration of the plan in days. */
  days: number;
  /** How many videos this plan can access on the Video Work page. */
  videoLimit: number;
  features: PlanFeature[];
  highlight?: boolean;
};

// NOTE: `videoLimit` controls how many videos a client on this plan can watch
// (see src/routes/dashboard.video-work.tsx). Edit these three numbers if your
// per-plan video counts differ.
export const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    price: 45,
    days: 20,
    videoLimit: 6,
    features: [
      { text: "3 ways of earning", included: true },
      { text: "6 videos access", included: true },
      { text: "Unlimited store access", included: true },
      { text: "Weekly reports", included: false },
      { text: "Extra payout", included: false },
    ],
  },
  {
    slug: "student",
    name: "Student Plan",
    price: 65,
    days: 48,
    videoLimit: 12,
    highlight: true,
    features: [
      { text: "3 ways of earning", included: true },
      { text: "12 videos access", included: true },
      { text: "Unlimited store access", included: true },
      { text: "Weekly reports", included: false },
      { text: "Extra payout", included: false },
    ],
  },
  {
    slug: "premium",
    name: "Premium Plan",
    price: 85,
    days: 180,
    videoLimit: 12,
    features: [
      { text: "3 ways of earning", included: true },
      { text: "12 videos access", included: true },
      { text: "Unlimited store access", included: true },
      { text: "Weekly reports", included: true },
      { text: "Extra payout", included: true },
    ],
  },
];

export const DEFAULT_PLAN: PlanSlug = "starter";

export const PLAN_BY_SLUG: Record<PlanSlug, Plan> = Object.fromEntries(
  plans.map((p) => [p.slug, p]),
) as Record<PlanSlug, Plan>;

/** Resolve a plan by slug, falling back to the default plan for unknown/empty values. */
export function getPlan(slug?: string | null): Plan {
  return PLAN_BY_SLUG[slug as PlanSlug] ?? PLAN_BY_SLUG[DEFAULT_PLAN];
}

/** Options for the admin plan dropdown. */
export const planOptions = plans.map((p) => ({ value: p.slug, label: p.name }));
