import { useState, type ReactNode } from "react";

import { DashboardHeader } from "./DashboardHeader";
import { SidebarContent } from "./SidebarContent";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 bg-card p-0">
          <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-h-dvh flex-col lg:pl-64">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
