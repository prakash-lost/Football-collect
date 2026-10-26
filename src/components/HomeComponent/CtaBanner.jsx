import React from "react";
import { Link } from "react-router";

const CtaBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/90 to-primary/5 p-8 sm:p-12 text-center shadow-xl backdrop-blur-md">
        <div className="max-w-2xl mx-auto">
          <span className="text-3xl sm:text-4xl block mb-2">⚽</span>
          <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Ready to Build Your Football Hub?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Sign in to save your favorite club rosters, track player transfer values, and access exclusive matchday analytics.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/profile"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/25 hover:opacity-95 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              to="/teams"
              className="px-6 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm font-semibold hover:bg-accent/50 transition-all"
            >
              Browse All Teams
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;