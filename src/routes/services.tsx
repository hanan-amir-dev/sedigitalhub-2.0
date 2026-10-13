import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Globe,
  Layout,
  Palette,
  Smartphone,
  TrendingUp,
  Users2,
  Youtube,
  Zap,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SeDigitalHub" },
      {
        name: "description",
        content:
          "Professional digital services from SeDigitalHub — platform setup, growth strategy, custom integrations, and dedicated support for teams that want to move faster.",
      },
      { property: "og:title", content: "Services — SeDigitalHub" },
      {
        property: "og:description",
        content: "Expert help when you need it — from onboarding to scale.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Globe,
    tone: "brand",
    title: "Web Development",
    desc: "Build modern, responsive, secure, and scalable websites using the latest technologies tailored to your business goals.",
    points: ["Modern frameworks & technologies", "Responsive design", "SEO optimization"],
  },
  {
    icon: Smartphone,
    tone: "lime",
    title: "Mobile Development",
    desc: "Develop high-performance Android and iOS applications with intuitive user experiences and scalable architecture.",
    points: ["Native & cross-platform apps", "Intuitive UX design", "Scalable architecture"],
  },
  {
    icon: Layout,
    tone: "sunny",
    title: "Web Custom Solution",
    desc: "Deliver custom-built web solutions including dashboards, management systems, SaaS platforms, and business automation tools.",
    points: ["Custom dashboards", "Management systems", "SaaS platforms"],
  },
  {
    icon: TrendingUp,
    tone: "brand",
    title: "Digital Marketing",
    desc: "Grow your online presence through SEO, social media marketing, paid advertising, branding, and performance-driven campaigns.",
    points: ["SEO optimization", "Social media marketing", "Paid advertising"],
  },
  {
    icon: Palette,
    tone: "lime",
    title: "User Interface Design",
    desc: "Design clean, modern, user-focused interfaces that enhance usability, accessibility, and customer engagement.",
    points: ["Modern UI design", "Accessibility focused", "Customer engagement"],
  },
  {
    icon: Youtube,
    tone: "sunny",
    title: "YouTube Watch Time",
    desc: "Help creators increase YouTube watch hours through strategic promotional campaigns designed to support channel growth.",
    points: ["Strategic campaigns", "Channel growth support", "Watch time optimization"],
  },
];

const approach = [
  {
    step: "01",
    title: "Discover",
    desc: "We start with your goals, your stack, and your team's workflow — not a generic checklist.",
  },
  {
    step: "02",
    title: "Design",
    desc: "A tailored plan with clear milestones, timelines, and success metrics you can track from day one.",
  },
  {
    step: "03",
    title: "Deliver",
    desc: "Hands-on execution with your team in the loop. We ship incrementally so you see value early.",
  },
  {
    step: "04",
    title: "Grow",
    desc: "Ongoing optimization, quarterly reviews, and a partnership that scales as your business does.",
  },
];

function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Comprehensive digital solutions for{" "}
            <span className="text-gradient">modern businesses.</span>
          </>
        }
        desc="From web and mobile development to digital marketing and UI design — we deliver end-to-end services tailored to your growth."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-subtle sm:text-xl">
              Whether you're migrating from legacy tools, launching a new product line, or scaling
              to enterprise — we meet you where you are and build a path forward together.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header
            eyebrow="Offerings"
            title="Services built around how teams actually work."
            desc="Every engagement is scoped to your goals — no bloated SOWs, no shelfware."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <span
                  className={`grid size-11 place-items-center rounded-xl ${
                    s.tone === "brand"
                      ? "bg-brand/12 text-brand"
                      : s.tone === "lime"
                        ? "bg-lime/20 text-ink"
                        : "bg-sunny/25 text-ink"
                  }`}
                >
                  <s.icon className="size-5" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-ink">{s.title}</h4>
                <p className="mt-1.5 text-sm text-subtle">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-subtle">
                      <Zap className="mt-0.5 size-3.5 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header eyebrow="How we work" title="A partnership, not a project handoff." />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <motion.div
                key={a.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <div className="text-3xl font-extrabold text-gradient">{a.step}</div>
                <h4 className="mt-3 text-lg font-bold text-ink">{a.title}</h4>
                <p className="mt-1.5 text-sm text-subtle">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
              <Users2 className="size-6" />
            </span>
            <div>
              <h4 className="text-lg font-bold text-ink">
                Included on Professional & Enterprise plans
              </h4>
              <p className="mt-1 text-sm text-subtle">
                White-glove onboarding and a dedicated CSM come standard — so you're never figuring
                it out alone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <PageCTA
        title="Ready to talk about your next milestone?"
        desc="Tell us where you are and where you want to be. We'll map a path that fits your team and timeline."
        primary={{ label: "Get in touch", to: "/contact" }}
        secondary={{ label: "See how it works", to: "/about" }}
      />
    </SiteShell>
  );
}
