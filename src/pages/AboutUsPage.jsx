import React from "react";
import { Link } from "react-router";
import {
  Shield,
  Trophy,
  Users,
  ArrowRight,
  Database,
  CheckCircle,
} from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "European Club Directory",
    description:
      "Detailed profiles for 96 clubs across the Premier League, La Liga, Serie A, Bundesliga, and Ligue 1, featuring official trophy counts, founding dates, and venue capacities.",
  },
  {
    icon: Users,
    title: "Star Player Profiling",
    description:
      "Comprehensive player statistics including match ratings, career goal tallies, key assists, and chronological timeline transfer records.",
  },
  {
    icon: Trophy,
    title: "Championship Standings",
    description:
      "Table tracking with UEFA Champions League qualification thresholds, recent form guides, and defending champion badges.",
  },
  {
    icon: Database,
    title: "Verified Sporting Archive",
    description:
      "Engineered with structured JSON data architecture, offline reliability, and fast search indexing across all top leagues.",
  },
];

const stats = [
  { value: "96", label: "Top Tier Clubs", sub: "Europe's top 5 divisions" },
  { value: "500+", label: "Player Profiles", sub: "Verified career statistics" },
  { value: "12+", label: "Competitions", sub: "UCL, Domestic & UEFA Cups" },
  { value: "100%", label: "Free Database", sub: "Accessible to fans worldwide" },
];

const AboutUsPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10">
      {/* ---------- 1. HERO HEADER ---------- */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>About Football Collect • The Fan-First Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight font-sans">
          CONNECTING FANS TO THE{" "}
          <span className="text-primary">
            BEAUTIFUL GAME
          </span>
        </h1>

        <p className="mt-3 text-xs sm:text-base text-muted-foreground leading-relaxed">
          Football Collect was built to create a clean, fast, and structured football
          destination for supporters worldwide. From historic European silverware to
          comprehensive player career archives, we celebrate the sport.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <Link
            to="/teams"
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover active:scale-[0.98] transition-colors flex items-center gap-2"
          >
            <span>Explore Clubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/players"
            className="px-5 py-2 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-bold hover:border-primary transition-colors flex items-center gap-2"
          >
            <span>Browse Player Stars</span>
            <Users className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ---------- 2. STATS STRIP ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center"
          >
            <span className="text-2xl sm:text-3xl font-black text-primary block tracking-tight font-mono">
              {s.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground block mt-1">
              {s.label}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              {s.sub}
            </span>
          </div>
        ))}
      </div>

      {/* ---------- 3. WHAT WE OFFER (FOUR PILLARS) ---------- */}
      <div className="flex flex-col gap-5">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight font-sans">
            Engineered For Pure Football Passion
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Built from the ground up to give supporters an unmatched football browsing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-lg border border-border bg-card flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-surface-elevated border border-border text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- 4. OUR COMMITMENT & DATA INTEGRITY ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-primary text-xs font-semibold uppercase mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Verified Football Data</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-sans">
            Precision, Accuracy, and Passion in Every Metric
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Our records are cross-referenced with official UEFA club licensing, historical
            archive registries, and validated match performance feeds to guarantee you get
            accurate figures for titles, capacities, and ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full lg:w-auto">
          {[
            "Official UEFA Coefficients",
            "Real-time Standings & Form",
            "Zero Broken Links or Crashes",
            "Optimized for All Screen Sizes",
          ].map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2.5 rounded-md bg-surface-elevated border border-border text-xs font-semibold text-foreground"
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
