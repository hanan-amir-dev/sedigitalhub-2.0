import { useMemo, useState } from "react";
import {
  AlertCircle,
  Banknote,
  Loader2,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

import { ClientSettingsModal } from "./ClientSettingsModal";
import { WithdrawalsTable } from "./WithdrawalsTable";
import { VideosTable } from "./VideosTable";
import { AdminStats } from "./AdminStats";
import { useIdleLogout } from "@/hooks/useIdleLogout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClients, useUpdateClient } from "@/hooks/useClients";
import { getPlan, planOptions } from "@/data/plans";
import type { ClientProfile } from "@/lib/supabase";

function initials(name?: string | null): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: clients, isLoading, error } = useClients();
  const updateClient = useUpdateClient();

  const [tab, setTab] = useState<"clients" | "withdrawals" | "videos">("clients");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ClientProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Auto sign the admin out after 30 minutes of inactivity.
  useIdleLogout(onLogout, 30);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return clients ?? [];
    return (clients ?? []).filter((c) =>
      [c.full_name, c.email, c.phone, c.country]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [clients, search]);

  const openSettings = (client: ClientProfile) => {
    setSelected(client);
    setModalOpen(true);
  };

  const handlePlanChange = (client: ClientProfile, plan: string) =>
    updateClient.mutate({ id: client.id, values: { plan } });

  const handleToggle = (client: ClientProfile, is_active: boolean) =>
    updateClient.mutate({ id: client.id, values: { is_active } });

  return (
    <div className="min-h-dvh bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <h1 className="text-base font-bold tracking-tight text-ink">Admin</h1>
              <p className="text-xs text-subtle">Client management</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2 rounded-full border-border">
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
          {(
            [
              { key: "clients", label: "Clients", icon: Users },
              { key: "withdrawals", label: "Withdrawals", icon: Banknote },
              { key: "videos", label: "Videos", icon: Video },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "text-subtle hover:text-ink"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "withdrawals" ? <WithdrawalsTable /> : null}

        {tab === "videos" ? <VideosTable /> : null}

        {tab === "clients" ? (
          <>
            {!isLoading && !error ? (
              <div className="mb-6">
                <AdminStats clients={clients ?? []} />
              </div>
            ) : null}

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-ink">Clients</h2>
                <p className="mt-0.5 text-sm text-subtle">
                  {isLoading
                    ? "Loading…"
                    : `${filtered.length} client${filtered.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone…"
                  className="pl-9"
                />
              </div>
            </div>

            {/* Table */}
            <div className="isolate mt-5 overflow-hidden rounded-none border border-border bg-card shadow-card">
              {error ? (
                <div className="flex items-center gap-3 px-6 py-10 text-sm text-destructive">
                  <AlertCircle className="size-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Couldn't load clients.</p>
                    <p className="text-destructive/80">
                      Make sure the `profiles` table is readable (check Row Level Security).{" "}
                      {error.message}
                    </p>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="size-7 animate-spin text-brand" aria-label="Loading" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="px-6 py-16 text-center text-sm text-subtle">No clients found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border bg-surface/60 hover:bg-surface/60">
                      <TableHead className="text-xs font-semibold uppercase tracking-wider text-subtle">
                        Client
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider text-subtle">
                        Contact
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider text-subtle">
                        Plan
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-subtle">
                        Balance
                      </TableHead>
                      <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-subtle">
                        Status
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-subtle">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((client) => {
                      const active = Boolean(client.is_active);
                      return (
                        <TableRow
                          key={client.id}
                          className="border-border transition-colors hover:bg-surface/50"
                        >
                          {/* Client */}
                          <TableCell className="py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="size-9 border border-border">
                                <AvatarFallback className="bg-brand-gradient text-xs font-semibold text-white">
                                  {initials(client.full_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-ink">
                                  {client.full_name || "—"}
                                </div>
                                <div className="truncate text-xs text-subtle">
                                  {client.country || "—"}
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          {/* Contact */}
                          <TableCell>
                            <div className="truncate text-sm text-ink">{client.email || "—"}</div>
                            <div className="truncate text-xs text-subtle">
                              {client.phone || "—"}
                            </div>
                          </TableCell>

                          {/* Plan */}
                          <TableCell>
                            <Select
                              value={getPlan(client.plan).slug}
                              onValueChange={(v) => handlePlanChange(client, v)}
                            >
                              <SelectTrigger className="h-9 w-36 rounded-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {planOptions.map((o) => (
                                  <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>

                          {/* Balance */}
                          <TableCell className="text-right">
                            <span className="font-semibold tabular-nums text-ink">
                              ${Number(client.balance ?? 0).toFixed(2)}
                            </span>
                          </TableCell>

                          {/* Status: toggle + label */}
                          <TableCell>
                            <div className="flex flex-col items-center gap-1.5">
                              <Switch
                                checked={active}
                                onCheckedChange={(v) => handleToggle(client, v)}
                                aria-label="Toggle active plan"
                              />
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                  active ? "bg-brand/12 text-brand" : "bg-surface text-subtle"
                                }`}
                              >
                                {active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openSettings(client)}
                              className="gap-1.5 rounded-full text-subtle hover:text-ink"
                            >
                              <Settings className="size-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </>
        ) : null}
      </main>

      <ClientSettingsModal client={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
