import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { GiSoccerBall } from "react-icons/gi";
import { ArrowRight, CheckCircle, X } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    favoriteClub: z.string().min(1, "Please select your favorite club"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteClub: "Real Madrid",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
    }, 1200);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative">
        <Link
          to="/"
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* HEADING */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-elevated border border-border text-primary">
            <GiSoccerBall className="h-7 w-7" />
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
            <CheckCircle className="w-10 h-10 text-success" />
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
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Rossi"
                className={`w-full h-9 px-3 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  errors.name ? "border-destructive" : "border-border"
                }`}
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
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full h-9 px-3 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
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
              <select
                name="favoriteClub"
                value={formData.favoriteClub}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-md bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="Real Madrid">Real Madrid (La Liga)</option>
                <option value="FC Barcelona">FC Barcelona (La Liga)</option>
                <option value="Arsenal FC">Arsenal FC (Premier League)</option>
                <option value="Manchester City">Manchester City (Premier League)</option>
                <option value="Liverpool FC">Liverpool FC (Premier League)</option>
                <option value="Bayern Munich">Bayern Munich (Bundesliga)</option>
                <option value="Inter Milan">Inter Milan (Serie A)</option>
                <option value="Paris Saint-Germain">Paris Saint-Germain (Ligue 1)</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-9 px-3 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  errors.password ? "border-destructive" : "border-border"
                }`}
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
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-9 px-3 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  errors.confirmPassword ? "border-destructive" : "border-border"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover active:scale-[0.98] transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-3 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Creating Account..." : "Create Free Account"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
