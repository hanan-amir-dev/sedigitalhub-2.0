import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Header } from "./Features";

const stats = [
  { value: 5000, suffix: "+", label: "Happy customers" },
  { value: 98, suffix: "%", label: "Satisfaction rate" },
  { value: 2, prefix: "$", suffix: "M+", label: "Paid out" },
  { value: 40, suffix: "+", label: "Countries served" },
];

export function About() {
  return (
    <section id="about" className="relative bg-surface/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Header
              eyebrow="About us"
              center={false}
              title="Building the platform we always wished we had."
              desc="SeDigitalHub started as a side project in 2022 and quickly became a home for creators, teams, and companies that care about craft. Today, we're a distributed team of 42 obsessed with helping you grow."
            />
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <Counter key={s.label} {...s} />
              ))}
            </div>
          </div>

          <div className="relative">
            <ol className="relative space-y-6 border-l-2 border-dashed border-brand/30 pl-6">
              {[
                { year: "2022", title: "Founded in Berlin", desc: "Two founders. One dashboard prototype. Big ambitions." },
                { year: "2023", title: "1,000 teams onboarded", desc: "Product-market fit — and our first payout milestone." },
                { year: "2024", title: "Series A, $12M", desc: "Backed by founders and investors from Stripe, Linear, and Figma." },
                { year: "2026", title: "Launching SeDigitalHub v3.0", desc: "The smartest dashboard we've ever shipped. You're looking at it." },
              ].map((m, i) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative rounded-2xl border border-border bg-card p-5 card-hover"
                >
                  <span className="absolute -left-[34px] top-6 size-4 rounded-full border-4 border-surface bg-brand" />
                  <div className="text-xs font-bold uppercase tracking-widest text-brand">{m.year}</div>
                  <div className="mt-1 text-lg font-bold text-ink">{m.title}</div>
                  <div className="mt-1 text-sm text-subtle">{m.desc}</div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-5">
      <div className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {prefix}
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-subtle">{label}</div>
    </div>
  );
}
