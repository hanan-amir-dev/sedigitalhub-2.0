import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Features";
import { plans } from "@/data/plans";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header
          eyebrow="Pricing"
          title="Simple, transparent pricing."
          desc="Pick a plan, deposit once, and start earning. Upgrade anytime."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative rounded-3xl border p-8 card-hover ${
                p.highlight
                  ? "border-transparent bg-ink text-white shadow-glow lg:-my-4 lg:scale-[1.03]"
                  : "border-border bg-card"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">
                  <Sparkles className="size-3" /> Most popular
                </span>
              )}
              <h3 className={`text-xl font-bold ${p.highlight ? "text-white" : "text-ink"}`}>
                {p.name}
              </h3>
              <p
                className={`mt-1.5 text-xs font-semibold uppercase tracking-wider ${p.highlight ? "text-white/60" : "text-subtle"}`}
              >
                Deposit Amount
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className={`text-5xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-ink"}`}
                >
                  ${p.price}
                </span>
                <span className={`text-sm ${p.highlight ? "text-white/60" : "text-subtle"}`}>
                  / {p.days} Days
                </span>
              </div>
              <Link
                to="/signup"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-lime text-ink hover:opacity-95"
                    : "bg-brand-gradient text-white hover:opacity-95"
                }`}
              >
                Get Started
              </Link>
              <ul
                className={`mt-6 space-y-3 text-sm ${p.highlight ? "text-white/85" : "text-foreground/85"}`}
              >
                {p.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-2.5 ${
                      f.included ? "" : p.highlight ? "text-white/40" : "text-subtle/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                        f.included
                          ? p.highlight
                            ? "bg-lime text-ink"
                            : "bg-brand/12 text-brand"
                          : p.highlight
                            ? "bg-white/10 text-white/40"
                            : "bg-surface text-subtle/50"
                      }`}
                    >
                      {f.included ? (
                        <Check className="size-3" strokeWidth={3} />
                      ) : (
                        <X className="size-3" strokeWidth={3} />
                      )}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
