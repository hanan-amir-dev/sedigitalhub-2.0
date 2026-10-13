import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, type ClientProfile } from "@/lib/supabase";

const CLIENTS_KEY = ["admin", "clients"];

/** Fields an admin can edit from the settings modal. */
export type ClientEditableFields = {
  full_name: string;
  phone: string;
  country: string;
  address: string;
  cnic: string;
  balance: number;
};

export function useClients() {
  return useQuery({
    queryKey: CLIENTS_KEY,
    queryFn: async (): Promise<ClientProfile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });
      if (error) throw error;
      // Exclude admin accounts — the client listing should only show clients.
      return ((data as ClientProfile[]) ?? []).filter((c) => c.role !== "admin");
    },
  });
}

/**
 * Shared mutation for updating a client row. Invalidates the client list on
 * success so the table reflects the change.
 */
export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<ClientProfile> }) => {
      const { error } = await supabase.from("profiles").update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}
