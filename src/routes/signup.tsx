import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — SeDigitalHub" },
      {
        name: "description",
        content:
          "Create your SeDigitalHub account and start growing with premium digital solutions.",
      },
    ],
  }),
  component: SignupPage,
});

const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
const cnicRegex = /^\d{5}-?\d{7}-?\d{1}$|^[A-Za-z0-9]{6,20}$/;

const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z.string().trim().regex(phoneRegex, "Enter a valid mobile number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    country: z.string().min(1, "Select your country"),
    address: z.string().trim().min(5, "Enter your full address"),
    cnic: z.string().trim().regex(cnicRegex, "Enter a valid CNIC / ID number"),
    referralCode: z.string().trim().min(1, "Referral code is required").refine((v) => v === "SE-0702", "Invalid referral code"),
    terms: z.boolean().refine((v) => v === true, "You must agree to the Terms & Conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { terms: false, country: "" },
  });

  const onSubmit = async (values: SignupValues) => {
    setFormError(null);
    try {
      const result = await signUp({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
        country: values.country,
        address: values.address,
        cnic: values.cnic,
        referralCode: values.referralCode,
      });

      if (result.session) {
        navigate({ to: "/dashboard" });
      } else {
        setAwaitingConfirmation(true);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (awaitingConfirmation) {
    return (
      <AuthLayout
        headline="Build Your Future with SeDigitalHub"
        subheading="Join thousands of professionals and businesses growing with premium digital solutions."
      >
        <AuthCard title="Check your inbox" description="One more step to activate your account.">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-4 text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-brand/12 text-brand">
              <MailCheck className="size-7" />
            </span>
            <p className="text-sm text-subtle">
              We've sent a confirmation link to your email address. Click it to verify your account,
              then sign in to reach your dashboard.
            </p>
            <Button asChild className="mt-2 rounded-full bg-brand-gradient text-white shadow-glow">
              <Link to="/login">Go to sign in</Link>
            </Button>
          </motion.div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      headline="Build Your Future with SeDigitalHub"
      subheading="Join thousands of professionals and businesses growing with premium digital solutions."
    >
      <AuthCard
        title="Create your account"
        description="Start your journey in under a minute."
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand hover:underline">
              Sign In
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {formError ? (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
            >
              {formError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                autoComplete="name"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName ? (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Select
                onValueChange={(v) => setValue("country", v, { shouldValidate: true })}
                value={watch("country")}
              >
                <SelectTrigger id="country" aria-invalid={!!errors.country}>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country ? (
                <p className="text-xs text-destructive">{errors.country.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              {errors.password ? (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                autoComplete="new-password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword ? (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              autoComplete="street-address"
              {...register("address")}
              aria-invalid={!!errors.address}
            />
            {errors.address ? (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                placeholder="XXXXX-XXXXXXX-X"
                {...register("cnic")}
                aria-invalid={!!errors.cnic}
              />
              {errors.cnic ? (
                <p className="text-xs text-destructive">{errors.cnic.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="referralCode">Referral Code</Label>
              <Input
                id="referralCode"
                {...register("referralCode")}
                aria-invalid={!!errors.referralCode}
              />
              {errors.referralCode ? (
                <p className="text-xs text-destructive">{errors.referralCode.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="terms"
              checked={watch("terms")}
              onCheckedChange={(v) => setValue("terms", v === true, { shouldValidate: true })}
              aria-invalid={!!errors.terms}
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-snug text-subtle">
              I agree to the{" "}
              <Link to="/" className="font-medium text-brand hover:underline">
                Terms &amp; Conditions
              </Link>
            </Label>
          </div>
          {errors.terms ? <p className="text-xs text-destructive">{errors.terms.message}</p> : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-gradient py-2.5 text-white shadow-glow transition hover:scale-[1.01] disabled:opacity-70"
          >
            {isSubmitting ? "Creating your account…" : "Create Account"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
