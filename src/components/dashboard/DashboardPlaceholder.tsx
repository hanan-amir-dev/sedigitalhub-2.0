import { motion } from "framer-motion";
import { Headphones, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ADMIN_EMAIL = "support@sedigitalhub.com";

/**
 * Empty-state scaffold for dashboard sub-pages that will consume API data
 * later. Keeps the sections visually consistent with the rest of the dashboard.
 */
export function DashboardPlaceholder({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-card"
    >
      <span className="grid size-16 place-items-center rounded-2xl bg-brand/12 text-brand">
        <Icon className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-bold tracking-tight text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-subtle">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-subtle">
        Coming soon
      </span>
      <Button asChild variant="outline" className="mt-6 rounded-full border-border">
        <a href={`mailto:${ADMIN_EMAIL}`}>
          <Headphones className="size-4" /> Contact Admin
        </a>
      </Button>
    </motion.div>
  );
}
