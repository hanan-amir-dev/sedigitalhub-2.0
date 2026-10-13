import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateClient } from "@/hooks/useClients";
import type { ClientProfile } from "@/lib/supabase";

export function ClientSettingsModal({
  client,
  open,
  onOpenChange,
}: {
  client: ClientProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const updateClient = useUpdateClient();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    country: "",
    address: "",
    cnic: "",
    balance: "0",
  });
  const [error, setError] = useState<string | null>(null);

  // Reset the form whenever a different client is opened.
  useEffect(() => {
    if (client) {
      setForm({
        full_name: client.full_name ?? "",
        phone: client.phone ?? "",
        country: client.country ?? "",
        address: client.address ?? "",
        cnic: client.cnic ?? "",
        balance: String(client.balance ?? 0),
      });
      setError(null);
    }
  }, [client]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!client) return;
    setError(null);

    const balanceNum = Number(form.balance);
    if (Number.isNaN(balanceNum) || balanceNum < 0) {
      setError("Enter a valid balance (0 or more).");
      return;
    }

    try {
      await updateClient.mutateAsync({
        id: client.id,
        values: {
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          address: form.address.trim(),
          cnic: form.cnic.trim(),
          balance: balanceNum,
        },
      });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes.");
    }
  };

  const fields: Array<{ key: keyof typeof form; label: string; type?: string }> = [
    { key: "full_name", label: "Full name" },
    { key: "phone", label: "Phone" },
    { key: "country", label: "Country" },
    { key: "address", label: "Address" },
    { key: "cnic", label: "CNIC / ID" },
    { key: "balance", label: "Balance (USD)", type: "number" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit client</DialogTitle>
        </DialogHeader>

        {client ? (
          <div className="space-y-4">
            <p className="text-sm text-subtle">{client.email}</p>

            {error ? (
              <div
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
              >
                {error}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className={`space-y-1.5 ${f.key === "address" ? "sm:col-span-2" : ""}`}
                >
                  <Label htmlFor={`field-${f.key}`}>{f.label}</Label>
                  <Input
                    id={`field-${f.key}`}
                    type={f.type ?? "text"}
                    min={f.type === "number" ? "0" : undefined}
                    step={f.type === "number" ? "0.01" : undefined}
                    value={form[f.key]}
                    onChange={set(f.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateClient.isPending}
            className="gap-2 rounded-full bg-brand-gradient text-white hover:opacity-95"
          >
            {updateClient.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
