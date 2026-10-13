import { createFileRoute } from "@tanstack/react-router";
import { Loader2, ShieldAlert } from "lucide-react";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — SeDigitalHub" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const { isAdmin, isLoading: profileLoading } = useProfile();

  // Not signed in → show the admin login form.
  if (!loading && !user) {
    return <AdminLogin />;
  }

  // Signed in, still resolving session/role.
  if (loading || profileLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface">
        <Loader2 className="size-8 animate-spin text-brand" aria-label="Loading" />
      </div>
    );
  }

  // Signed in but not an admin → access denied.
  if (!isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <ShieldAlert className="size-6" />
          </span>
          <h1 className="mt-6 text-xl font-bold tracking-tight text-ink">Access denied</h1>
          <p className="mt-2 text-sm text-subtle">
            This account doesn't have admin access. Sign in with an admin account.
          </p>
          <div className="mt-6">
            <Button
              onClick={async () => {
                await signOut();
              }}
              className="w-full rounded-full bg-brand-gradient text-white hover:opacity-95"
            >
              Sign in as a different user
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={async () => void (await signOut())} />;
}
