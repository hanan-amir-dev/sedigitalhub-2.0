import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Headphones,
  Mail,
  Sparkles,
  Video,
  Wallet,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [{ title: "Overview — SeDigitalHub" }],
  }),
  component: OverviewPage,
});

const ADMIN_EMAIL = "support@sedigitalhub.com";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function OverviewPage() {
  const { displayName, email, plan: currentPlan, balance, isActive } = useProfile();

  const money = (n: number) => `$${n.toFixed(2)}`;

  const placeholderCards = [
    {
      to: "/dashboard/video-work",
      icon: Video,
      label: "Video Work",
      value: `${currentPlan?.videoLimit ?? 0}`,
      hint: "Videos available on your plan.",
    },
    {
      to: "/dashboard/earnings",
      icon: Wallet,
      label: "My Earnings",
      value: money(balance),
      hint: "Your current earnings balance.",
    },
    {
      to: "/dashboard/withdraw",
      icon: Banknote,
      label: "Withdraw",
      value: money(balance),
      hint: "Available balance to withdraw.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.section
        {...fade}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden rounded-3xl border border-border bg-brand-gradient p-6 text-white shadow-glow sm:p-8"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          <Sparkles className="size-3.5" /> Welcome back
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Hi {displayName} 👋
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Here's an overview of your account. Manage your plan, track your work, and withdraw your
          earnings — all from one place.
        </p>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Plan */}
        <motion.section
          {...fade}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
                Current Plan
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h3 className="text-xl font-bold text-ink">
                  {currentPlan ? currentPlan.name : "No active plan"}
                </h3>
                {currentPlan ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/12 px-2.5 py-0.5 text-xs font-bold text-brand">
                    <Sparkles className="size-3" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-subtle">
                    Inactive
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-subtle">
                {currentPlan ? `${currentPlan.days}-day plan` : "Contact admin to activate a plan"}
              </p>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
              <CreditCard className="size-5" />
            </div>
          </div>

          {currentPlan ? (
            <>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-ink">
                  ${currentPlan.price}
                </span>
                <span className="text-sm text-subtle">/ {currentPlan.days} days</span>
              </div>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {currentPlan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-2.5 text-sm ${
                      f.included ? "text-foreground/85" : "text-subtle/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                        f.included ? "bg-brand/12 text-brand" : "bg-surface text-subtle/50"
                      }`}
                    >
                      {f.included ? (
                        <Check className="size-3" strokeWidth={3} />
                      ) : (
                        <X className="size-3" strokeWidth={3} />
                      )}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-5 rounded-2xl border border-dashed border-border bg-surface px-4 py-6 text-center text-sm text-subtle">
              You don't have an active plan yet. Once the admin activates your plan, it'll show here
              with your benefits and videos.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-brand-gradient text-white hover:opacity-95">
              <Link to="/dashboard/plans">
                {currentPlan ? "Manage Plan" : "View Plans"} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border">
              <a href={`mailto:${ADMIN_EMAIL}`}>
                <Headphones className="size-4" /> Contact Admin
              </a>
            </Button>
          </div>
        </motion.section>

        {/* Account Overview */}
        <motion.section
          {...fade}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
            Account Overview
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-subtle">Name</dt>
              <dd className="mt-0.5 font-semibold text-ink">{displayName}</dd>
            </div>
            <div>
              <dt className="text-subtle">Email</dt>
              <dd className="mt-0.5 break-all font-medium text-ink">{email || "—"}</dd>
            </div>
            <div>
              <dt className="text-subtle">Status</dt>
              <dd className="mt-1">
                {isActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/60 px-2.5 py-0.5 text-xs font-bold text-ink">
                    <span className="size-1.5 rounded-full bg-ink" /> Active member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-subtle">
                    <span className="size-1.5 rounded-full bg-subtle" /> No active plan
                  </span>
                )}
              </dd>
            </div>
          </dl>
          <Button asChild variant="outline" className="mt-6 w-full rounded-full border-border">
            <Link to="/dashboard/profile">View Profile</Link>
          </Button>
        </motion.section>
      </div>

      {/* Quick stat / placeholder cards */}
      <motion.section
        {...fade}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="grid gap-6 sm:grid-cols-3"
      >
        {placeholderCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-3xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand/12 text-brand">
                <card.icon className="size-5" />
              </span>
              <ArrowRight className="size-4 text-subtle transition group-hover:translate-x-0.5 group-hover:text-brand" />
            </div>
            <p className="mt-4 text-sm font-medium text-subtle">{card.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{card.value}</p>
            <p className="mt-1 text-xs text-subtle">{card.hint}</p>
          </Link>
        ))}
      </motion.section>

      {/* Contact admin banner */}
      <motion.section
        {...fade}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
            <Mail className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-ink">Need help with something?</h3>
            <p className="text-sm text-subtle">Our team usually replies within a few hours.</p>
          </div>
        </div>
        <Button asChild className="rounded-full bg-brand-gradient text-white hover:opacity-95">
          <a href={`mailto:${ADMIN_EMAIL}`}>
            <Headphones className="size-4" /> Contact Admin
          </a>
        </Button>
      </motion.section>
    </div>
  );
}
