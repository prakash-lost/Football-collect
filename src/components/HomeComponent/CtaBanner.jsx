import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const CtaBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
      <div className="rounded-xl border border-border bg-card p-8 sm:p-10 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-3xl block mb-2">⚽</span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-sans">
            Ready to Build Your Football Collect Archive?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Follow your favorite club rosters, track player career milestones, and analyze European silverware records.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="default" size="default">
              <Link to="/profile">Get Started Free</Link>
            </Button>
            <Button asChild variant="secondary" size="default">
              <Link to="/teams">Browse All Clubs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
