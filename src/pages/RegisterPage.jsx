import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { GiSoccerBall } from "react-icons/gi";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    favoriteClub: z.string().min(1, "Please select a supported club"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const initialFormData = {
  name: "",
  email: "",
  favoriteClub: "Real Madrid",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

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

    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[calc(100vh-14rem)] py-8 px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 sm:p-8 text-foreground shadow-2xl">
        {/* HEADING */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-surface-elevated border border-border text-primary">
            <GiSoccerBall className="size-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground font-sans">
            Join Football<span className="text-primary font-black">Collect</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Create your supporter profile & collect star footballer cards
          </p>
        </div>

        {success ? (
          <div className="p-6 rounded-lg bg-surface-elevated border border-success/40 text-center flex flex-col items-center gap-2 animate-in fade-in">
            <CheckCircle className="size-10 text-success" />
            <h3 className="text-base font-bold text-foreground">
              Welcome to Football Collect!
            </h3>
            <p className="text-xs text-muted-foreground">
              Account created. Redirecting to your fan profile...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Full Name
              </label>
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Rossi"
                error={errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* FAVORITE CLUB */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Primary Supported Club
              </label>
              <Select
                name="favoriteClub"
                value={formData.favoriteClub}
                onChange={handleChange}
              >
                <option value="Real Madrid">Real Madrid (La Liga)</option>
                <option value="FC Barcelona">FC Barcelona (La Liga)</option>
                <option value="Arsenal FC">Arsenal FC (Premier League)</option>
                <option value="Manchester City">Manchester City (Premier League)</option>
                <option value="Liverpool FC">Liverpool FC (Premier League)</option>
                <option value="Bayern Munich">Bayern Munich (Bundesliga)</option>
                <option value="Inter Milan">Inter Milan (Serie A)</option>
                <option value="Paris Saint-Germain">Paris Saint-Germain (Ligue 1)</option>
              </Select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Password
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Confirm Password
              </label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full mt-3"
              size="lg"
            >
              <span>{isSubmitting ? "Creating Account..." : "Create Free Account"}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </form>
        )}

        <div className="mt-5 text-center text-xs text-muted-foreground border-t border-border pt-4">
          Already have an account?{" "}
          <Link to="/" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
