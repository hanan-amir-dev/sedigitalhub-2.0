import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UserCircle,
  Users2,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/user")({
  head: () => ({
    meta: [
      { title: "User — SEDigitalHub" },
      {
        name: "description",
        content:
          "Your SeDigitalHub account — manage your profile, workspace settings, billing, and team access in one place.",
      },
      { property: "og:title", content: "User — SeDigitalHub" },
      {
        property: "og:description",
        content: "Your account hub — profile, settings, and workspace controls.",
      },
    ],
  }),
  component: UserPage,
});

const accountSections = [
  {
    icon: UserCircle,
    title: "Profile",
    desc: "Update your name, avatar, timezone, and notification preferences.",
    action: "Edit profile",
  },
  {
    icon: LayoutDashboard,
    title: "Workspaces",
    desc: "Switch between workspaces, manage members, and configure roles.",
    action: "Manage workspaces",
  },
  {
    icon: CreditCard,
    title: "Billing",
    desc: "View invoices, update payment methods, and manage your subscription plan.",
    action: "View billing",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Control email alerts, in-app notifications, and digest frequency.",
    action: "Configure alerts",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "Two-factor authentication, active sessions, and API key management.",
    action: "Security settings",
  },
  {
    icon: Settings,
    title: "Preferences",
    desc: "Language, theme, keyboard shortcuts, and default workspace settings.",
    action: "Open preferences",
  },
];

function UserPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Account"
        title={
          <>
            Your hub for everything <span className="text-gradient">SeDigitalHub.</span>
          </>
        }
        desc="Manage your profile, workspaces, billing, and security — all in one calm, organized place. Sign in to access your full account."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 sm:p-10"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div
                className="size-24 shrink-0 rounded-full bg-gradient-to-br from-brand to-brand-2 shadow-glow"
                aria-hidden
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Welcome back</h2>
                <p className="mt-2 text-sm text-subtle">
                  Sign in to access your dashboard, manage your team, and configure your workspace.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-muted"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header
            eyebrow="Account areas"
            title="Everything you need, one click away."
            desc="Once signed in, these sections give you full control over your SeDigitalHub experience."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {accountSections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card p-6 card-hover"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand/12 text-brand">
                  <s.icon className="size-5" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-ink">{s.title}</h4>
                <p className="mt-1.5 text-sm text-subtle">{s.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand">
                  {s.action} →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand">
              <Users2 className="size-6" />
            </span>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-ink">Managing a team?</h4>
              <p className="mt-1 text-sm text-subtle">
                Invite members, assign roles, and control workspace access from your account
                dashboard. Enterprise teams get SSO, SAML, and audit logs built in.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-muted"
            >
              Talk to sales
            </Link>
          </motion.div>
        </div>
      </section>

      <PageCTA
        title="New to SeDigitalHub?"
        desc="Create your free account in under 30 seconds. No credit card required — your workspace is ready before you finish your coffee."
        primary={{ label: "Get started free", to: "/contact" }}
        secondary={{ label: "About SeDigitalHub", to: "/about" }}
      />
    </SiteShell>
  );
}
