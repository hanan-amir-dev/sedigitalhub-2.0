---
name: Lovable vite-tanstack-config on Replit
description: Why Lovable-imported TanStack Start apps fail to start on Replit, and how to fix it.
---

Projects imported from Lovable that use `@lovable.dev/vite-tanstack-config` (TanStack Start + Vite) hardcode the dev server to `host: "::"` (IPv6 any), port 8080. Replit's containers have no IPv6 support at all, so this fails immediately with `listen EAFNOSUPPORT: address family not supported :::8080`.

**Why:** the config package always merges in `{ server: { host: "::", port: 8080 } }`; outside Lovable's own sandbox (no `LOVABLE_SANDBOX`/`DEV_SERVER__PROJECT_PATH` env vars set), it merges its defaults *first* and the caller's `vite.server` config *second*, so caller overrides win.

**How to apply:** in `vite.config.ts`, pass `vite: { server: { host: "0.0.0.0", port: 5000, strictPort: true, allowedHosts: true } }` into `defineConfig` from `@lovable.dev/vite-tanstack-config`. This overrides the IPv6 default and matches Replit's required webview port (5000). Run the dev script (`bun run dev` / `vite dev`) as the workflow command.
