import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Shield,
  Search,
  MapPin,
  Trophy,
  ChevronDown,
  X,
  ArrowUpDown,
} from "lucide-react";
import footballData from "../data/footballTeams.json";

const leagues = [
  { id: "all", name: "All Leagues", flag: "🌍" },
  { id: "Premier League", name: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "La Liga", name: "La Liga", flag: "🇪🇸" },
  { id: "Serie A", name: "Serie A", flag: "🇮🇹" },
  { id: "Bundesliga", name: "Bundesliga", flag: "🇩🇪" },
  { id: "Ligue 1", name: "Ligue 1", flag: "🇫🇷" },
];

const TeamsPage = () => {
  const teamsList = useMemo(() => footballData?.teams || [], []);
  const [searchParams] = useSearchParams();

  const [visible, setVisible] = useState(12);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedLeague, setSelectedLeague] = useState(
    searchParams.get("league") || "all"
  );
  const [sortBy, setSortBy] = useState("default");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) setSearch(q);
    const lg = searchParams.get("league");
    if (lg !== null) setSelectedLeague(lg);
  }, [searchParams]);

  // Filter and Sort teams
  const filteredTeams = useMemo(() => {
    let result = teamsList.filter((team) => {
      const matchesSearch =
        team.name?.toLowerCase().includes(search.toLowerCase()) ||
        team.city?.toLowerCase().includes(search.toLowerCase()) ||
        team.stadium?.toLowerCase().includes(search.toLowerCase()) ||
        team.code?.toLowerCase().includes(search.toLowerCase());

      const matchesLeague =
        selectedLeague === "all" || team.league === selectedLeague;

      return matchesSearch && matchesLeague;
    });

    if (sortBy === "ucl") {
      result.sort(
        (a, b) =>
          (b.trophies?.championsLeague || 0) -
          (a.trophies?.championsLeague || 0)
      );
    } else if (sortBy === "leagueTitles") {
      result.sort(
        (a, b) =>
          (b.trophies?.leagueTitles || 0) - (a.trophies?.leagueTitles || 0)
      );
    } else if (sortBy === "capacity") {
      result.sort(
        (a, b) => (b.stadiumCapacity || 0) - (a.stadiumCapacity || 0)
      );
    }

    return result;
  }, [teamsList, search, selectedLeague, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>European Top Divisions • 2026/27</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
            European Club Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore verified clubs across Europe's top 5 divisions, complete with
            trophy cabinets, home venues, and founding history.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search club, city, venue..."
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
              <option value="default">Sort: Default</option>
              <option value="ucl">Most Champions Leagues (UCL)</option>
              <option value="leagueTitles">Most Domestic Titles</option>
              <option value="capacity">Largest Venue Capacity</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ---------- 2. LEAGUE SELECTOR TABS ---------- */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {leagues.map((lg) => {
          const isSelected = selectedLeague === lg.id;
          return (
            <button
              key={lg.id}
              onClick={() => {
                setSelectedLeague(lg.id);
                setVisible(12);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary font-bold"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
              }`}
            >
              <span>{lg.flag}</span>
              <span>{lg.name}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- 3. CLUB CARDS GRID ---------- */}
      {filteredTeams.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg p-8">
          <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-base font-bold text-foreground">
            No clubs match your query
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try checking for spelling errors or choosing "All Leagues".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTeams.slice(0, visible).map((team) => {
            const hasUCL = team.trophies?.championsLeague > 0;

            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-4 hover:border-primary transition-colors cursor-pointer"
              >
                <div>
                  {/* Top Bar: League & UCL Badge */}
                  <div className="flex items-center justify-between text-[11px] mb-2.5">
                    <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-foreground font-semibold">
                      {team.league}
                    </span>
                    {hasUCL ? (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-warning font-mono font-bold">
                        <Trophy className="w-3 h-3 text-warning" />
                        {team.trophies.championsLeague} UCL
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-mono text-[10px]">
                        {team.code}
                      </span>
                    )}
                  </div>

                  {/* Club Crest */}
                  <div className="my-3 flex items-center justify-center">
                    <div className="w-20 h-20 p-2.5 rounded-md bg-surface-elevated border border-border flex items-center justify-center">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`${
                          team.logo ? "hidden" : "flex"
                        } w-full h-full flex-col items-center justify-center rounded bg-surface-elevated text-primary`}
                      >
                        <Shield className="w-4 h-4 mb-0.5" />
                        <span className="font-bold text-[10px]">
                          {team.code || team.shortName?.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Club Name & City */}
                  <div className="text-center">
                    <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                      {team.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-normal mt-0.5">
                      {team.city}, {team.country}
                    </p>
                  </div>

                  {/* Stadium Venue */}
                  <div className="mt-3 pt-2.5 border-t border-border flex items-center gap-1.5 justify-center text-[11px] text-muted-foreground">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="truncate">{team.stadium}</span>
                  </div>
                </div>

                {/* Inspect Button */}
                <div className="mt-3 pt-2">
                  <div className="w-full py-1.5 px-3 rounded-md bg-surface-elevated group-hover:bg-primary group-hover:text-primary-foreground border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                    <span>Inspect Club</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- 4. LOAD MORE BUTTON ---------- */}
      {visible < filteredTeams.length && (
        <div className="w-full flex flex-col items-center justify-center gap-2 mt-4 mb-6">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold font-mono">
              {Math.min(visible, filteredTeams.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold font-mono">
              {filteredTeams.length}
            </span>{" "}
            clubs
          </p>

          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover active:scale-[0.98] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Load More Clubs</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------- 5. TEAM DETAILS MODAL ---------- */}
      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl text-foreground flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTeam(null)}
              aria-label="Close details"
              className="absolute top-4 right-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 p-2 rounded-lg bg-surface-elevated border border-border flex items-center justify-center shrink-0">
                {selectedTeam.logo ? (
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Shield className="w-6 h-6 text-primary" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary uppercase font-mono">
                    {selectedTeam.league}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • Est. {selectedTeam.founded}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground font-sans">
                  {selectedTeam.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedTeam.city}, {selectedTeam.country}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed bg-surface-elevated p-3.5 rounded-md border border-border">
              "{selectedTeam.description}"
            </p>

            {/* Trophy Cabinet Grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-warning" /> Official Trophy Cabinet
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border text-center">
                  <span className="text-base font-black text-foreground block font-mono">
                    {selectedTeam.trophies?.championsLeague || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    UCL Titles
                  </span>
                </div>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border text-center">
                  <span className="text-base font-black text-foreground block font-mono">
                    {selectedTeam.trophies?.leagueTitles || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    League Titles
                  </span>
                </div>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border text-center">
                  <span className="text-base font-black text-foreground block font-mono">
                    {selectedTeam.trophies?.domesticCup || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Domestic Cups
                  </span>
                </div>
                <div className="p-2.5 rounded-md bg-surface-elevated border border-border text-center">
                  <span className="text-base font-black text-foreground block font-mono">
                    {selectedTeam.trophies?.europeanClubCup || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Other UEFA
                  </span>
                </div>
              </div>
            </div>

            {/* Stadium Details */}
            <div className="p-3.5 rounded-md bg-surface-elevated border border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-foreground">
                    {selectedTeam.stadium}
                  </h5>
                  <span className="text-[11px] text-muted-foreground">
                    Home Venue
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-foreground block">
                  {selectedTeam.stadiumCapacity?.toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Seats Capacity
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
