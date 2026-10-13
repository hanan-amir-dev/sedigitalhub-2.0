import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, Wallet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useCreateWithdrawal } from "@/hooks/useWithdrawals";

export const Route = createFileRoute("/dashboard/withdraw")({
  head: () => ({
    meta: [{ title: "Withdraw — SeDigitalHub" }],
  }),
  component: WithdrawPage,
});

const EMPTY = {
  amount: "",
  account_holder: "",
  bank_name: "",
  account_number: "",
  iban: "",
  note: "",
};

function WithdrawPage() {
  const { user } = useAuth();
  const { balance, isLoading } = useProfile();
  const createWithdrawal = useCreateWithdrawal();

  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const money = (n: number) => `$${n.toFixed(2)}`;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    const amountNum = Number(form.amount);
    if (!form.amount || Number.isNaN(amountNum) || amountNum <= 0) {
      setError("Enter a valid amount greater than 0.");
      return;
    }
    if (amountNum > balance) {
      setError(`Amount exceeds your available balance of ${money(balance)}.`);
      return;
    }
    if (!form.account_holder.trim() || !form.bank_name.trim() || !form.account_number.trim()) {
      setError("Account holder, bank name and account number are required.");
      return;
    }
    if (!user?.id) {
      setError("You must be signed in.");
      return;
    }

    try {
      await createWithdrawal.mutateAsync({
        user_id: user.id,
        amount: amountNum,
        account_holder: form.account_holder.trim(),
        bank_name: form.bank_name.trim(),
        account_number: form.account_number.trim(),
        iban: form.iban.trim() || null,
        note: form.note.trim() || null,
      });
      setSubmitted(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your request.");
    }
  };

  const fields: Array<{ key: keyof typeof form; label: string; placeholder?: string }> = [
    { key: "account_holder", label: "Account holder name" },
    { key: "bank_name", label: "Bank name" },
    { key: "account_number", label: "Account number" },
    { key: "iban", label: "IBAN / Routing (optional)" },
    { key: "note", label: "Note (optional)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="mx-auto max-w-lg space-y-6"
    >
      {/* Available balance */}
      <div className="rounded-3xl border border-border bg-brand-gradient p-6 text-white shadow-glow">
        <div className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Wallet className="size-4" /> Available balance
        </div>
        <p className="mt-2 text-3xl font-extrabold tracking-tight">
          {isLoading ? "…" : money(balance)}
        </p>
      </div>

      {/* Withdrawal / bank details form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card"
      >
        <div>
          <h2 className="text-lg font-bold text-ink">Withdrawal request</h2>
          <p className="mt-1 text-sm text-subtle">
            Enter the amount and the bank account where you'd like to receive it.
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-medium text-brand"
          >
            <CheckCircle2 className="size-4" /> Request sent. The admin will review your details.
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
          >
            {error}
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="amount">Amount (USD)</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle">
              $
            </span>
            <Input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={set("amount")}
              className="pl-7"
            />
          </div>
        </div>

        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              value={form[f.key]}
              onChange={set(f.key)}
              placeholder={f.placeholder}
            />
          </div>
        ))}

        <Button
          type="submit"
          disabled={createWithdrawal.isPending || (balance <= 0 && !isLoading)}
          className="w-full gap-2 rounded-full bg-brand-gradient text-white hover:opacity-95"
        >
          {createWithdrawal.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send
        </Button>

        {balance <= 0 && !isLoading ? (
          <p className="text-center text-xs text-subtle">
            You don't have any balance available to withdraw yet.
          </p>
        ) : null}
      </form>
    </motion.div>
  );
}
