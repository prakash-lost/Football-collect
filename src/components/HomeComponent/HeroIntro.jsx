import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Sparkles, ArrowRight, Shield, Trophy, Globe2 } from "lucide-react";

const HeroIntro = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/teams?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
      
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-3 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>The Ultimate Football Database • 2026 Season</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
        EXPLORE CLUBS. COLLECT STARS. <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
          MASTER THE PITCH.
        </span>
      </h1>

      <p className="mt-3 text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto font-medium">
        Comprehensive club histories, official trophies, match ratings, and squad rosters across Europe's top leagues.
      </p>

      {/* Live Search Capsule */}
      <form onSubmit={handleSearch} className="mt-6 max-w-xl mx-auto relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search teams or players (e.g., Real Madrid, Haaland, Arsenal)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-11 pr-28 rounded-full bg-card/90 border border-border/80 text-foreground text-xs sm:text-sm shadow-xl shadow-black/5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Stats Counter Strip */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-center border-y border-border/40 py-3.5">
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-base sm:text-xl text-foreground">50+</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Elite Clubs</span>
        </div>
        <div className="flex flex-col items-center border-l sm:border-x border-border/40">
          <span className="font-extrabold text-base sm:text-xl text-foreground">500+</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Player Cards</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-base sm:text-xl text-foreground">12</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Major Leagues</span>
        </div>
        <div className="flex flex-col items-center border-l border-border/40">
          <span className="font-extrabold text-base sm:text-xl text-foreground">100%</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Free Database</span>
        </div>
      </div>

    </section>
  );
};

export default HeroIntro;