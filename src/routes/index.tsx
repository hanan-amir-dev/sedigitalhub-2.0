import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { PageCTA } from "@/components/site/PageCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEDigitalHub | Digital Solutions & Professional Services" },
      { name: "description", content: "SeDigitalHub empowers businesses with innovative digital solutions, professional services, and scalable technology to accelerate growth." },
      { property: "og:title", content: "SeDigitalHub | Digital Solutions & Professional Services" },
      { property: "og:description", content: "Empowering businesses with innovative digital solutions and scalable technology." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <PageCTA
        title="Start unlocking your growth potential today."
        secondary={{ label: "See Pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}
