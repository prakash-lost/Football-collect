import React, { useState } from "react";
import { Link } from "react-router";
import { z } from "zod";
import { GiSoccerBall } from "react-icons/gi";
import { X } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const initialFormData = {
  email: "",
  password: "",
};

export default function LoginForm({ onclose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0];
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Login data:", result.data);
    setIsSubmitting(false);
    onclose?.();
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-2xl p-6 sm:p-8 relative text-foreground">
        <button
          type="button"
          onClick={onclose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADING */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-elevated border border-border text-primary">
            <GiSoccerBall className="h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Sign In</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Access your collected squads and player ratings
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive font-medium">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.password ? "border-destructive" : "border-border"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive font-medium">{errors.password}</p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.98] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            onClick={onclose}
            className="font-bold text-primary hover:underline ml-1"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
