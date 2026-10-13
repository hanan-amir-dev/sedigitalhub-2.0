import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Header } from "@/components/landing/Features";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SeDigitalHub" },
      { name: "description", content: "Simple, transparent pricing. Starter, Professional, and Enterprise plans built for teams of every size." },
      { property: "og:title", content: "Pricing — SeDigitalHub" },
      { property: "og:description", content: "Start free. Upgrade when you're ready. Cancel anytime." },
    ],
  }),
  component: PricingPage,
});

const rows: Array<{ label: string; s: string | boolean; p: string | boolean; e: string | boolean }> = [
  { label: "Workspaces", s: "1", p: "5", e: "Unlimited" },
  { label: "Team members", s: "3", p: "25", e: "Unlimited" },
  { label: "Events / month", s: "1,000", p: "Unlimited", e: "Unlimited" },
  { label: "Advanced analytics", s: false, p: true, e: true },
  { label: "Instant payouts", s: false, p: true, e: true },
  { label: "Automations", s: "5", p: "500", e: "Unlimited" },
  { label: "SSO / SAML", s: false, p: false, e: true },
  { label: "Audit logs", s: false, p: false, e: true },
  { label: "Custom SLA", s: false, p: false, e: true },
  { label: "Dedicated manager", s: false, p: false, e: true },
];

function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple, transparent <span className="text-gradient">pricing.</span></>}
        desc="Start free. Upgrade as you grow. No hidden fees, no per-seat surprises, and cancel anytime."
      />
      <Pricing />

      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Header eyebrow="Compare plans" title="Everything, side-by-side." />
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="grid grid-cols-4 gap-2 border-b border-border bg-surface/60 px-4 py-4 text-sm font-semibold text-ink sm:px-6">
              <div>Feature</div><div className="text-center">Starter</div><div className="text-center">Student Plan</div><div className="text-center">Premium Plan</div>
            </div>
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-4 gap-2 border-b border-border px-4 py-4 text-sm last:border-0 sm:px-6">
                <div className="text-ink">{r.label}</div>
                {(["s","p","e"] as const).map((k) => (
                  <div key={k} className="flex items-center justify-center text-foreground/85">
                    {typeof r[k] === "boolean"
                      ? (r[k] ? <Check className="size-5 text-brand" strokeWidth={3} /> : <X className="size-5 text-subtle/50" />)
                      : <span className="font-medium">{r[k] as string}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <PageCTA
        title="Not sure which plan is right?"
        desc="Chat with our team — we'll help you pick the right fit in under 10 minutes."
        primary={{ label: "Talk to Sales", to: "/contact" }}
        secondary={{ label: "See Features", to: "/features" }}
      />
    </SiteShell>
  );
}
