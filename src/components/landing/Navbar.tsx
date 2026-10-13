import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl shadow-[0_1px_20px_-8px_rgb(16_24_40/0.08)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
            <Sparkles className="size-4" />
          </span>
          <span>SeDigitalHub</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition hover:text-foreground"
              >
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-gradient transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#login"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
          >
            Login
          </a>
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-100"
          >
            Get Started
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl border border-border bg-background/60 backdrop-blur lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "m"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href="#login"
                  className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="#cta"
                  className="rounded-full bg-brand-gradient px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
