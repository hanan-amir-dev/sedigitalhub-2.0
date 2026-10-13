import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Header } from "./Features";

const items = [
  {
    quote: "SeDigitalHub replaced three tools overnight. It's the first dashboard my whole team actually opens every morning.",
    name: "Zeeshan Chaudary", role: "Head of Growth", company: "Northwind",
  },
  {
    quote: "We doubled paid conversions in a quarter. The analytics alone are worth it — it just happens to look gorgeous too.",
    name: "Saood Shah", role: "Founder", company: "Vertex",
  },
  {
    quote: "Payouts land in minutes. Support answers in minutes. It's rare to find a product this considered.",
    name: "Meerab Rashid", role: "Creator Lead", company: "Aurora",
  },
  {
    quote: "The onboarding was ridiculous. We were live before lunch. Every product should be this thoughtful.",
    name: "M. Hassan", role: "COO", company: "Helix",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const active = items[i];

  return (
    <section
      id="testimonials"
      className="relative bg-surface/60 py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header eyebrow="Testimonials" title="Loved by teams that ship." />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl border border-border bg-card p-10 shadow-card"
            >
              <Quote className="absolute -top-4 left-8 size-9 rounded-xl bg-brand-gradient p-2 text-white shadow-glow" />
              <div className="flex gap-1 text-sunny">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-xl leading-relaxed text-ink sm:text-2xl">
                “{active.quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="size-12 rounded-full bg-brand-gradient" aria-hidden />
                <div>
                  <div className="font-bold text-ink">{active.name}</div>
                  <div className="text-sm text-subtle">
                    {active.role} · {active.company}
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                className={`h-2 rounded-full transition-all ${
                  k === i ? "w-8 bg-brand" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
