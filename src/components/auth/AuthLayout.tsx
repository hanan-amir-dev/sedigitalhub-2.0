import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Benefit = { icon: typeof Sparkles; label: string };

const defaultBenefits: Benefit[] = [
];

export function AuthLayout({
  headline,
  subheading,
  benefits = defaultBenefits,
  children,
}: {
  headline: ReactNode;
  subheading: ReactNode;
  benefits?: Benefit[];
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-background lg:flex-row">
      {/* Left: brand story panel */}
      <div className="relative hidden overflow-hidden bg-ink lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute -top-24 -left-24 size-72 animate-blob bg-brand-gradient opacity-30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 size-80 animate-float-slow rounded-full bg-brand-2/30 blur-3xl"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute top-24 right-16 size-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ animation: "float-slow 8s ease-in-out infinite" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute bottom-40 left-20 size-10 rounded-full border border-white/10 bg-lime/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ animation: "float-slower 10s ease-in-out infinite" }}
          aria-hidden
        />

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-white"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <Sparkles className="size-4" />
            </span>
            SeDigitalHub
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 text-base text-white/70"
          >
            {subheading}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 space-y-3"
          >
            {benefits.map((b, i) => (
              <motion.li
                key={b.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  <b.icon className="size-4 text-lime" />
                </span>
                {b.label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} SeDigitalHub. All rights reserved.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 bg-mesh opacity-25 lg:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-20 right-0 size-64 animate-blob bg-brand-gradient/20 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-md">
          <Link
            to="/"
            className="mb-8 flex items-center gap-2 font-bold text-lg tracking-tight text-ink lg:hidden"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <Sparkles className="size-4" />
            </span>
            SeDigitalHub
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
