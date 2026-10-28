import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Shield,
  Search,
  Star,
  Trophy,
  History,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import playersData from "../data/footballPlayers.json";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { EmptyState } from "../components/ui/empty-state";

const eraFilters = [
  { id: "all", name: "All Legends", icon: Trophy },
  { id: "active", name: "Active Stars (2026)", icon: Sparkles },
  { id: "legend", name: "All-Time Legends", icon: History },
];

const posFilters = [
  { id: "all", name: "All Positions" },
  { id: "Forward", name: "Forwards" },
  { id: "Midfielder", name: "Midfielders" },
  { id: "Defender", name: "Defenders" },
  { id: "Goalkeeper", name: "Goalkeepers" },
];

const Players = () => {
  const allPlayers = useMemo(() => playersData?.players || [], []);

  const [visible, setVisible] = useState(12);
  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedPos, setSelectedPos] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Filtering and Sorting
  const filteredPlayers = useMemo(() => {
    let result = allPlayers.filter((player) => {
      const matchSearch =
        player.name?.toLowerCase().includes(search.toLowerCase()) ||
        player.nationality?.toLowerCase().includes(search.toLowerCase()) ||
        player.primeClub?.toLowerCase().includes(search.toLowerCase()) ||
        player.currentClub?.toLowerCase().includes(search.toLowerCase());

      const matchEra =
        selectedEra === "all" ||
        (selectedEra === "active" && player.era === "active") ||
        (selectedEra === "legend" && player.era === "legend");

      const matchPos =
        selectedPos === "all" || player.position === selectedPos;

      return matchSearch && matchEra && matchPos;
    });

    // Sorting options
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "goals") {
      result.sort((a, b) => (b.careerGoals || 0) - (a.careerGoals || 0));
    } else if (sortBy === "ballonDor") {
      result.sort((a, b) => (b.ballonDor || 0) - (a.ballonDor || 0));
    } else if (sortBy === "trophies") {
      result.sort((a, b) => (b.totalTrophies || 0) - (a.totalTrophies || 0));
    } else if (sortBy === "apps") {
      result.sort((a, b) => (b.careerApps || 0) - (a.careerApps || 0));
    }

    return result;
  }, [allPlayers, search, selectedEra, selectedPos, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <Trophy className="size-3.5 text-primary" />
            <span>Official Hall of Fame & Active Stars</span>
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
          <div className="w-full sm:w-64">
            <Input
              size="sm"
              leftIcon={Search}
              placeholder="Search player, club, nation..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-60">
            <Select
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort: Overall Icon Rating ★</option>
              <option value="goals">Sort: Most Career Goals ⚽</option>
              <option value="ballonDor">Sort: Most Ballon d'Ors 🏆</option>
              <option value="trophies">Sort: Most Career Trophies 🥇</option>
              <option value="apps">Sort: Most Appearances 🏟️</option>
            </Select>
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
                <Icon className="size-3.5" />
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
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-surface-elevated text-primary border-primary font-bold"
                    : "bg-surface-elevated/40 border-border/80 text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                }`}
              >
                {pos.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- 3. PLAYERS CAREER ARCHIVE GRID ---------- */}
      {filteredPlayers.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No footballers match your query"
          description="Try checking for spelling errors, clearing filters, or resetting position."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedEra("all");
                setSelectedPos("all");
              }}
            >
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPlayers.slice(0, visible).map((player) => {
            const isActive = player.era === "active";

            return (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors block text-left"
              >
                <div>
                  {/* Top Bar: Position Pill & Status */}
                  <div className="flex items-center justify-between text-[11px] mb-2.5">
                    <Badge variant={isActive ? "default" : "secondary"} size="sm">
                      {player.position}
                    </Badge>
                    <span className="flex items-center gap-1 text-warning font-mono font-bold text-xs">
                      <Star className="size-3 fill-warning text-warning" />
                      {player.rating.toFixed(2)}
                    </span>
                  </div>

                  {/* Player Image with Frame & Jersey Number */}
                  <div className="my-3 flex items-center justify-center relative">
                    <div className="size-28 sm:size-32 rounded-lg bg-surface-elevated border border-border flex items-center justify-center overflow-hidden relative">
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
                        <Shield className="size-6 mb-1 opacity-70" />
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
                <div className="mt-3.5 pt-2">
                  <div className="w-full py-1.5 px-3 rounded-md bg-surface-elevated group-hover:bg-primary group-hover:text-primary-foreground border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                    <span>Inspect Full Career</span>
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
            football stars
          </p>

          <Button
            onClick={() => setVisible((prev) => prev + 12)}
            variant="default"
            size="sm"
          >
            <span>Load More Legends</span>
            <ChevronDown className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Players;
