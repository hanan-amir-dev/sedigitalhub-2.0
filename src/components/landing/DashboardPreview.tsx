import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign, Users, TrendingUp, Bell } from "lucide-react";
import { Header } from "./Features";

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header
          eyebrow="Dashboard"
          title="A workspace that makes complex feel simple."
          desc="Every pixel considered. Every interaction refined. Meet the dashboard your team has been asking for."
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          {/* Browser window */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-[0_40px_100px_-30px_rgba(108,99,255,0.35)]">
            <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto rounded-md border border-border bg-white px-3 py-1 text-xs text-subtle">
                app.sedigitalhub.com / overview
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 p-4 sm:p-6">
              {/* Sidebar */}
              <aside className="col-span-12 rounded-2xl bg-brand-gradient p-4 text-white/90 sm:col-span-3">
                <div className="font-bold">SeDigitalHub</div>
                <ul className="mt-5 space-y-1 text-sm">
                  {["Overview", "Payments", "Customers", "Products", "Analytics", "Settings"].map((x, i) => (
                    <li
                      key={x}
                      className={`rounded-lg px-3 py-2 ${i === 0 ? "bg-white/15 text-white" : "text-white/80"}`}
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main */}
              <div className="col-span-12 space-y-4 sm:col-span-9">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <MiniStat icon={DollarSign} label="Revenue" value="$128,430" delta="+12.5%" tone="brand" />
                  <MiniStat icon={Users} label="Customers" value="1,450" delta="+8.2%" tone="lime" />
                  <MiniStat icon={TrendingUp} label="Success rate" value="98.6%" delta="+0.4%" tone="sunny" />
                </div>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-subtle">Total revenue</div>
                      <div className="text-2xl font-bold text-ink">$342,430</div>
                    </div>
                    <span className="rounded-full bg-lime/25 px-2.5 py-1 text-xs font-semibold text-ink">
                      ↑ 15.4%
                    </span>
                  </div>
                  <Chart />
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -left-4 top-24 hidden w-64 rounded-2xl border border-border bg-white p-4 shadow-card animate-float md:block"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-subtle">
              <Bell className="size-4 text-brand" /> New payout
            </div>
            <div className="mt-1 text-lg font-bold text-ink">+$4,220.00</div>
            <div className="text-xs text-subtle">Arrived in your account · Just now</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute -right-4 bottom-16 hidden w-64 rounded-2xl border border-border bg-white p-4 shadow-card animate-float-slow md:block"
          >
            <div className="text-xs font-semibold text-subtle">New signup</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="size-8 rounded-full bg-brand-gradient" />
              <div>
                <div className="text-sm font-semibold text-ink">Olivia Rhye</div>
                <div className="text-xs text-subtle">Upgraded to Pro</div>
              </div>
              <ArrowUpRight className="ml-auto size-4 text-brand" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniStat({
  icon: Icon, label, value, delta, tone,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; delta: string; tone: "brand" | "lime" | "sunny" }) {
  const bg = tone === "brand" ? "bg-brand/12 text-brand" : tone === "lime" ? "bg-lime/25 text-ink" : "bg-sunny/30 text-ink";
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <span className={`grid size-9 place-items-center rounded-lg ${bg}`}>
          <Icon className="size-4.5" />
        </span>
        <span className="rounded-full bg-lime/25 px-2 py-0.5 text-[11px] font-semibold text-ink">
          {delta}
        </span>
      </div>
      <div className="mt-3 text-xs text-subtle">{label}</div>
      <div className="text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 600 160" className="mt-4 h-40 w-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,120 C60,90 100,110 160,80 C220,50 260,100 320,70 C380,40 420,90 480,50 C540,20 580,55 600,40 L600,160 L0,160 Z"
        fill="url(#g1)"
      />
      <path
        d="M0,120 C60,90 100,110 160,80 C220,50 260,100 320,70 C380,40 420,90 480,50 C540,20 580,55 600,40"
        fill="none"
        stroke="#6C63FF"
        strokeWidth="2.5"
      />
    </svg>
  );
}
