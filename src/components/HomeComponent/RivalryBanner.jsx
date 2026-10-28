import React from "react";
import { Link } from "react-router";
import { Swords } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const RivalryBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-3">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Info Side */}
          <div>
            <Badge variant="warning" size="default" className="mb-2">
              <Swords className="size-3.5" />
              <span>Featured Matchday Rivalry</span>
            </Badge>
            <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-sans">
              El Clásico: Real Madrid vs FC Barcelona
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
              Compare European trophies, Ballon d'Or winners, and historical head-to-head dominance between Spain's two greatest clubs.
            </p>
          </div>

          {/* Duel Crests Box */}
          <div className="flex items-center gap-4 sm:gap-6 bg-surface-elevated p-3.5 sm:p-4 rounded-lg border border-border">
            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
                alt="Real Madrid"
                className="size-11 object-contain"
              />
              <span className="text-xs font-bold text-foreground mt-1">Real Madrid</span>
              <span className="text-[10px] text-muted-foreground font-mono">15 UCL</span>
            </div>

            <span className="text-base font-black text-primary px-1">VS</span>

            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
                alt="FC Barcelona"
                className="size-11 object-contain"
              />
              <span className="text-xs font-bold text-foreground mt-1">Barcelona</span>
              <span className="text-[10px] text-muted-foreground font-mono">5 UCL</span>
            </div>
          </div>

          {/* Action CTA */}
          <Button asChild variant="default" size="default" className="shrink-0">
            <Link to="/teams?search=Madrid">
              Inspect Clubs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RivalryBanner;
