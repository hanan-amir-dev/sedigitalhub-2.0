import { AlertCircle, Loader2 } from "lucide-react";

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
import { useWithdrawals, useUpdateWithdrawalStatus } from "@/hooks/useWithdrawals";

const STATUSES = ["pending", "paid", "rejected"];

const statusStyles: Record<string, string> = {
  pending: "bg-lime/50 text-ink",
  paid: "bg-brand/12 text-brand",
  rejected: "bg-destructive/10 text-destructive",
};

export function WithdrawalsTable() {
  const { data: withdrawals, isLoading, error } = useWithdrawals();
  const updateStatus = useUpdateWithdrawalStatus();

  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border border-border bg-card px-6 py-10 text-sm text-destructive shadow-card">
        <AlertCircle className="size-5 shrink-0" />
        <div>
          <p className="font-semibold">Couldn't load withdrawals.</p>
          <p className="text-destructive/80">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-border bg-card py-16 shadow-card">
        <Loader2 className="size-7 animate-spin text-brand" aria-label="Loading" />
      </div>
    );
  }

  if (!withdrawals || withdrawals.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card px-6 py-16 text-center text-sm text-subtle shadow-card">
        No withdrawal requests yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Bank details</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((w) => (
              <TableRow key={w.id}>
                <TableCell>
                  <div className="font-semibold text-ink">{w.profiles?.full_name || "—"}</div>
                  <div className="text-xs text-subtle">{w.profiles?.email || ""}</div>
                </TableCell>
                <TableCell className="font-semibold text-ink">
                  ${Number(w.amount ?? 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-sm">
                  <div className="font-medium text-ink">{w.account_holder}</div>
                  <div className="text-subtle">{w.bank_name}</div>
                  <div className="text-subtle">{w.account_number}</div>
                  {w.iban ? <div className="text-subtle">{w.iban}</div> : null}
                </TableCell>
                <TableCell className="max-w-[16rem] text-sm text-subtle">{w.note || "—"}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                        statusStyles[w.status] ?? "bg-surface text-subtle"
                      }`}
                    >
                      {w.status}
                    </span>
                    <Select
                      value={w.status}
                      onValueChange={(status) => updateStatus.mutate({ id: w.id, status })}
                    >
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
