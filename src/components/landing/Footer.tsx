import { Sparkles, Twitter, Github, Linkedin, Youtube } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Dashboard", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Partners"],
  },
  {
    title: "Resources",
    links: ["Blog", "Help center", "Guides", "API docs", "Status"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 max-w-sm">
            <a href="#top" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <Sparkles className="size-4" />
              </span>
              SEDigitalHub
            </a>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              The premium platform for creators, teams, and businesses to unlock their earning potential.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-xl border border-border bg-card text-subtle transition hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-bold text-ink">{c.title}</div>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-subtle transition hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row">
          <div>© {new Date().getFullYear()} SEDigitalHub Inc. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
