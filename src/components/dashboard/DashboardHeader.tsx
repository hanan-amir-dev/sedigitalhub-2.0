import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, User } from "lucide-react";

import { titleForPath } from "./dashboard-nav";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const { displayName, email } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-lg text-ink transition hover:bg-surface lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold tracking-tight text-ink sm:text-lg">
            {titleForPath(pathname)}
          </h1>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 rounded-full py-1 pl-1 pr-1 outline-none transition hover:bg-surface focus-visible:ring-1 focus-visible:ring-ring sm:pr-3">
          <Avatar className="size-9 border border-border">
            <AvatarFallback className="bg-brand-gradient text-sm font-semibold text-white">
              {initials(displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[12rem] truncate text-sm font-semibold text-ink sm:block">
            {displayName}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="truncate text-sm font-semibold text-ink">{displayName}</span>
            {email ? (
              <span className="truncate text-xs font-normal text-subtle">{email}</span>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => navigate({ to: "/dashboard/profile" })}>
            <User className="size-4" />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleSignOut}>
            <LogOut className="size-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
