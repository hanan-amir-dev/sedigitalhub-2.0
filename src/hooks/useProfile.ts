import { useQuery } from "@tanstack/react-query";
import { supabase, type ClientProfile } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { getPlan, type Plan } from "@/data/plans";

export type Profile = ClientProfile;

/**
 * Fetches the signed-in client's row from the `profiles` table (populated at
 * sign up in AuthContext.signUp). The client's real name lives here, not in
 * `user.user_metadata`, so header/profile UI reads it through this hook.
 */
export function useProfile() {
  const { user } = useAuth();
  const userId = user?.id;

  const query = useQuery({
    queryKey: ["profile", userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId as string)
        .maybeSingle();
      if (error) throw error;
      return (data as Profile | null) ?? null;
    },
  });

  const emailPrefix = user?.email?.split("@")[0] ?? "there";
  const displayName = query.data?.full_name?.trim() || emailPrefix;

  // A plan only counts for the client when the admin has toggled them active.
  // New sign-ups default to is_active=false, so they start with no active plan.
  const isActive = Boolean(query.data?.is_active);
  const selectedPlan: Plan = getPlan(query.data?.plan);
  const plan: Plan | null = isActive ? selectedPlan : null;

  return {
    profile: query.data ?? null,
    displayName,
    email: query.data?.email || user?.email || "",
    /** The client's active plan, or null when their plan isn't active. */
    plan,
    /** Videos unlocked by the active plan (0 when inactive). */
    videoLimit: plan?.videoLimit ?? 0,
    balance: Number(query.data?.balance ?? 0),
    isActive,
    role: query.data?.role ?? "client",
    isAdmin: query.data?.role === "admin",
    isLoading: query.isLoading,
  };
}
