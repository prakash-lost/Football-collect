import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Trophy,
  Star,
  Search,
  ChevronDown,
  ArrowUpDown,
  Flame,
  Shield,
  Landmark,
  Crown,
  ChevronRight,
} from "lucide-react";

// Direct JSON import - 100% reliable on Vercel and offline!
import footballPlayersData from "../../footballPlayers.json";

const eraFilters = [
  { id: "all", name: "All Eras", icon: Crown },
  { id: "active", name: "Active Superstars ⚡", icon: Flame },
  { id: "legend", name: "Hall of Fame Legends 🏛️", icon: Landmark },
];

const posFilters = [
  { id: "all", name: "All Positions" },
  { id: "Forward", name: "Forwards (FWD)" },
  { id: "Midfielder", name: "Midfielders (MID)" },
  { id: "Defender", name: "Defenders (DEF)" },
  { id: "Goalkeeper", name: "Goalkeepers (GK)" },
];

const Players = () => {
  const careerPlayers = useMemo(() => footballPlayersData?.players || [], []);

  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedPos, setSelectedPos] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [visible, setVisible] = useState(12);

  // Filter & Sort
  const filteredPlayers = useMemo(() => {
    let result = careerPlayers.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        p.primeClub?.toLowerCase().includes(search.toLowerCase()) ||
        p.nationality?.toLowerCase().includes(search.toLowerCase()) ||
        p.position?.toLowerCase().includes(search.toLowerCase());

      const matchEra = selectedEra === "all" || p.era === selectedEra;
      const matchPos = selectedPos === "all" || p.position === selectedPos;

      return matchSearch && matchEra && matchPos;
    });

    if (sortBy === "goals") {
      result.sort((a, b) => b.careerGoals - a.careerGoals);
    } else if (sortBy === "ballonDor") {
      result.sort((a, b) => b.ballonDor - a.ballonDor);
    } else if (sortBy === "trophies") {
      result.sort((a, b) => b.totalTrophies - a.totalTrophies);
    } else if (sortBy === "apps") {
      result.sort((a, b) => b.careerApps - a.careerApps);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [careerPlayers, search, selectedEra, selectedPos, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Football Career & Legends Archive • Past & Present</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Player Career Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore the complete career journeys, club transfers, trophy cabinets,
            and milestone statistics of the greatest footballers in history.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search player, club, nationality..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border/80 text-foreground text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-3.5 pr-8 rounded-xl bg-card border border-border/80 text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
            >
              <option value="rating">Sort: Overall Icon Rating ★</option>
              <option value="goals">Sort: Most Career Goals ⚽</option>
              <option value="ballonDor">Sort: Most Ballon d'Ors 🏆</option>
              <option value="trophies">Sort: Most Career Trophies 🥇</option>
              <option value="apps">Sort: Most Appearances 🏟️</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ---------- 2. ERA & POSITION SELECTOR TABS ---------- */}
      <div className="flex flex-col gap-3">
        {/* Era Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {eraFilters.map((tab) => {
            const isSelected = selectedEra === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedEra(tab.id);
                  setVisible(12);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card/70 border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Position Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {posFilters.map((pos) => {
            const isSelected = selectedPos === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => {
                  setSelectedPos(pos.id);
                  setVisible(12);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {pos.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- 3. CAREER CARDS GRID (LINKS DIRECTLY TO DETAILS PAGE) ---------- */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/80 rounded-3xl p-8">
          <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">
            No player profiles match your filters
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try checking spelling or switching to "All Eras".
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedEra("all");
              setSelectedPos("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPlayers.slice(0, visible).map((player) => {
            const isLegend = player.era === "legend";

            return (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden text-left"
              >
                <div>
                  {/* Top Bar: Era Badge & Icon Rating */}
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-md border font-extrabold uppercase text-[10px] flex items-center gap-1 ${
                        isLegend
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                          : "bg-sky-500/15 border-sky-500/30 text-sky-400"
                      }`}
                    >
                      {isLegend ? (
                        <>
                          <Landmark className="w-3 h-3" /> Legend
                        </>
                      ) : (
                        <>
                          <Flame className="w-3 h-3" /> Active
                        </>
                      )}
                    </span>

                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {player.rating.toFixed(2)}
                    </span>
                  </div>

                  {/* Player Image with Frame & Jersey Number */}
                  <div className="my-3 flex items-center justify-center relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-primary/10 via-background/40 to-background/80 border border-border/60 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-inner relative">
                      <span className="absolute bottom-1 right-2 text-3xl font-black text-foreground/5 select-none pointer-events-none">
                        #{player.number}
                      </span>

                      {player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Fallback */}
                      <div
                        className={`${
                          player.photo ? "hidden" : "flex"
                        } w-full h-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary`}
                      >
                        <Shield className="w-6 h-6 mb-1 opacity-70" />
                        <span className="font-black text-sm tracking-widest">
                          {player.name.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Career Span */}
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                      {player.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center justify-center gap-1.5">
                      <span>{player.flag}</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground/90">
                        {player.primeClub}
                      </span>
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-muted-foreground/80 px-2 py-0.5 rounded-full bg-muted/40">
                      {player.careerSpan}
                    </span>
                  </div>

                  {/* Career Stat Highlights */}
                  <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-foreground block">
                        {player.careerGoals}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Goals
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-amber-500 block">
                        {player.ballonDor > 0 ? `${player.ballonDor} 🏆` : "—"}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Ballon d'Or
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-primary block truncate">
                        {player.totalTrophies}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Trophies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inspect Career CTA (Link to Details Page) */}
                <div className="mt-4 pt-2">
                  <div className="w-full py-2 px-3 rounded-xl bg-background group-hover:bg-primary group-hover:text-primary-foreground border border-border/80 text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    <span>Inspect Full Career</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ---------- 4. LOAD MORE BUTTON ---------- */}
      {visible < filteredPlayers.length && (
        <div className="w-full flex flex-col items-center justify-center gap-3 mt-4 mb-8">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold">
              {Math.min(visible, filteredPlayers.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold">
              {filteredPlayers.length}
            </span>{" "}
            football legends & stars
          </p>

          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Load More Careers</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Players;
