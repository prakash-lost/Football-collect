import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
      <Badge variant="secondary" size="lg" className="mb-4">
        <span className="size-2 rounded-full bg-primary" />
        <span>Football Archive & Database • 2026/27</span>
      </Badge>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight font-sans">
        EXPLORE CLUBS. COLLECT STARS. <br className="hidden sm:inline" />
        <span className="text-primary">
          MASTER THE PITCH.
        </span>
      </h1>

      <p className="mt-3.5 text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
        Comprehensive club histories, official trophy cabinets, matchday ratings, and squad rosters across Europe's elite divisions.
      </p>

      {/* Live Search Capsule */}
      <form onSubmit={handleSearch} className="mt-6 max-w-xl mx-auto relative flex items-center">
        <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search teams or players (e.g., Real Madrid, Haaland)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-24 rounded-lg bg-card border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground"
        />
        <div className="absolute right-1.5">
          <Button
            type="submit"
            variant="default"
            size="xs"
            className="h-8 px-3"
          >
            <span>Search</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </form>

      {/* Stats Counter Strip */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-center border-y border-border py-4">
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-base sm:text-xl text-foreground">50+</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Elite Clubs</span>
        </div>
        <div className="flex flex-col items-center border-l sm:border-x border-border">
          <span className="font-extrabold text-base sm:text-xl text-foreground">500+</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Player Profiles</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-base sm:text-xl text-foreground">12</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Competitions</span>
        </div>
        <div className="flex flex-col items-center border-l border-border">
          <span className="font-extrabold text-base sm:text-xl text-foreground">100%</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Verified Records</span>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
