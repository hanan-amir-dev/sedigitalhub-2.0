import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-90" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 size-[420px] rounded-full bg-brand/25 blur-3xl animate-blob" />
        <div className="absolute -top-10 right-0 size-[420px] rounded-full bg-brand-2/20 blur-3xl animate-blob [animation-delay:-8s]" />
        <div className="absolute bottom-0 left-1/2 size-[360px] -translate-x-1/2 rounded-full bg-lime/20 blur-3xl animate-blob [animation-delay:-14s]" />
      </div>
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-brand" /> {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
        >
          {title}
        </motion.h1>
        {desc && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-subtle sm:text-xl"
          >
            {desc}
          </motion.p>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
