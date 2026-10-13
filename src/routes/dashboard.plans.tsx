import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Headphones, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { plans } from "@/data/plans";
import { useProfile } from "@/hooks/useProfile";

export const Route = createFileRoute("/dashboard/plans")({
  head: () => ({
    meta: [{ title: "Plans — SeDigitalHub" }],
  }),
  component: PlansPage,
});

const ADMIN_EMAIL = "support@sedigitalhub.com";

function PlansPage() {
  const { plan: currentPlan } = useProfile();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">Your plan</h2>
        <p className="mt-1 text-sm text-subtle">
          {currentPlan ? (
            <>
              You're currently on the{" "}
              <span className="font-semibold text-brand">{currentPlan.name}</span> plan. Compare
              options below or contact admin to change it.
            </>
          ) : (
            <>You don't have an active plan yet. Contact admin to activate one.</>
          )}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p, i) => {
          const isCurrent = p.slug === currentPlan?.slug;
          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative flex flex-col rounded-3xl border p-6 shadow-card ${
                isCurrent ? "border-brand bg-card ring-1 ring-brand/30" : "border-border bg-card"
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-glow">
                  <Sparkles className="size-3" /> Current plan
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-subtle">
                Deposit Amount
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-ink">${p.price}</span>
                <span className="text-sm text-subtle">/ {p.days} days</span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-2.5 ${
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

              <Button
                asChild
                disabled={isCurrent}
                variant={isCurrent ? "outline" : "default"}
                className={`mt-6 w-full rounded-full ${
                  isCurrent ? "border-border" : "bg-brand-gradient text-white hover:opacity-95"
                }`}
              >
                {isCurrent ? (
                  <span>Current plan</span>
                ) : (
                  <a href={`mailto:${ADMIN_EMAIL}?subject=Change plan to ${p.name}`}>
                    <Headphones className="size-4" /> Contact Admin
                  </a>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
