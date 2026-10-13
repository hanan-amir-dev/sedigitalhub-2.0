import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe2, Layers, Rocket, Sparkles, Target, Users2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/our-project")({
  head: () => ({
    meta: [
      { title: "Our Project — SeDigitalHub" },
      {
        name: "description",
        content:
          "Explore the SEDigitalHub platform — the digital infrastructure we're building to help ambitious teams grow without enterprise overhead.",
      },
      { property: "og:title", content: "Our Project — SeDigitalHub" },
      {
        property: "og:description",
        content: "One platform, thoughtfully built — from workspace to payouts to analytics.",
      },
    ],
  }),
  component: OurProjectPage,
});

const pillars = [
  {
    icon: Target,
    title: "Built for momentum",
    desc: "Every screen is designed to keep teams moving — fewer clicks, clearer signal, faster decisions.",
  },
  {
    icon: Layers,
    title: "One connected layer",
    desc: "Growth, analytics, automation, and payouts in a single workspace — no more tab-switching between tools.",
  },
  {
    icon: Users2,
    title: "Team-first by default",
    desc: "Realtime collaboration, granular permissions, and guest access that scales from 3 people to 3,000.",
  },
];

const highlights = [
  {
    icon: Rocket,
    grad: "from-brand to-brand-2",
    title: "Platform core",
    tag: "Live",
    desc: "The workspace, dashboard, and automation engine that 5,000+ teams rely on every day.",
    stats: ["99.99% uptime", "Sub-50ms latency", "40+ integrations"],
  },
  {
    icon: Globe2,
    grad: "from-brand-2 to-lime",
    title: "Global payouts",
    tag: "Expanding",
    desc: "Instant transfers to 40+ countries — built so creators and partners get paid in minutes, not days.",
    stats: ["$2M+ disbursed", "40+ countries", "< 5 min median"],
  },
  {
    icon: Sparkles,
    grad: "from-sunny to-brand",
    title: "Intelligence layer",
    tag: "In progress",
    desc: "Predictive insights and smart recommendations that surface the right next action before you ask.",
    stats: ["Cohort analysis", "Custom alerts", "Exportable reports"],
  },
];

function OurProjectPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Project"
        title={
          <>
            The platform we're building for the{" "}
            <span className="text-gradient">next million businesses.</span>
          </>
        }
        desc="SeDigitalHub is more than a product — it's the digital infrastructure we believe every ambitious team deserves. Quietly powerful, beautifully considered, and built to scale with you."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          {[
            {
              eyebrow: "What we're building",
              title: "A single layer that replaces the patchwork.",
              desc: "Most teams stitch together five or six tools to run growth, analytics, and payouts. We're building one calm, cohesive platform — so your team spends less time managing software and more time serving customers.",
            },
            {
              eyebrow: "Why it matters",
              title: "World-class technology shouldn't require a 50-person IT department.",
              desc: "From solo founders to enterprise teams, everyone deserves infrastructure that feels effortless on day one. That's the bar we design against — every sprint, every release.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-8 card-hover"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                <span className="size-1.5 rounded-full bg-brand" /> {b.eyebrow}
              </div>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {b.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-subtle">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Principles" title="How we approach every release." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand/12 text-brand">
                  <p.icon className="size-5" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-ink">{p.title}</h4>
                <p className="mt-1.5 text-sm text-subtle">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header
            eyebrow="Highlights"
            title="Three pillars. One mission."
            desc="A snapshot of where the platform is today — and where we're headed next."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex flex-col rounded-3xl border border-border bg-card p-8 card-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${h.grad} text-white shadow-glow`}
                  >
                    <h.icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-brand">
                    {h.tag}
                  </span>
                </div>
                <h4 className="mt-6 text-xl font-extrabold tracking-tight text-ink">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-subtle">{h.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {h.stats.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Want to follow along as we ship?"
        desc="Join 5,000+ teams already building on SeDigitalHub. We'd love to show you what's next."
        primary={{ label: "Get in touch", to: "/contact" }}
        secondary={{ label: "Learn about us", to: "/about" }}
      />
    </SiteShell>
  );
}
