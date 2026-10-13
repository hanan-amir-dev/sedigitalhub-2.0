import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, PenLine, TrendingUp } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { PageCTA } from "@/components/site/PageCTA";
import { Header } from "@/components/landing/Features";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — SEDigitalHub" },
      {
        name: "description",
        content:
          "Stories, playbooks, and product updates from the SeDigitalHub team — practical insights for teams building and growing in the digital economy.",
      },
      { property: "og:title", content: "Blog — SeDigitalHub" },
      {
        property: "og:description",
        content: "Product updates, growth playbooks, and stories from teams that ship.",
      },
    ],
  }),
  component: BlogPage,
});

const categories = [
  { icon: TrendingUp, label: "Development", count: 12 },
  { icon: BookOpen, label: "Design", count: 8 },
  { icon: PenLine, label: "Marketing", count: 15 },
];

const posts = [
  {
    grad: "from-brand to-brand-2",
    category: "Development",
    title: "Why Every Business Needs a Professional Website",
    excerpt:
      "A professional website establishes credibility, reaches customers 24/7, and serves as the foundation for all digital marketing efforts in today's competitive landscape.",
    date: "Mar 18, 2026",
    read: "6 min read",
  },
  {
    grad: "from-brand-2 to-lime",
    category: "Development",
    title: "Mobile App Development Trends in 2026",
    excerpt:
      "From AI-powered features to cross-platform frameworks, discover the mobile development trends shaping how businesses connect with customers on the go.",
    date: "Mar 4, 2026",
    read: "5 min read",
  },
  {
    grad: "from-sunny to-brand",
    category: "Development",
    title: "Custom Web Solutions vs Off-the-Shelf Software",
    excerpt:
      "Understanding when to invest in custom development versus choosing ready-made solutions can save time, money, and deliver better long-term results for your business.",
    date: "Feb 21, 2026",
    read: "7 min read",
  },
  {
    grad: "from-brand to-lime",
    category: "Marketing",
    title: "Digital Marketing Strategies That Drive Business Growth",
    excerpt:
      "Learn proven digital marketing tactics including SEO, content marketing, and paid advertising that help businesses attract qualified leads and increase revenue.",
    date: "Feb 8, 2026",
    read: "8 min read",
  },
  {
    grad: "from-lime to-brand-2",
    category: "Design",
    title: "UI/UX Design Best Practices for Higher Conversions",
    excerpt:
      "Discover how user-centered design principles, intuitive navigation, and strategic visual hierarchy can significantly improve conversion rates and customer satisfaction.",
    date: "Jan 29, 2026",
    read: "6 min read",
  },
  {
    grad: "from-brand-2 to-sunny",
    category: "Marketing",
    title: "How YouTube Watch Time Helps Grow Your Channel",
    excerpt:
      "Understanding YouTube's algorithm and watch time metrics is crucial for creators looking to monetize their content and build a sustainable audience.",
    date: "Jan 14, 2026",
    read: "5 min read",
  },
];

function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Stories and playbooks from teams that <span className="text-gradient">ship.</span>
          </>
        }
        desc="Product updates, growth experiments, and practical guides from the SeDigitalHub team — written for builders, operators, and founders who move fast."
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink card-hover"
              >
                <c.icon className="size-4 text-brand" />
                {c.label}
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                  {c.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-surface/60 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Header
            eyebrow="Latest"
            title="Fresh from the team."
            desc="No fluff — just what we're learning as we build."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-hover"
              >
                <div className={`h-36 bg-gradient-to-br ${p.grad} opacity-90`} aria-hidden />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink transition group-hover:text-brand">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-subtle">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-subtle">
                    <span>{p.date}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {p.read}
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 sm:p-10"
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-ink">
              Never miss an update
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-subtle sm:text-base">
              Product launches, growth playbooks, and behind-the-scenes stories — delivered to your
              inbox. No spam, unsubscribe anytime.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <label className="sr-only" htmlFor="blog-email">
                Email address
              </label>
              <input
                id="blog-email"
                type="email"
                placeholder="you@company.com"
                className="w-full flex-1 rounded-full border border-input bg-background px-5 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15 sm:max-w-xs"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <PageCTA
        title="Have a story worth sharing?"
        desc="We feature customer wins, builder journeys, and lessons learned. Reach out if you'd like to be part of the blog."
        primary={{ label: "Get in touch", to: "/contact" }}
        secondary={{ label: "About SeDigitalHub", to: "/about" }}
      />
    </SiteShell>
  );
}
