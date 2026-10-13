import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Globe, Loader2, Mail, MapPin, Phone, User as UserIcon } from "lucide-react";

import { useProfile } from "@/hooks/useProfile";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [{ title: "My Profile — SeDigitalHub" }],
  }),
  component: ProfilePage,
});

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ProfilePage() {
  const { profile, displayName, email, isLoading } = useProfile();

  const fields = [
    { icon: UserIcon, label: "Full name", value: profile?.full_name },
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: profile?.phone },
    { icon: Globe, label: "Country", value: profile?.country },
    { icon: MapPin, label: "Address", value: profile?.address },
    { icon: Fingerprint, label: "CNIC / ID", value: profile?.cnic },
    { icon: Fingerprint, label: "Referral code", value: profile?.referral_code || "—" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-6"
    >
      {/* Profile header card */}
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-xl font-bold text-white shadow-glow">
          {initials(displayName)}
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold tracking-tight text-ink">{displayName}</h2>
          <p className="truncate text-sm text-subtle">{email || "—"}</p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">
          Personal details
        </h3>

        {isLoading ? (
          <div className="flex items-center justify-center py-10 text-subtle">
            <Loader2 className="size-6 animate-spin text-brand" aria-label="Loading" />
          </div>
        ) : (
          <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand">
                  <f.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-medium uppercase tracking-wide text-subtle">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 break-words font-semibold text-ink">{f.value || "—"}</dd>
                </div>
              </div>
            ))}
          </dl>
        )}
      </div>
    </motion.div>
  );
}
