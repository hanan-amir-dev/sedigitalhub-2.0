import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { UserPlus, Wand2, Rocket, TrendingUp, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — SEDigitalHub" },
      { name: "description", content: "From signup to launch in under 5 minutes. See the onboarding flow, workflow, and benefits of SeDigitalHub." },
      { property: "og:title", content: "How It Works — SeDigitalHub" },
      { property: "og:description", content: "A workflow designed to keep momentum on your side." },
    ],
  }),
  component: HowItWorksPage,
});

const steps = [
  { icon: UserPlus, title: "Create your account", desc: "Sign up in under 30 seconds. No credit card required to get started.", detail: "Bring your team in with SSO or magic-link invites. Your workspace is provisioned in seconds." },
  { icon: Wand2, title: "Customize your workspace", desc: "Bring your brand. Set your goals. Configure the workflows that fit your team.", detail: "Choose from 40+ templates or start from scratch. Wire up integrations with one click." },
  { icon: Rocket, title: "Launch instantly", desc: "Publish your first campaign, product, or automation in under 5 minutes.", detail: "Preview safely, ship to production, and roll back at any time — no downtime." },
  { icon: TrendingUp, title: "Grow with insights", desc: "Track performance in real time and iterate with confidence.", detail: "Dashboards, alerts, and cohort analysis put the right signal in front of the right person." },
];

const benefits = [
  "No credit card required to start",
  "Migrate from existing tools in one click",
  "White-glove onboarding on Professional & Enterprise",
  "SOC 2 Type II, GDPR & HIPAA ready",
  "24/7 support, guaranteed response times",
  "Cancel anytime — your data is yours",
];

function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="How It Works"
        title={<>From signup to launch in <span className="text-gradient">under 5 minutes.</span></>}
        desc="A calm, guided onboarding designed to keep your momentum. No sales calls. No implementation projects. Just results."
      />

      {/* Vertical timeline */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <ol className="relative space-y-10 border-l-2 border-dashed border-brand/30 pl-8 sm:pl-12">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[46px] top-3 grid size-11 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow sm:-left-[58px]">
                  <s.icon className="size-5" />
                </span>
                <div className="rounded-2xl border border-border bg-card p-6 card-hover">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand">Step {i + 1}</div>
                  <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-subtle">{s.desc}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <DashboardPreview />

      {/* Benefits */}
      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Why teams switch" title="A better onboarding, on purpose." desc="We sweat the details so you don't have to. Here's what you get from day one." />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 card-hover"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/12 text-brand">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-[15px] font-medium text-ink">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to launch in 5 minutes?"
        secondary={{ label: "Explore Features", to: "/features" }}
      />
    </SiteShell>
  );
}
