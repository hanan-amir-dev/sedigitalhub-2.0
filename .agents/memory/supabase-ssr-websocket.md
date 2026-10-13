---
name: Supabase client crashes on SSR in this container (Node 20)
description: createClient() from @supabase/supabase-js throws "native WebSocket not found" during SSR/dev-server module load; fix and why.
---

`@supabase/supabase-js`'s `createClient()` eagerly constructs a `RealtimeClient`, which requires a global `WebSocket`. This container's Node runtime (20.x) has no global `WebSocket` (added in Node 22), so any module-scope `createClient()` call throws during SSR/dev-server evaluation, even if the app never uses realtime features.

**Why:** Node version is fixed by the container/toolchain, not something to bump per-project; the browser has a native `WebSocket` so this only breaks on the server side (SSR render or any server-run code path that imports the client module).

**How to apply:** When creating a Supabase client in an SSR-capable app (TanStack Start, Next.js, Remix, etc.) on this platform, guard the `realtime` option: if `typeof WebSocket === "undefined"`, dynamically `import("ws")` and pass its `WebSocket` as `realtime: { transport }`; otherwise leave `realtime` unset so the browser's native implementation is used. Also add the `ws` package plus `@types/ws` as dependencies.
