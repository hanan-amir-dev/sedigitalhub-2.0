import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, Rocket, ShieldCheck, Zap, LineChart, Users2, Headphones, Settings2, Layers } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Features } from "@/components/landing/Features";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — SEDigitalHub" },
      { name: "description", content: "Explore the productivity, security, automation, analytics, and collaboration features that power SeDigitalHub." },
      { property: "og:title", content: "Features — SeDigitalHub" },
      { property: "og:description", content: "Every capability your team needs to move faster, ship safer, and grow smarter." },
    ],
  }),
  component: FeaturesPage,
});

const groups = [
  { icon: Rocket, tone: "brand", title: "Productivity", desc: "Ship faster with a workspace that stays out of your way.", points: ["Command bar & keyboard-first UX", "Templates & reusable blocks", "Realtime multiplayer editing"] },
  { icon: ShieldCheck, tone: "lime", title: "Security", desc: "Enterprise-grade security baked in from day one.", points: ["SOC 2 Type II certified", "SSO / SAML & audit logs", "End-to-end encryption"] },
  { icon: Settings2, tone: "sunny", title: "Automation", desc: "Turn repetitive work into invisible background tasks.", points: ["Visual workflow builder", "500+ native integrations", "Webhooks & scheduled jobs"] },
  { icon: Layers, tone: "brand", title: "Scalability", desc: "Grow from 5 users to 50,000 without a rewrite.", points: ["Global edge infrastructure", "Auto-scaling workloads", "99.99% uptime SLA"] },
  { icon: Zap, tone: "lime", title: "Performance", desc: "Every interaction feels instant — because it is.", points: ["Sub-50ms p95 latency", "Offline-first sync engine", "Streaming realtime updates"] },
  { icon: LineChart, tone: "sunny", title: "Analytics", desc: "Signal, not noise. Insights that drive decisions.", points: ["Custom dashboards", "Cohort & funnel analysis", "Exportable reports"] },
  { icon: Users2, tone: "brand", title: "Collaboration", desc: "Bring the whole team into the same picture.", points: ["Comments & mentions", "Roles & granular permissions", "Guest access & sharing"] },
  { icon: Headphones, tone: "lime", title: "Customer Support", desc: "Real humans, fast responses, always premium.", points: ["24/7 chat on all plans", "Dedicated CSM on Enterprise", "Onboarding & migration help"] },
];

const rows: Array<{ label: string; s: string | boolean; p: string | boolean; e: string | boolean }> = [
  { label: "Workspaces", s: "1", p: "5", e: "Unlimited" },
  { label: "Team members", s: "3", p: "25", e: "Unlimited" },
  { label: "Automations / mo", s: "500", p: "50,000", e: "Unlimited" },
  { label: "Advanced analytics", s: false, p: true, e: true },
  { label: "SSO & SAML", s: false, p: false, e: true },
  { label: "Audit logs", s: false, p: false, e: true },
  { label: "Priority support", s: false, p: true, e: true },
  { label: "Dedicated CSM", s: false, p: false, e: true },
];

function FeaturesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Features"
        title={<>One platform. <span className="text-gradient">Every capability.</span></>}
        desc="Purpose-built for modern teams — powerful under the hood, minimal on the surface. Explore the features that make SeDigitalHub the platform teams choose to grow on."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {groups.map((g, i) => (
              <motion.article
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <div
                  aria-hidden
                  className={`absolute -right-16 -top-16 size-40 rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${
                    g.tone === "brand" ? "bg-brand/25" : g.tone === "lime" ? "bg-lime/40" : "bg-sunny/40"
                  }`}
                />
                <div
                  className={`relative grid size-12 place-items-center rounded-xl ${
                    g.tone === "brand" ? "bg-brand/12 text-brand" : g.tone === "lime" ? "bg-lime/25 text-ink" : "bg-sunny/30 text-ink"
                  }`}
                >
                  <g.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{g.title}</h3>
                <p className="mt-1.5 text-sm text-subtle">{g.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* reuse the landing "Everything you need" cards for visual richness */}
      <Features />

      {/* Comparison table */}
      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Header eyebrow="Compare plans" title="Pick the plan that fits — upgrade anytime." />
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="grid grid-cols-4 gap-2 border-b border-border bg-surface/60 px-4 py-4 text-sm font-semibold text-ink sm:px-6">
              <div>Feature</div><div className="text-center">Starter</div><div className="text-center">Professional</div><div className="text-center">Enterprise</div>
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

      <PageCTA secondary={{ label: "See Pricing", to: "/pricing" }} />
    </SiteShell>
  );
}
