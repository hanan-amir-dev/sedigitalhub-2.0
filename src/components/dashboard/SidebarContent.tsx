import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Sparkles } from "lucide-react";
import { useState } from "react";

import { dashboardNav } from "./dashboard-nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

/**
 * Inner sidebar body shared by the desktop aside and the mobile Sheet drawer.
 * `onNavigate` lets the mobile drawer close itself when a link is tapped.
 */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      onNavigate?.();
      navigate({ to: "/" });
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-2 px-5 py-6 text-lg font-bold tracking-tight text-ink"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
          <Sparkles className="size-4" />
        </span>
        <span>SEDigitalHub</span>
      </Link>

      <nav aria-label="Dashboard" className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {dashboardNav.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-subtle/70">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    activeOptions={{ exact: item.exact }}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/75 transition",
                      "hover:bg-surface hover:text-ink",
                      "data-[status=active]:bg-brand/12 data-[status=active]:text-brand data-[status=active]:font-semibold",
                    )}
                  >
                    <item.icon className="size-4.5 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-subtle/70">
            Session
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/75 transition hover:bg-surface hover:text-ink disabled:opacity-60"
          >
            <LogOut className="size-4.5 shrink-0" />
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </nav>
    </div>
  );
}
