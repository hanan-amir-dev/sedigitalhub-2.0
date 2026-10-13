import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthCard({
  title,
  description,
  footer,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn("glass rounded-3xl border border-border/60 p-6 shadow-glow sm:p-8", className)}
    >
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
        {description ? <p className="mt-2 text-sm text-subtle">{description}</p> : null}
      </div>

      {children}

      {footer ? (
        <div className="mt-6 text-center text-sm text-subtle sm:text-left">{footer}</div>
      ) : null}
    </motion.div>
  );
}
