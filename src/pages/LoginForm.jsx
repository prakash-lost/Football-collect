import React, { useState } from "react";
import { Link } from "react-router";
import { z } from "zod";
import { GiSoccerBall } from "react-icons/gi";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent } from "../components/ui/dialog";

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

    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    onclose?.();
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onclose?.()}>
      <DialogContent size="sm" onClose={onclose}>
        {/* HEADING */}
        <div className="mb-4 text-center">
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
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
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
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive font-medium">{errors.password}</p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full mt-2"
            size="lg"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            onClick={onclose}
            className="font-bold text-primary hover:underline ml-1"
          >
            Create account
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
