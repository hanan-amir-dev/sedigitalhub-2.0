import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "./Features";

const faqs = [
  { q: "How does the 14-day free trial work?", a: "You get full access to the Professional plan for 14 days — no credit card required. Downgrade or cancel anytime." },
  { q: "Can I switch plans later?", a: "Yes. Upgrades and downgrades are prorated automatically, and take effect at the start of the next billing cycle." },
  { q: "Is SeDigitalHub secure?", a: "Absolutely. We're SOC 2 Type II compliant, encrypt all data in transit and at rest, and never share your data with third parties." },
  { q: "Do you offer discounts for non-profits?", a: "We do — 40% off for verified non-profits and student teams. Contact our team to apply." },
  { q: "What payment methods are supported?", a: "Credit card, ACH, SEPA, and wire transfer for annual Enterprise plans." },
  { q: "Can I export my data?", a: "Yes, you own your data. Export as CSV or JSON anytime from your dashboard." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Header eyebrow="FAQ" title="Frequently asked questions." />
        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-semibold text-ink sm:text-lg"
                >
                  <span>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-subtle">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
