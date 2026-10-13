# SEDigitalHub

## Overview
A frontend web app scaffolded with [Lovable](https://lovable.dev), built on TanStack Start (React 19 + TanStack Router/Query) with Vite, Tailwind CSS v4, and shadcn/radix UI components. Imported from a connected GitHub/Lovable repo.

## Tech stack
- **Framework:** TanStack Start (SSR) on Vite 8
- **UI:** React 19, Tailwind CSS v4, shadcn-style Radix UI components
- **Package manager:** Bun (see `bun.lock`; a `package-lock.json` also exists from the original import but Bun is what's used to run things here)
- **Config:** `@lovable.dev/vite-tanstack-config` wraps Vite/TanStack Start/Nitro config — don't add its bundled plugins (TanStack devtools, tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro, etc.) manually, see the comment in `vite.config.ts`.

## Running on Replit
- Workflow **"Start application"** runs `bun run dev` and serves on port 5000.
- The upstream Lovable config hardcodes the Vite dev server to `host: "::"` (IPv6 any) on port 8080, which fails in this container with `EAFNOSUPPORT` because Replit's container has no IPv6 support. `vite.config.ts` overrides this via the `vite.server` option (`host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true`) so the dev server binds correctly and the Replit iframe proxy can reach it.

## Auth (Supabase)
- Backed by the user's existing Supabase project via `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` secrets and `@supabase/supabase-js` (`src/lib/supabase.ts`).
- Routes: `/signup`, `/login`, `/dashboard` (protected via `src/components/auth/ProtectedRoute.tsx`, redirects to `/login` when signed out). Session state lives in `src/context/AuthContext.tsx` (`AuthProvider`, wraps the app in `src/routes/__root.tsx`), exposed via `useAuth()`.
- Sign-up collects extra profile fields (full name, phone, country, address, CNIC, referral code) and upserts them into a `profiles` table in Supabase (id references `auth.users`, RLS restricts each user to their own row) — this table was created by the user directly in the Supabase SQL editor, not by this codebase.
- "Continue with Google" is a UI-only placeholder — no OAuth is wired up.
- Node 20 (this container's runtime) has no global `WebSocket`, which `@supabase/realtime-js` needs; `src/lib/supabase.ts` supplies the `ws` package as the transport when `WebSocket` is undefined (SSR), and falls back to the browser's native implementation on the client.

## Notes
- This project is connected to Lovable (see `AGENTS.md`) — avoid force-pushing or rewriting published git history on the synced branch, since that would desync the Lovable editor.
