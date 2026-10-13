import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";

/**
 * Admin sign-in. Uses the same Supabase auth as clients; the `/admin` route
 * then checks the signed-in user's `profiles.role` to grant access. Set a user
 * as admin in Supabase with:  update profiles set role='admin' where email=...
 */
export function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      // On success the /admin route re-renders and checks the role.
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-glow sm:p-10"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <ShieldCheck className="size-6" />
        </span>
        <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-ink">
          Admin access
        </h1>
        <p className="mt-2 text-center text-sm text-subtle">
          Sign in with your admin account to manage clients.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
            >
              {error}
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <PasswordInput
              id="admin-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full gap-2 rounded-full bg-brand-gradient py-2.5 text-white shadow-glow transition hover:scale-[1.01] disabled:opacity-70"
          >
            <Lock className="size-4" />
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
