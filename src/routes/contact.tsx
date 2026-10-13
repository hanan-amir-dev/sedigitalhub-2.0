import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  Mail, MessageSquare, User, Send, CheckCircle2, MapPin, Phone, Building2, Clock, Twitter, Linkedin, Github,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SEDigitalHub" },
      { name: "description", content: "Talk to the SeDigitalHub team. Sales, support, or partnerships — we usually reply within a few hours." },
      { property: "og:title", content: "Contact — SeDigitalHub" },
      { property: "og:description", content: "We usually reply within a few hours." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (10+ chars)"),
});
type FormData = z.infer<typeof schema>;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("contact:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4200);
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient">talk.</span></>}
        desc="Product questions, enterprise deals, partnerships, or press — reach the right team below. We usually reply within a few hours."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Left column */}
            <div className="space-y-5">
              {[
                { icon: Mail, tone: "brand", title: "Email us", body: "hello@sedigitalhub.com" },
                { icon: Phone, tone: "lime", title: "Call us", body: "Mon–Fri · +1 (555) 010-2040" },
                { icon: MapPin, tone: "sunny", title: "Visit us", body: "Torstraße 100 · 10119 Berlin, Germany" },
                { icon: Clock, tone: "brand", title: "Office hours", body: "Mon–Fri · 09:00 – 18:00 CET" },
                { icon: Building2, tone: "lime", title: "For enterprise", body: "enterprise@sedigitalhub.com" },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-5 card-hover">
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid size-11 place-items-center rounded-xl ${
                        c.tone === "brand" ? "bg-brand/12 text-brand" : c.tone === "lime" ? "bg-lime/25 text-ink" : "bg-sunny/30 text-ink"
                      }`}
                    >
                      <c.icon className="size-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{c.title}</div>
                      <div className="text-sm text-subtle">{c.body}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card">
                <div aria-hidden className="absolute inset-0 bg-mesh opacity-90" />
                <div aria-hidden className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(16,24,40,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,40,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="absolute inset-0 -m-4 rounded-full bg-brand/30 blur-xl" />
                    <span className="relative grid size-12 place-items-center rounded-full bg-brand-gradient text-white shadow-glow">
                      <MapPin className="size-5" />
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 rounded-xl bg-white/85 px-3 py-2 text-xs font-semibold text-ink backdrop-blur">
                  Berlin HQ · Google Maps preview
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social link" className="grid size-10 place-items-center rounded-xl border border-border bg-card text-subtle transition hover:border-brand hover:text-brand">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
              noValidate
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Send us a message</h2>
              <p className="mt-2 text-sm text-subtle">Fill out the form and the right team will get back to you.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" icon={User} error={errors.name?.message}>
                  <input
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                    placeholder="Jane Cooper"
                  />
                </Field>
                <Field label="Email" icon={Mail} error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    aria-invalid={!!errors.email}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                    placeholder="jane@company.com"
                  />
                </Field>
                <Field label="Company" icon={Building2}>
                  <input
                    {...register("company")}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                    placeholder="Acme Inc."
                  />
                </Field>
                <Field label="Phone (optional)" icon={Phone}>
                  <input
                    {...register("phone")}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                    placeholder="+1 (555) 010-2040"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Message" icon={MessageSquare} error={errors.message?.message} align="top">
                    <textarea
                      {...register("message")}
                      aria-invalid={!!errors.message}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                      placeholder="Tell us what you're building…"
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 className="size-4" /> Message sent!
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-subtle">
                By submitting, you agree to our privacy policy. We'll never share your details.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label, icon: Icon, children, error, align = "center",
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  error?: string;
  align?: "center" | "top";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-3.5 size-4 text-subtle ${
            align === "top" ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {children}
      </div>
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
