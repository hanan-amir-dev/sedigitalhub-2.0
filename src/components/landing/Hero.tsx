import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, Users, TrendingUp, DollarSign } from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";

const stats = [
  { icon: Users, label: "5,000+", sub: "Active users", pos: "top-6 -left-4 sm:-left-10" },
  { icon: TrendingUp, label: "98%", sub: "Satisfaction", pos: "bottom-24 -right-2 sm:-right-6" },
  { icon: DollarSign, label: "$2M+", sub: "Earned by creators", pos: "bottom-6 left-4 sm:left-10" },
];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-mesh" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-24 size-[420px] rounded-full bg-brand/25 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-32 size-[520px] rounded-full bg-brand-2/20 blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 size-[360px] rounded-full bg-lime/25 blur-3xl animate-blob [animation-delay:-12s]" />
        <GridBackdrop />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.a
            href="#features"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur"
          >
            <span className="inline-block size-1.5 rounded-full bg-lime shadow-[0_0_10px] shadow-lime" />
            New — v3.0 launch · Meet the smarter dashboard
            <ArrowRight className="size-3.5" />
          </motion.a>

          <h1 className="mt-6 text-[42px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[54px] lg:text-[64px]">
            Unlock your{" "}
            <span className="text-gradient">earning potential</span>{" "}
            with a premium digital platform.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-subtle sm:text-[19px]">
            SEDigitalHub gives creators, teams, and businesses everything they need to grow revenue —
            elegant dashboards, instant payouts, and analytics that actually make sense.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-100"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3.5 text-base font-semibold text-foreground backdrop-blur transition hover:bg-white"
            >
              <PlayCircle className="size-5 text-brand" />
              Watch Demo
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-2">
              {["6C63FF", "7B5CFA", "B8FF1A", "FFD84D"].map((c, i) => (
                <div
                  key={i}
                  className="size-9 rounded-full border-2 border-white shadow-sm"
                  style={{ background: `linear-gradient(135deg,#${c},#111827)` }}
                />
              ))}
            </div>
            <div className="text-sm text-subtle">
              <div className="font-semibold text-ink">Trusted by 5,000+ teams</div>
              <div>★★★★★ 4.9 average rating</div>
            </div>
          </div>
        </motion.div>

        {/* Hero image + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="relative aspect-square">
            <img
              src={heroImg}
              alt="SeDigitalHub dashboard preview with floating cards"
              width={1200}
              height={1200}
              className={`size-full object-contain drop-shadow-[0_30px_60px_rgba(108,99,255,0.25)] ${
                reduce ? "" : "animate-float"
              }`}
            />

            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                className={`absolute ${s.pos} flex items-center gap-3 rounded-2xl border border-border/70 bg-white/85 px-4 py-3 shadow-card backdrop-blur ${
                  reduce ? "" : i % 2 === 0 ? "animate-float" : "animate-float-slow"
                }`}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <span
                  className={`grid size-9 place-items-center rounded-xl ${
                    i === 0
                      ? "bg-brand/12 text-brand"
                      : i === 1
                      ? "bg-lime/25 text-ink"
                      : "bg-sunny/30 text-ink"
                  }`}
                >
                  <s.icon className="size-4.5" />
                </span>
                <div className="leading-tight">
                  <div className="text-base font-bold text-ink">{s.label}</div>
                  <div className="text-xs text-subtle">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GridBackdrop() {
  return (
    <svg
      className="absolute inset-0 size-full opacity-[0.35]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="m">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" mask="url(#m)" />
    </svg>
  );
}
