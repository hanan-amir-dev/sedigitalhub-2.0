import { Sparkles, Twitter, Github, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" as const },
      { label: "How It Works", to: "/how-it-works" as const },
      { label: "Pricing", to: "/pricing" as const },
      { label: "Testimonials", to: "/testimonials" as const },
      { label: "FAQ", to: "/faq" as const },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" as const },
      { label: "Contact", to: "/contact" as const },
      { label: "Careers", to: "/about" as const },
      { label: "Press", to: "/about" as const },
      { label: "Partners", to: "/contact" as const },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/" as const },
      { label: "Help center", to: "/faq" as const },
      { label: "Guides", to: "/how-it-works" as const },
      { label: "API docs", to: "/features" as const },
      { label: "Status", to: "/" as const },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 max-w-sm">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <span className="grid size-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <Sparkles className="size-4" />
              </span>
              SeDigitalHub
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              Empowering businesses with innovative digital solutions, professional services,
              and scalable technology to accelerate growth.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-subtle">
              <li className="flex items-center gap-2"><Mail className="size-4 text-brand" /> hello@sedigitalhub.com</li>
              <li className="flex items-center gap-2"><Phone className="size-4 text-brand" /> +1 (555) 010-2040</li>
              <li className="flex items-center gap-2"><MapPin className="size-4 text-brand" /> Torstraße 100 · 10119 Berlin</li>
            </ul>
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
                  <li key={l.label}>
                    <Link to={l.to} className="text-subtle transition hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row">
          <div>© 2026 SeDigitalHub. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Privacy Policy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
