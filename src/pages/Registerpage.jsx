import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { GiSoccerBall } from "react-icons/gi";
import { Sparkles, ArrowRight } from "lucide-react";

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-background text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl relative">
        <Link
          to="/"
          className="absolute top-5 right-5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          ✕ Close
        </Link>

        {/* HEADING */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
            <GiSoccerBall className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Join Football<span className="text-primary">Hub</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Create your supporter profile & collect star footballer cards
          </p>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-2">
            <Sparkles className="w-10 h-10 text-emerald-400" />
            <h3 className="text-lg font-bold text-foreground">
              Welcome to the Squad!
            </h3>
            <p className="text-xs text-muted-foreground">
              Account created. Redirecting to your fan profile...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Rossi"
                className={`w-full h-11 px-3.5 rounded-xl bg-background border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.name ? "border-red-400" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full h-11 px-3.5 rounded-xl bg-background border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.email ? "border-red-400" : "border-border"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>

            {/* FAVORITE CLUB */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Primary Supported Club
              </label>
              <select
                name="favoriteClub"
                value={formData.favoriteClub}
                onChange={handleChange}
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
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
              <label className="block text-xs font-bold text-foreground mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-11 px-3.5 rounded-xl bg-background border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.password ? "border-red-400" : "border-border"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-11 px-3.5 rounded-xl bg-background border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.confirmPassword ? "border-red-400" : "border-border"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>{isSubmitting ? "Creating Account..." : "Join FootballHub"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-5 text-center text-xs text-muted-foreground border-t border-border/60 pt-4">
          Already have an account?{" "}
          <Link to="/" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
