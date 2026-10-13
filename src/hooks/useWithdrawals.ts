import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, type Withdrawal, type WithdrawalInsert } from "@/lib/supabase";

const LIST_KEY = ["admin", "withdrawals"];

/** Client-side: submit a withdrawal request with bank details. */
export function useCreateWithdrawal() {
  return useMutation({
    mutationFn: async (values: WithdrawalInsert) => {
      const { error } = await supabase.from("withdrawals").insert(values);
      if (error) throw error;
    },
  });
}

/**
 * Admin-side: list all withdrawal requests. Joins the client's name/email from
 * `profiles` so the table can show who submitted each request.
 */
export type WithdrawalWithClient = Withdrawal & {
  profiles: { full_name: string | null; email: string | null } | null;
};

export function useWithdrawals() {
  return useQuery({
    queryKey: LIST_KEY,
    queryFn: async (): Promise<WithdrawalWithClient[]> => {
      const { data, error } = await supabase
        .from("withdrawals")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as WithdrawalWithClient[]) ?? [];
    },
  });
}

/** Admin-side: change a withdrawal's status (pending / paid / rejected). */
export function useUpdateWithdrawalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("withdrawals").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_KEY });
    },
  });
}
