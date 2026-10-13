import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Compass, Sparkles, ShieldCheck, Zap, Users2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { About } from "@/components/landing/About";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SEDigitalHub" },
      { name: "description", content: "Meet SeDigitalHub — our story, mission, values, and the team building the platform for the next generation of digital businesses." },
      { property: "og:title", content: "About — SeDigitalHub" },
      { property: "og:description", content: "Empowering Businesses. Creating Digital Opportunities." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Craft over hype", desc: "We build products we're proud to use ourselves. Details matter — because they compound." },
  { icon: Compass, title: "Customer at the center", desc: "Every roadmap decision starts with a conversation with a customer, not a spreadsheet." },
  { icon: Sparkles, title: "Delight is a feature", desc: "If it feels good, people use it. If people use it, they grow. We optimize for that loop." },
  { icon: ShieldCheck, title: "Trust, always", desc: "Your data is yours. Security, privacy, and transparency aren't features — they're the foundation." },
  { icon: Zap, title: "Momentum", desc: "We ship weekly, iterate daily, and celebrate progress over perfection." },
  { icon: Users2, title: "One team", desc: "Distributed across 14 countries, aligned on one mission — help teams grow." },
];

const team = [
  { name: "Amelia Chen", role: "CEO & Co-founder", grad: "from-brand to-brand-2" },
  { name: "Marcus Reed", role: "CTO & Co-founder", grad: "from-brand-2 to-lime" },
  { name: "Priya Shah", role: "Chief Design Officer", grad: "from-sunny to-brand" },
  { name: "Diego Alvarez", role: "VP of Engineering", grad: "from-brand to-lime" },
  { name: "Sara Nakamura", role: "Head of Product", grad: "from-brand-2 to-sunny" },
  { name: "Oliver Bennett", role: "Head of Customer Success", grad: "from-lime to-brand-2" },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title={<>Empowering businesses. <span className="text-gradient">Creating digital opportunities.</span></>}
        desc="SeDigitalHub is on a mission to give every team the tools, insights, and infrastructure to grow — without the enterprise overhead."
      />

      {/* Mission / Vision */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          {[
            { eyebrow: "Our Mission", title: "Make world-class technology accessible to every ambitious team.", desc: "We believe the tools that power the fastest-growing companies shouldn't require a 50-person IT department. SeDigitalHub is designed to feel effortless from day one — for a solo founder or a 5,000-person enterprise." },
            { eyebrow: "Our Vision", title: "A digital layer that quietly powers the next million businesses.", desc: "By 2030 we want SeDigitalHub to be the invisible backbone behind a million growing companies — helping them ship faster, serve customers better, and reach further than ever before." },
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
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{b.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-subtle">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Core values" title="What we believe, every day." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand/12 text-brand">
                  <v.icon className="size-5" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-ink">{v.title}</h4>
                <p className="mt-1.5 text-sm text-subtle">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + stats via About */}
      <About />

      {/* Team */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="Team" title="A small team, a big mission." desc="Forty-two humans, fourteen countries, one shared obsession: help teams do their best work." />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="text-center"
              >
                <div className={`mx-auto size-24 rounded-full bg-gradient-to-br ${m.grad} shadow-glow`} aria-hidden />
                <div className="mt-4 text-sm font-bold text-ink">{m.name}</div>
                <div className="text-xs text-subtle">{m.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Come build the future with us."
        desc="We're hiring across engineering, design, and customer success."
        primary={{ label: "Get in touch", to: "/contact" }}
        secondary={{ label: "See open roles", to: "/contact" }}
      />
    </SiteShell>
  );
}
