import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PageCTA({
  title = "Ready to accelerate your growth?",
  desc = "Join 5,000+ teams building smarter with SeDigitalHub. Free for 14 days — no card required.",
  primary = { label: "Get Started Free", to: "/contact" as const },
  secondary,
}: {
  title?: string;
  desc?: string;
  primary?: { label: string; to: "/" | "/features" | "/pricing" | "/contact" | "/about" };
  secondary?: { label: string; to: "/" | "/features" | "/pricing" | "/contact" | "/about" };
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-ink p-10 text-white shadow-[0_40px_100px_-30px_rgba(108,99,255,0.5)] sm:p-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-24 size-72 rounded-full bg-brand/40 blur-3xl animate-blob" />
          <div className="absolute -right-16 -bottom-24 size-80 rounded-full bg-brand-2/40 blur-3xl animate-blob [animation-delay:-8s]" />
          <div className="absolute right-10 top-10 size-24 rounded-2xl bg-lime/70 blur-2xl animate-float" />
          <div className="absolute left-10 bottom-10 size-20 rounded-full bg-sunny/60 blur-2xl animate-float-slow" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
            <Sparkles className="size-3.5 text-lime" /> Ready when you are
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-[32px] font-extrabold leading-tight tracking-tight sm:text-[48px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{desc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={primary.to}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-ink transition-transform duration-200 hover:scale-[1.03]"
            >
              {primary.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white/90 transition hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
