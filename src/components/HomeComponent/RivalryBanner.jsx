import React from "react";
import { Link } from "react-router";
import { Swords } from "lucide-react";

const RivalryBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-2">
      <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-gradient-to-r from-blue-950/20 via-card/90 to-amber-950/20 backdrop-blur-md p-6 sm:p-8 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold uppercase mb-2">
              <Swords className="w-3.5 h-3.5" />
              <span>Featured Historic Rivalry</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              El Clásico: The Eternal Showdown
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg">
              Compare European trophies, Ballon d'Or winners, and historical head-to-head dominance between Spain's two greatest clubs.
            </p>
          </div>

          {/* Duel Crests Box */}
          <div className="flex items-center gap-4 sm:gap-6 bg-background/60 p-4 rounded-2xl border border-border/60 shadow-inner">
            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
                alt="Real Madrid"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-extrabold text-foreground mt-1">Real Madrid</span>
              <span className="text-[10px] text-muted-foreground">15 UCL</span>
            </div>

            <span className="text-lg font-black text-primary px-2">VS</span>

            <div className="flex flex-col items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
                alt="FC Barcelona"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-extrabold text-foreground mt-1">Barcelona</span>
              <span className="text-[10px] text-muted-foreground">5 UCL</span>
            </div>
          </div>

          {/* Action CTA */}
          <Link
            to="/teams"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all shrink-0"
          >
            Compare Clubs
          </Link>

        </div>

      </div>
    </section>
  );
};

export default RivalryBanner;