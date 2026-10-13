import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
  );
}

// Node 20 (used in this container's dev/SSR runtime) has no global WebSocket,
// which @supabase/realtime-js requires to construct its client. Supply the
// `ws` package's implementation on the server; the browser has a native one.
const realtimeTransport =
  typeof WebSocket === "undefined" ? (await import("ws")).WebSocket : undefined;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: realtimeTransport ? { transport: realtimeTransport as never } : undefined,
});

/** Extra profile fields collected at sign up, stored in the `profiles` table. */
export type ProfileInsert = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  country: string;
  address: string;
  cnic: string;
  referral_code: string | null;
};

/**
 * A full row from the `profiles` table, including the admin-managed columns
 * (`plan`, `balance`, `is_active`, `role`). These are added via SQL in Supabase;
 * older rows may not have them yet, so they're optional/nullable here.
 */
export type ClientProfile = ProfileInsert & {
  plan: string | null;
  balance: number | null;
  is_active: boolean | null;
  role: string | null;
};

/** A client's withdrawal request with bank details (`withdrawals` table). */
export type Withdrawal = {
  id: string;
  user_id: string;
  amount: number | null;
  account_holder: string;
  bank_name: string;
  account_number: string;
  iban: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

/** Rows an admin creates when submitting a withdrawal. */
export type WithdrawalInsert = {
  user_id: string;
  amount: number | null;
  account_holder: string;
  bank_name: string;
  account_number: string;
  iban: string | null;
  note: string | null;
};

/** A record that a user watched a video (`video_views` table). */
export type VideoView = {
  id: string;
  user_id: string;
  video_id: string;
  watched_at: string;
};

/** A row from the `videos` table. */
export type AppVideo = {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  sort_order: number;
  created_at: string;
};

/** Fields an admin provides when adding/editing a video. */
export type VideoInsert = {
  title: string;
  video_url: string;
  description: string | null;
  thumbnail_url: string | null;
  sort_order: number;
};
