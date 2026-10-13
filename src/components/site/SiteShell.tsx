import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <Navbar />
      <motion.main
        id="main"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
