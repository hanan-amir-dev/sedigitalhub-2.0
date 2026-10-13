import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, PlayCircle, Quote, TrendingUp, Users, DollarSign, Clock } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Testimonials } from "@/components/landing/Testimonials";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — SeDigitalHub" },
      { name: "description", content: "See how teams around the world grow faster with SeDigitalHub. Customer stories, ratings, and measurable results." },
      { property: "og:title", content: "Testimonials — SeDigitalHub" },
      { property: "og:description", content: "Loved by teams that ship — real stories, real outcomes." },
    ],
  }),
  component: TestimonialsPage,
});

const reviews = [
  { name: "Olivia Rhye", role: "Head of Growth · Northwind", quote: "SeDigitalHub replaced three tools overnight. It's the first dashboard my whole team actually opens every morning.", grad: "from-brand to-brand-2" },
  { name: "Phoenix Baker", role: "Founder · Vertex", quote: "We doubled paid conversions in a quarter. The analytics alone are worth it — it just happens to look gorgeous too.", grad: "from-brand-2 to-lime" },
  { name: "Lana Steiner", role: "Creator Lead · Aurora", quote: "Payouts land in minutes. Support answers in minutes. It's rare to find a product this considered.", grad: "from-sunny to-brand" },
  { name: "Demi Wilkinson", role: "COO · Helix", quote: "The onboarding was ridiculous. We were live before lunch. Every product should be this thoughtful.", grad: "from-brand to-lime" },
  { name: "Kai Nakamura", role: "PM · Quanta", quote: "Our team's velocity is measurably higher. The automations quietly do the work of two hires.", grad: "from-brand-2 to-sunny" },
  { name: "Elena Rossi", role: "CMO · Kepler", quote: "Beautiful, fast, and reliable. Our board asked which agency built our dashboards — it's SeDigitalHub out of the box.", grad: "from-lime to-brand" },
];

const metrics = [
  { icon: Users, label: "Happy customers", value: "5,000+" },
  { icon: Star, label: "Average rating", value: "4.9 / 5" },
  { icon: TrendingUp, label: "Avg. growth in 90 days", value: "+42%" },
  { icon: DollarSign, label: "Paid out to teams", value: "$2M+" },
  { icon: Clock, label: "Median support reply", value: "< 4 min" },
];

const cases = [
  { company: "Northwind", industry: "SaaS", stat: "+128%", label: "Trial-to-paid conversion", body: "Consolidated growth, analytics, and payouts into one workspace — cutting tools spend 40% while doubling conversion." },
  { company: "Aurora", industry: "Creator platform", stat: "$1.2M+", label: "Paid to creators in 90 days", body: "Instant payouts and referral tracking helped Aurora scale creator earnings 6× in a single quarter." },
  { company: "Vertex", industry: "Fintech", stat: "99.99%", label: "Uptime across 3 regions", body: "Migrated a legacy dashboard onto SeDigitalHub in 3 weeks. Zero customer-visible downtime since." },
];

function TestimonialsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Testimonials"
        title={<>Loved by teams that <span className="text-gradient">ship.</span></>}
        desc="Real stories from teams around the world using SeDigitalHub to grow revenue, retain customers, and move faster."
      />

      {/* Metrics band */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 text-center card-hover"
              >
                <m.icon className="mx-auto size-5 text-brand" />
                <div className="mt-2 text-2xl font-extrabold text-ink">{m.value}</div>
                <div className="text-xs text-subtle">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured carousel from landing */}
      <Testimonials />

      {/* Review grid */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Customer stories" title="What teams are saying." />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="relative rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <Quote className="absolute -top-3 left-6 size-7 rounded-lg bg-brand-gradient p-1.5 text-white shadow-glow" />
                <div className="mt-2 flex gap-0.5 text-sunny">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">“{r.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`size-10 rounded-full bg-gradient-to-br ${r.grad}`} aria-hidden />
                  <div>
                    <div className="text-sm font-bold text-ink">{r.name}</div>
                    <div className="text-xs text-subtle">{r.role}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Case studies" title="Measurable outcomes, real customers." />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {cases.map((c, i) => (
              <motion.div
                key={c.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="overflow-hidden rounded-3xl border border-border bg-card card-hover"
              >
                <div className="relative aspect-video bg-brand-gradient">
                  <div className="absolute inset-0 grid place-items-center">
                    <PlayCircle className="size-14 text-white/90" strokeWidth={1.2} />
                  </div>
                  <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {c.industry}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-3xl font-extrabold text-ink">{c.stat}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-subtle">{c.label}</div>
                  <div className="mt-4 text-lg font-bold text-ink">{c.company}</div>
                  <p className="mt-1.5 text-sm text-subtle">{c.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Join thousands of teams growing with SeDigitalHub."
        secondary={{ label: "See pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}
