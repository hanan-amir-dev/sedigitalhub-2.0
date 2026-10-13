import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Banknote, TrendingUp, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

export const Route = createFileRoute("/dashboard/earnings")({
  head: () => ({
    meta: [{ title: "My Earnings — SeDigitalHub" }],
  }),
  component: EarningsPage,
});

function EarningsPage() {
  const { balance, plan, isLoading } = useProfile();
  const money = (n: number) => `$${n.toFixed(2)}`;

  const stats = [
    { icon: Wallet, label: "Current balance", value: money(balance) },
    { icon: TrendingUp, label: "Plan", value: plan ? plan.name : "No active plan" },
    { icon: Banknote, label: "Withdrawable", value: money(balance) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand/12 text-brand">
              <s.icon className="size-5" />
            </span>
            <p className="mt-4 text-sm font-medium text-subtle">{s.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
              {isLoading ? "…" : s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-ink">Ready to cash out?</h3>
          <p className="text-sm text-subtle">Withdraw your available balance anytime.</p>
        </div>
        <Button asChild className="rounded-full bg-brand-gradient text-white hover:opacity-95">
          <Link to="/dashboard/withdraw">
            <Banknote className="size-4" /> Withdraw
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
