import React from "react";
import { Link } from "react-router";
import {
  Shield,
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "European Club Directory",
    description:
      "Detailed profiles for 96 clubs across the Premier League, La Liga, Serie A, Bundesliga, and Ligue 1, featuring official trophy counts, founding dates, and stadium capacities.",
  },
  {
    icon: Users,
    title: "Star Player Profiling",
    description:
      "Comprehensive player statistics including FotMob match ratings, goal tallies, key assists, market valuations, and tactical skill breakdown charts.",
  },
  {
    icon: Trophy,
    title: "Championship Standings",
    description:
      "Live table tracking with UEFA Champions League qualification thresholds, recent form guides, and defending champion badges.",
  },
  {
    icon: Sparkles,
    title: "Champions League Night Aesthetic",
    description:
      "Engineered with cutting-edge OKLCH color palettes, stadium floodlight radiance, and instant light/dark mode synchronization.",
  },
];

const stats = [
  { value: "96", label: "Top Tier Clubs", sub: "Europe's top 5 divisions" },
  { value: "500+", label: "Player Profiles", sub: "FotMob ratings & stats" },
  { value: "12+", label: "Trophy Competitions", sub: "UCL, Domestic & Cups" },
  { value: "100K+", label: "Active Fans", sub: "Worldwide community" },
];

const AboutUsPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
      {/* ---------- 1. HERO HEADER ---------- */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>About FootballHub • The Fan-First Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
          CONNECTING FANS TO THE{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
            BEAUTIFUL GAME
          </span>
        </h1>

        <p className="mt-4 text-xs sm:text-base text-muted-foreground leading-relaxed">
          FootballHub was born out of a simple passion: to build the cleanest, fastest,
          and most visually stunning digital football destination for supporters worldwide.
          From historic European trophies to real-time player ratings, we celebrate the sport.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            to="/teams"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>Explore Clubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/players"
            className="px-6 py-3 rounded-xl bg-card border border-border/80 text-foreground text-xs sm:text-sm font-bold hover:bg-accent transition-all flex items-center gap-2"
          >
            <span>Browse Player Stars</span>
            <Users className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ---------- 2. STATS STRIP ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md text-center shadow-sm hover:border-primary/40 transition-colors"
          >
            <span className="text-3xl sm:text-4xl font-black text-primary block tracking-tight">
              {s.value}
            </span>
            <span className="text-sm font-black text-foreground block mt-1">
              {s.label}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5 block">
              {s.sub}
            </span>
          </div>
        ))}
      </div>

      {/* ---------- 3. WHAT WE OFFER (FOUR PILLARS) ---------- */}
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Engineered For Pure Football Passion
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Built from the ground up to give supporters an unmatched football browsing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- 4. OUR COMMITMENT & DATA INTEGRITY ---------- */}
      <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>Verified Football Data</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Precision, Accuracy, and Passion in Every Metric
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
            Our records are cross-referenced with official UEFA club licensing, historical
            archive registries, and validated match performance feeds to guarantee you get
            true figures for titles, capacities, and ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
          {[
            "Official UEFA Coefficients",
            "Real-time Standings & Form",
            "Zero Broken Links or Crashes",
            "Optimized for All Screen Sizes",
          ].map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-xl bg-background/80 border border-border/60 text-xs font-bold text-foreground"
            >
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
