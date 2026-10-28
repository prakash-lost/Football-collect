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
import footballPlayersData from "../data/footballPlayers.json";

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-warning" />
            <span>Football Career Archive • Past & Present</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
            Player Career Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore complete career paths, club transfers, trophy records,
            and milestone statistics of the greatest footballers in history.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search player, club, nationality..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
              className="w-full h-9 pl-9 pr-3 rounded-md bg-card border border-border text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 pr-8 rounded-md bg-card border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="rating">Sort: Overall Icon Rating ★</option>
              <option value="goals">Sort: Most Career Goals ⚽</option>
              <option value="ballonDor">Sort: Most Ballon d'Ors 🏆</option>
              <option value="trophies">Sort: Most Career Trophies 🥇</option>
              <option value="apps">Sort: Most Appearances 🏟️</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ---------- 2. ERA & POSITION SELECTOR TABS ---------- */}
      <div className="flex flex-col gap-2.5">
        {/* Era Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary font-bold"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
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
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer border text-xs ${
                  isSelected
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "bg-surface-elevated border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {pos.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- 3. CAREER CARDS GRID ---------- */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg p-8">
          <Trophy className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-base font-bold text-foreground">
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
            className="mt-3 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPlayers.slice(0, visible).map((player) => {
            const isLegend = player.era === "legend";

            return (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors cursor-pointer text-left"
              >
                <div>
                  {/* Top Bar: Era Badge & Icon Rating */}
                  <div className="flex items-center justify-between text-[11px] mb-2.5">
                    <span
                      className={`px-2 py-0.5 rounded border font-bold uppercase text-[10px] flex items-center gap-1 ${
                        isLegend
                          ? "bg-surface-elevated border-border text-warning"
                          : "bg-surface-elevated border-border text-primary"
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

                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-primary font-mono font-bold">
                      <Star className="w-3 h-3 fill-primary" />
                      {player.rating.toFixed(2)}
                    </span>
                  </div>

                  {/* Player Image with Frame & Jersey Number */}
                  <div className="my-3 flex items-center justify-center relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg bg-surface-elevated border border-border flex items-center justify-center overflow-hidden relative">
                      <span className="absolute bottom-1 right-2 text-2xl font-black text-foreground/5 select-none pointer-events-none font-mono">
                        #{player.number}
                      </span>

                      {player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover object-top"
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
                        } w-full h-full flex-col items-center justify-center rounded bg-surface-elevated text-primary`}
                      >
                        <Shield className="w-6 h-6 mb-1 opacity-70" />
                        <span className="font-bold text-xs tracking-wider">
                          {player.name.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Career Span */}
                  <div className="text-center">
                    <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                      {player.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-normal mt-0.5 flex items-center justify-center gap-1.5">
                      <span>{player.flag}</span>
                      <span>{player.nationality}</span>
                      <span className="text-border">•</span>
                      <span className="font-semibold text-foreground/90">
                        {player.primeClub}
                      </span>
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-mono font-semibold text-muted-foreground px-2 py-0.5 rounded bg-surface-elevated border border-border">
                      {player.careerSpan}
                    </span>
                  </div>

                  {/* Career Stat Highlights */}
                  <div className="mt-3.5 pt-2.5 border-t border-border grid grid-cols-3 gap-1.5 text-center text-xs">
                    <div className="p-1 rounded bg-surface-elevated border border-border">
                      <span className="font-bold text-foreground block font-mono">
                        {player.careerGoals}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase font-semibold">
                        Goals
                      </span>
                    </div>
                    <div className="p-1 rounded bg-surface-elevated border border-border">
                      <span className="font-bold text-warning block font-mono">
                        {player.ballonDor > 0 ? `${player.ballonDor} 🏆` : "—"}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase font-semibold">
                        Ballon d'Or
                      </span>
                    </div>
                    <div className="p-1 rounded bg-surface-elevated border border-border">
                      <span className="font-bold text-primary block truncate font-mono">
                        {player.totalTrophies}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase font-semibold">
                        Trophies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inspect Career CTA */}
                <div className="mt-3 pt-2">
                  <div className="w-full py-1.5 px-3 rounded-md bg-surface-elevated group-hover:bg-primary group-hover:text-primary-foreground border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
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
        <div className="w-full flex flex-col items-center justify-center gap-2 mt-4 mb-6">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold font-mono">
              {Math.min(visible, filteredPlayers.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold font-mono">
              {filteredPlayers.length}
            </span>{" "}
            players
          </p>

          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover active:scale-[0.98] transition-colors cursor-pointer flex items-center gap-1.5"
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
