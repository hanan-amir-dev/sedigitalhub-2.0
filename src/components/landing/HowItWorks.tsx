import { motion } from "framer-motion";
import { UserPlus, Wand2, Rocket, TrendingUp } from "lucide-react";
import { Header } from "./Features";

const steps = [
  { icon: UserPlus, title: "Create your account", desc: "Sign up in seconds. No credit card needed to start." },
  { icon: Wand2, title: "Customize your workspace", desc: "Bring your brand. Set your goals. We handle the rest." },
  { icon: Rocket, title: "Launch instantly", desc: "Publish your first campaign in under 5 minutes." },
  { icon: TrendingUp, title: "Grow with insights", desc: "Track performance and iterate with real-time data." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-surface/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header
          eyebrow="How it works"
          title="From signup to launch in under 5 minutes."
          desc="A workflow designed to keep momentum on your side."
        />
        <ol className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block"
          />
          {steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6 card-hover"
            >
              <div className="flex items-center gap-4">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                  <s.icon className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full border border-border bg-white text-xs font-bold text-brand shadow-sm">
                    {i + 1}
                  </span>
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-subtle">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
