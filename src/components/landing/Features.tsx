import { motion } from "framer-motion";
import {
  ShieldCheck, Zap, LayoutDashboard, Play, Users2, LineChart, ArrowRight,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Bank-grade encryption, SOC 2 controls, and privacy-first architecture by default.",
    accent: "brand",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    desc: "Move money in minutes, not days. Instant transfers to 40+ countries.",
    accent: "lime",
  },
  {
    icon: LayoutDashboard,
    title: "Premium Dashboard",
    desc: "A dashboard your team will actually love — clear, fast, and thoughtful.",
    accent: "sunny",
  },
  {
    icon: Play,
    title: "Video Rewards",
    desc: "Monetize your content library with built-in rewards, tips, and unlocks.",
    accent: "brand",
  },
  {
    icon: Users2,
    title: "Referral Program",
    desc: "Grow with your community. Powerful referral tracking and shareable links.",
    accent: "lime",
  },
  {
    icon: LineChart,
    title: "Analytics",
    desc: "Real-time insights that turn signal into action. No spreadsheets required.",
    accent: "sunny",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header
          eyebrow="Features"
          title="Everything you need to grow — nothing you don't."
          desc="Purpose-built for modern teams. Powerful under the hood, minimal on the surface."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 card-hover"
            >
              <div
                aria-hidden
                className={`absolute -right-16 -top-16 size-40 rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${
                  it.accent === "brand" ? "bg-brand/25" : it.accent === "lime" ? "bg-lime/40" : "bg-sunny/40"
                }`}
              />
              <div
                className={`relative grid size-12 place-items-center rounded-xl ${
                  it.accent === "brand"
                    ? "bg-brand/12 text-brand"
                    : it.accent === "lime"
                    ? "bg-lime/25 text-ink"
                    : "bg-sunny/30 text-ink"
                }`}
              >
                <it.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{it.desc}</p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-2.5"
              >
                Learn more <ArrowRight className="size-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Header({
  eyebrow, title, desc, center = true,
}: { eyebrow: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur`}>
        <span className="size-1.5 rounded-full bg-brand" /> {eyebrow}
      </div>
      <h2 className="mt-4 text-[32px] font-extrabold leading-tight tracking-tight text-ink sm:text-[42px]">
        {title}
      </h2>
      {desc && <p className="mt-4 text-lg text-subtle">{desc}</p>}
    </div>
  );
}
