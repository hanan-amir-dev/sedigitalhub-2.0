import { useState } from "react";
import { CreditCard } from "lucide-react";

// TODO: Replace with official NayaPay logo asset
// TODO: Replace with official SadaPay logo asset
// TODO: Replace with official JazzCash logo asset
// TODO: Replace with official Easypaisa logo asset
// TODO: Replace with official Visa logo asset
// TODO: Replace with official Mastercard logo asset
const paymentMethods = [
  { name: "NayaPay", logo: "/payment-logos/nayapay-logo.png" },
  { name: "SadaPay", logo: "/payment-logos/sadapay-logo.png" },
  { name: "JazzCash", logo: "/payment-logos/Jazzcash-logo.png" },
  { name: "Easypaisa", logo: "/payment-logos/Easypaisa-logo.png" },
  { name: "Visa", logo: "/payment-logos/visa.jpg" },
  { name: "Mastercard", logo: "/payment-logos/mastercard.png" },
  { name: "Bank Transfer", icon: CreditCard },
];

function PaymentMethodItem({ item }: { item: (typeof paymentMethods)[number] }) {
  const [hasError, setHasError] = useState(false);

  if ("logo" in item && item.logo && !hasError) {
    return (
      <div className="flex h-10 w-32 items-center justify-center">
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          onError={() => setHasError(true)}
          className="max-h-full max-w-full object-contain grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    );
  }

  if ("icon" in item && item.icon) {
    const Icon = item.icon;
    return (
      <div className="flex h-10 w-32 items-center justify-center gap-2 text-subtle/70 grayscale transition duration-300 group-hover:text-brand group-hover:grayscale-0">
        <Icon className="size-5 shrink-0" />
        <span className="text-sm font-bold tracking-tight whitespace-nowrap">{item.name}</span>
      </div>
    );
  }

  // Muted text placeholder fallback in case of loading error
  return (
    <div
      role="img"
      aria-label={`${item.name} logo placeholder`}
      className="flex h-10 w-32 items-center justify-center rounded border border-dashed border-subtle/30 text-sm font-medium text-subtle/40 transition duration-300 group-hover:border-brand/40 group-hover:text-brand/60"
    >
      {item.name}
    </div>
  );
}

export function TrustedBy() {
  // Duplicating the list 4 times (even number of repetitions) to ensure
  // the repeating block is wider than any viewport, preventing gaps/jumps when translating -50%.
  const doubled = [...paymentMethods, ...paymentMethods, ...paymentMethods, ...paymentMethods];

  return (
    <section aria-labelledby="trusted" className="border-y border-border/70 bg-surface/60 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="trusted"
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-subtle"
        >
          Trusted Payment Methods
        </h2>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <div className="flex w-max gap-16 animate-marquee">
            {doubled.map((item, i) => (
              <div key={i} className="group flex shrink-0 items-center transition duration-300">
                <PaymentMethodItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
