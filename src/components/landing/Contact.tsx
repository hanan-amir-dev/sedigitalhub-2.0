import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MessageSquare, User, Send, CheckCircle2, MapPin, Phone } from "lucide-react";
import { Header } from "./Features";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Tell us a bit more (10+ chars)"),
});
type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("contact:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Header eyebrow="Contact" title="Talk to our team." desc="We usually reply within a few hours." />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/12 text-brand">
                  <Mail className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-ink">Email us</div>
                  <div className="text-sm text-subtle">hello@sedigitalhub.com</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-lime/25 text-ink">
                  <Phone className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-ink">Call us</div>
                  <div className="text-sm text-subtle">Mon–Fri · +1 (555) 010-2040</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-sunny/30 text-ink">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-ink">Visit us</div>
                  <div className="text-sm text-subtle">Torstraße 100 · 10119 Berlin</div>
                </div>
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
            noValidate
          >
            <div className="space-y-5">
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
              <Field label="Message" icon={MessageSquare} error={errors.message?.message} align="top">
                <textarea
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                  placeholder="Tell us what you're building…"
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:opacity-70"
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
            </div>
          </motion.form>
        </div>
      </div>
    </section>
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
