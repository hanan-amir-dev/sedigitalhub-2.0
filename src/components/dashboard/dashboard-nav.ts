import {
  Banknote,
  CreditCard,
  LayoutGrid,
  User,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Match this route exactly for the active state (used for the index route). */
  exact?: boolean;
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNav: DashboardNavGroup[] = [
  {
    title: "General",
    items: [
      { label: "Overview", to: "/dashboard", icon: LayoutGrid, exact: true },
      { label: "Plans", to: "/dashboard/plans", icon: CreditCard },
      { label: "Video Work", to: "/dashboard/video-work", icon: Video },
      { label: "My Earnings", to: "/dashboard/earnings", icon: Wallet },
      { label: "Withdraw", to: "/dashboard/withdraw", icon: Banknote },
    ],
  },
  {
    title: "Account",
    items: [{ label: "My Profile", to: "/dashboard/profile", icon: User }],
  },
];

/** Resolve the page title for the header from the current pathname. */
export function titleForPath(pathname: string): string {
  const flat = dashboardNav.flatMap((g) => g.items);
  // Longest matching route wins so /dashboard/plans beats /dashboard.
  const match = flat
    .filter((item) => (item.exact ? pathname === item.to : pathname.startsWith(item.to)))
    .sort((a, b) => b.to.length - a.to.length)[0];
  return match?.label ?? "Dashboard";
}
