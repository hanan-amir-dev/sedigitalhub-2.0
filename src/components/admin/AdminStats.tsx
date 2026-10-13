import { CreditCard, DollarSign, UserCheck, Users, Wallet } from "lucide-react";

import { getPlan, plans } from "@/data/plans";
import type { ClientProfile } from "@/lib/supabase";

const money = (n: number) =>
  `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Admin overview: headline totals + a per-plan breakdown.
 *
 * Revenue is derived from the plan deposit price (src/data/plans.ts) counted
 * for ACTIVE clients only (the toggle = a paid/enabled plan). Client balances
 * are the wallet amounts admins set per client — money owed to clients, kept
 * separate from revenue.
 */
export function AdminStats({ clients }: { clients: ClientProfile[] }) {
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.is_active).length;
  const totalBalance = clients.reduce((sum, c) => sum + Number(c.balance ?? 0), 0);

  const perPlan = plans.map((plan) => {
    const onPlan = clients.filter((c) => getPlan(c.plan).slug === plan.slug);
    const active = onPlan.filter((c) => c.is_active).length;
    return { plan, count: onPlan.length, active, revenue: active * plan.price };
  });
  const totalRevenue = perPlan.reduce((sum, p) => sum + p.revenue, 0);

  const summary = [
    { icon: Users, label: "Total clients", value: String(totalClients) },
    { icon: UserCheck, label: "Active clients", value: String(activeClients) },
    { icon: DollarSign, label: "Revenue", value: money(totalRevenue), hint: "active deposits" },
    { icon: Wallet, label: "Client balances", value: money(totalBalance), hint: "owed to clients" },
  ];

  return (
    <div className="space-y-6">
      {/* Headline totals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-2xl bg-brand/12 text-brand">
                <s.icon className="size-5" />
              </span>
              {s.hint ? (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle/70">
                  {s.hint}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm font-medium text-subtle">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue by plan */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CreditCard className="size-4 text-brand" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">
            Revenue by plan
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perPlan.map(({ plan, count, active, revenue }) => (
            <div
              key={plan.slug}
              className="rounded-3xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-ink">{plan.name}</h4>
                  <p className="text-xs text-subtle">
                    ${plan.price} · {plan.days} days
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-brand/12 px-2.5 py-0.5 text-xs font-bold text-brand">
                  {count} client{count === 1 ? "" : "s"}
                </span>
              </div>

              <p className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                {money(revenue)}
              </p>
              <p className="mt-0.5 text-xs text-subtle">
                {active} active × ${plan.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
