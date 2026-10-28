import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Shield,
  Search,
  MapPin,
  Calendar,
  Trophy,
  ChevronDown,
  Users,
  X,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

// Direct JSON import - works 100% on Vercel without network errors!
import footballData from "../data/footballTeams.json";

// League filter tabs with flags
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
  const [selectedTeam, setSelectedTeam] = useState(null); // Modal state

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
          (a.trophies?.championsLeague || 0),
      );
    } else if (sortBy === "leagueTitles") {
      result.sort(
        (a, b) =>
          (b.trophies?.leagueTitles || 0) - (a.trophies?.leagueTitles || 0),
      );
    } else if (sortBy === "capacity") {
      result.sort(
        (a, b) => (b.stadiumCapacity || 0) - (a.stadiumCapacity || 0),
      );
    }

    return result;
  }, [teamsList, search, selectedLeague, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Top 5 European Leagues • 2026/27</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            European Club Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore 96 clubs across Europe's top 5 divisions, complete with
            trophy cabinets, home stadiums, and club origins.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search club, city, stadium..."
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
              <option value="default">Sort: Default</option>
              <option value="ucl">Most Champions Leagues (UCL)</option>
              <option value="leagueTitles">Most League Titles</option>
              <option value="capacity">Largest Stadium</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ---------- 2. LEAGUE SELECTOR TABS ---------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {leagues.map((lg) => {
          const isSelected = selectedLeague === lg.id;
          return (
            <button
              key={lg.id}
              onClick={() => {
                setSelectedLeague(lg.id);
                setVisible(12);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card/70 border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
        <div className="text-center py-16 border border-dashed border-border/80 rounded-3xl p-8">
          <Shield className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">
            No clubs match your query
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try checking for spelling errors or choosing "All Leagues".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTeams.slice(0, visible).map((team) => {
            const hasUCL = team.trophies?.championsLeague > 0;

            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                <div>
                  {/* Top Bar: League & UCL Badge */}
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-muted/80 text-foreground font-semibold">
                      {team.league}
                    </span>
                    {hasUCL ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                        <Trophy className="w-3 h-3" />
                        {team.trophies.championsLeague} UCL
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-mono">
                        {team.code}
                      </span>
                    )}
                  </div>

                  {/* Club Crest (With Smart Monogram Fallback if image empty) */}
                  <div className="my-4 flex items-center justify-center">
                    <div className="w-24 h-24 p-3 rounded-2xl bg-background/60 border border-border/60 group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-inner">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-full h-full object-contain filter drop-shadow-md"
                          loading="lazy"
                          onError={(e) => {
                            // If logo URL fails, hide img and show fallback monogram
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback shield badge for empty or broken logo URLs */}
                      <div
                        className={`${
                          team.logo ? "hidden" : "flex"
                        } w-full h-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 text-primary`}
                      >
                        <Shield className="w-5 h-5 mb-0.5" />
                        <span className="font-black text-xs tracking-wider">
                          {team.code ||
                            team.shortName?.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Club Name & City */}
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                      {team.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">
                      {team.city}, {team.country}
                    </p>
                  </div>

                  {/* Stadium & Founding year */}
                  <div className="mt-4 pt-3 border-t border-border/60 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 justify-center">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{team.stadium}</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-4 pt-2">
                  <div className="w-full py-2 px-3 rounded-xl bg-background group-hover:bg-primary group-hover:text-primary-foreground border border-border/80 text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    <span>View Club Details</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- 4. LOAD MORE BUTTON ---------- */}
      {visible < filteredTeams.length && (
        <div className="w-full flex flex-col items-center justify-center gap-3 mt-4 mb-8">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold">
              {Math.min(visible, filteredTeams.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold">
              {filteredTeams.length}
            </span>{" "}
            clubs
          </p>

          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Load More Clubs</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------- 5. INTERACTIVE TEAM DETAILS MODAL ---------- */}
      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl text-foreground flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 p-2 rounded-2xl bg-background border border-border/60 flex items-center justify-center shadow-inner shrink-0">
                {selectedTeam.logo ? (
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Shield className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary uppercase">
                    {selectedTeam.league}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • Est. {selectedTeam.founded}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  {selectedTeam.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedTeam.city}, {selectedTeam.country}
                </p>
              </div>
            </div>

            {/* Club Description */}
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-2xl border border-border/40">
              "{selectedTeam.description}"
            </p>

            {/* Trophy Cabinet Grid */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> Official
                Trophy Cabinet
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-lg font-black text-foreground block">
                    {selectedTeam.trophies?.championsLeague || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    UCL Cups
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-lg font-black text-foreground block">
                    {selectedTeam.trophies?.leagueTitles || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    League Titles
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-lg font-black text-foreground block">
                    {selectedTeam.trophies?.domesticCup || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Domestic Cups
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-lg font-black text-foreground block">
                    {selectedTeam.trophies?.europeanClubCup || 0}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Other UEFA
                  </span>
                </div>
              </div>
            </div>

            {/* Stadium Details */}
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
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
                <span className="text-xs font-black text-foreground block">
                  {selectedTeam.stadiumCapacity?.toLocaleString()} seats
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Capacity
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
