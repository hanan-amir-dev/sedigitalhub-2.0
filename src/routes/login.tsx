import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SeDigitalHub" },
      { name: "description", content: "Sign in to your SeDigitalHub account." },
    ],
  }),
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: true },
  });

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    try {
      await signIn(values.email, values.password);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setFormError(
        err instanceof Error
          ? "Invalid email or password. Please try again."
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AuthLayout
      headline="Welcome back to SeDigitalHub"
      subheading="Sign in to pick up right where you left off — your dashboard, projects, and team are waiting."
    >
      <AuthCard
        title="Sign in"
        description="Enter your credentials to access your account."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-brand hover:underline">
              Create Account
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

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/login" className="text-xs font-medium text-brand hover:underline">
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2.5">
            <Checkbox
              id="remember"
              checked={watch("remember")}
              onCheckedChange={(v) => setValue("remember", v === true)}
            />
            <Label htmlFor="remember" className="text-sm font-normal text-subtle">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-gradient py-2.5 text-white shadow-glow transition hover:scale-[1.01] disabled:opacity-70"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
