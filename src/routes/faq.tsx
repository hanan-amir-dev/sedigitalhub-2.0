import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Plus, Search, MessageSquare } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SEDigitalHub" },
      { name: "description", content: "Answers to the most common questions about SeDigitalHub — billing, security, plans, integrations, and support." },
      { property: "og:title", content: "FAQ — SeDigitalHub" },
      { property: "og:description", content: "Frequently asked questions about SeDigitalHub." },
    ],
  }),
  component: FAQPage,
});

type Item = { q: string; a: string; cat: string };

const faqs: Item[] = [
  { cat: "Getting started", q: "How does the 14-day free trial work?", a: "You get full access to the Professional plan for 14 days — no credit card required. Downgrade or cancel anytime; nothing charges automatically." },
  { cat: "Getting started", q: "Can I migrate data from another tool?", a: "Yes. We offer one-click imports for the most common platforms, plus a white-glove migration on Professional and Enterprise plans." },
  { cat: "Billing", q: "Can I switch plans later?", a: "Absolutely. Upgrades and downgrades are prorated automatically and take effect at the start of the next billing cycle." },
  { cat: "Billing", q: "Do you offer discounts for non-profits?", a: "Yes — 40% off for verified non-profits, students, and open-source teams. Contact our team to apply." },
  { cat: "Billing", q: "What payment methods are supported?", a: "Credit card, ACH, SEPA, and wire transfer for annual Enterprise plans." },
  { cat: "Security", q: "Is SeDigitalHub secure?", a: "We're SOC 2 Type II compliant, encrypt all data in transit and at rest, and never share your data with third parties." },
  { cat: "Security", q: "Where is my data stored?", a: "Data is stored in region-pinned facilities (US, EU, or APAC). Enterprise customers can pick their region and enable customer-managed keys." },
  { cat: "Product", q: "Can I export my data?", a: "Yes — you own your data. Export as CSV or JSON at any time from the dashboard, or connect our API." },
  { cat: "Product", q: "Do you have a mobile app?", a: "The web app is fully responsive and installable as a PWA. Native iOS and Android apps ship this quarter." },
  { cat: "Support", q: "What kind of support is included?", a: "Community support on Starter, priority chat on Professional, and a dedicated CSM plus 24/7 phone support on Enterprise." },
  { cat: "Support", q: "How fast do you respond?", a: "Median first-response time is under 4 minutes on Professional and Enterprise plans." },
];

const cats = ["All", "Getting started", "Billing", "Security", "Product", "Support"];

function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return faqs.filter((f) => {
      const catOk = cat === "All" || f.cat === cat;
      const qOk = !query || f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query);
      return catOk && qOk;
    });
  }, [q, cat]);

  return (
    <SiteShell>
      <PageHero
        eyebrow="FAQ"
        title={<>Answers, not <span className="text-gradient">runarounds.</span></>}
        desc="Everything you need to know about SeDigitalHub. Can't find what you're looking for? Our team replies in minutes."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              className="w-full rounded-full border border-input bg-card py-4 pl-11 pr-5 text-sm shadow-card outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </div>

          {/* Categories */}
          <div className="mt-5 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  cat === c ? "border-transparent bg-brand-gradient text-white shadow-glow" : "border-border bg-card text-subtle hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card">
            {filtered.length === 0 && (
              <div className="p-10 text-center text-sm text-subtle">
                No questions match your search. Try a different keyword or reach out — we're happy to help.
              </div>
            )}
            {filtered.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-brand">{f.cat}</span>
                      <span className="mt-1 block text-base font-semibold text-ink sm:text-lg">{f.q}</span>
                    </span>
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
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-subtle">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Support banner */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-gradient-to-br from-brand/10 to-brand-2/10 p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <MessageSquare className="size-5" />
              </span>
              <div>
                <div className="text-base font-bold text-ink">Still have questions?</div>
                <div className="text-sm text-subtle">Our team typically replies in under 4 minutes.</div>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to try SeDigitalHub?"
        secondary={{ label: "See features", to: "/features" }}
      />
    </SiteShell>
  );
}
