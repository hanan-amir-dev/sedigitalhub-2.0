import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { navLinks } from "./nav-links";

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 transition-colors ${
        scrolled
          ? "border-b border-border/60 bg-gradient-to-r from-purple-50 to-green-50/80 backdrop-blur-xl shadow-[0_1px_20px_-8px_rgb(16_24_40/0.08)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
            <Sparkles className="size-4" />
          </span>
          <span>SEDigitalHub</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="group relative rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition hover:text-foreground data-[status=active]:text-brand"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden px-4 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground md:block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-100 md:inline-flex"
          >
            Get Started
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-border bg-background/60 backdrop-blur md:hidden"
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
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-muted data-[status=active]:bg-brand/10 data-[status=active]:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-brand-gradient px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
