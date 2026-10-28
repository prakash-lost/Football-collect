import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Shield,
  Search,
  MapPin,
  Trophy,
  ChevronDown,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";
import footballData from "../data/footballTeams.json";
import footballPlayersData from "../data/footballPlayers.json";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { EmptyState } from "../components/ui/empty-state";
import { Dialog, DialogContent } from "../components/ui/dialog";

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
  const [selectedTeamTab, setSelectedTeamTab] = useState("trophies"); // "trophies" | "squad" | "fixtures"

  // Squad members from footballPlayersData matching selected team
  const squadPlayers = useMemo(() => {
    if (!selectedTeam) return [];
    const list = footballPlayersData?.players || [];
    const teamName = selectedTeam.name?.toLowerCase();
    return list.filter((p) => {
      const current = p.currentClub?.toLowerCase() || "";
      const prime = p.primeClub?.toLowerCase() || "";
      return current.includes(teamName) || prime.includes(teamName) || teamName.includes(current);
    });
  }, [selectedTeam]);

  // Real fixtures involving the selected team
  const clubFixtures = useMemo(() => {
    if (!selectedTeam) return [];
    const teamName = selectedTeam.name?.toLowerCase();
    const allMatches = [
      {
        id: "cf-1",
        comp: "Champions League Quarter-Final",
        date: "Apr 9, 2026 • 20:00",
        home: "Real Madrid",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        away: "FC Barcelona",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
        score: "VS",
        status: "Upcoming",
      },
      {
        id: "cf-2",
        comp: "Premier League Matchday 27",
        date: "Apr 18, 2026 • 17:30",
        home: "Arsenal",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        away: "Manchester City",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        score: "VS",
        status: "Upcoming",
      },
      {
        id: "cf-3",
        comp: "Champions League Round of 16 Leg 2",
        date: "Mar 11, 2026 • FT",
        home: "Liverpool",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        away: "Real Madrid",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        score: "2 - 0",
        status: "Completed",
      },
      {
        id: "cf-4",
        comp: "Serie A Matchday 25",
        date: "Feb 23, 2026 • FT",
        home: "Inter Milan",
        homeLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
        away: "AC Milan",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
        score: "2 - 1",
        status: "Completed",
      },
      {
        id: "cf-5",
        comp: "Bundesliga Matchday 23",
        date: "Feb 21, 2026 • FT",
        home: "Bayern Munich",
        homeLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
        away: "Eintracht Frankfurt",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg",
        score: "3 - 0",
        status: "Completed",
      },
      {
        id: "cf-6",
        comp: "Ligue 1 Matchday 24",
        date: "Apr 19, 2026 • 20:45",
        home: "Paris Saint-Germain",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
        away: "Marseille",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg",
        score: "VS",
        status: "Upcoming",
      },
    ];

    return allMatches.filter(
      (m) =>
        m.home.toLowerCase().includes(teamName) ||
        m.away.toLowerCase().includes(teamName) ||
        teamName.includes(m.home.toLowerCase()) ||
        teamName.includes(m.away.toLowerCase())
    );
  }, [selectedTeam]);

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
            <Shield className="size-3.5 text-primary" />
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
          <div className="w-full sm:w-64">
            <Input
              size="sm"
              leftIcon={Search}
              placeholder="Search club, city, venue..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-56">
            <Select
              size="sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="ucl">Most Champions Leagues (UCL)</option>
              <option value="leagueTitles">Most Domestic Titles</option>
              <option value="capacity">Largest Venue Capacity</option>
            </Select>
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
        <EmptyState
          icon={Shield}
          title="No clubs match your query"
          description="Try checking for spelling errors or choosing 'All Leagues'."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedLeague("all");
              }}
            >
              Reset Search
            </Button>
          }
        />
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
                    <Badge variant="secondary" size="sm">
                      {team.league}
                    </Badge>
                    {hasUCL ? (
                      <Badge variant="warning" size="sm" className="font-mono">
                        <Trophy className="size-3" />
                        {team.trophies.championsLeague} UCL
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground font-mono text-[10px]">
                        {team.code}
                      </span>
                    )}
                  </div>

                  {/* Club Crest */}
                  <div className="my-3 flex items-center justify-center">
                    <div className="size-20 p-2.5 rounded-md bg-surface-elevated border border-border flex items-center justify-center">
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
                        <Shield className="size-4 mb-0.5" />
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
                    <MapPin className="size-3 text-primary shrink-0" />
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

          <Button
            onClick={() => setVisible((prev) => prev + 12)}
            variant="default"
            size="sm"
          >
            <span>Load More Clubs</span>
            <ChevronDown className="size-4" />
          </Button>
        </div>
      )}

      {/* ---------- 5. TEAM DETAILS MODAL (ORGANIZED IDENTITY, SQUAD & FIXTURES) ---------- */}
      <Dialog
        open={Boolean(selectedTeam)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedTeam(null);
            setSelectedTeamTab("trophies");
          }
        }}
      >
        {selectedTeam && (
          <DialogContent
            size="lg"
            title={`${selectedTeam.name} Dossier`}
            description={`${selectedTeam.league} • ${selectedTeam.city}, ${selectedTeam.country}`}
            onClose={() => {
              setSelectedTeam(null);
              setSelectedTeamTab("trophies");
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-3.5 pb-2 border-b border-border">
              <div className="size-14 p-2 rounded-lg bg-surface-elevated border border-border flex items-center justify-center shrink-0">
                {selectedTeam.logo ? (
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Shield className="size-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm">
                    {selectedTeam.league}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Est. {selectedTeam.founded}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground font-sans mt-0.5 truncate">
                  {selectedTeam.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedTeam.stadium} • {selectedTeam.city}, {selectedTeam.country}
                </p>
              </div>
            </div>

            {/* Modal Tab Switchers */}
            <div className="flex items-center gap-1.5 border-b border-border pb-2 overflow-x-auto">
              {[
                { id: "trophies", label: "Trophies & Venue", icon: Trophy },
                { id: "squad", label: `Squad Stars (${squadPlayers.length})`, icon: Users },
                { id: "fixtures", label: `Matchdays (${clubFixtures.length})`, icon: Calendar },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTeamTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTeamTab(t.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-extrabold"
                        : "bg-surface-elevated text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: TROPHIES & VENUE */}
            {selectedTeamTab === "trophies" && (
              <div className="space-y-4 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed bg-surface-elevated p-3 rounded-md border border-border">
                  "{selectedTeam.description}"
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Trophy className="size-3.5 text-warning" /> Official Silverware Cabinet
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

                <div className="p-3 rounded-md bg-surface-elevated border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="size-4 text-primary shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-foreground">
                        {selectedTeam.stadium}
                      </h5>
                      <span className="text-[11px] text-muted-foreground">
                        Home Pitch & Stadium
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
            )}

            {/* TAB 2: SQUAD STARS */}
            {selectedTeamTab === "squad" && (
              <div className="space-y-3 pt-1">
                {squadPlayers.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-6 text-center">
                    No individual player profiles currently linked for this club in the database.
                  </p>
                ) : (
                  <div className="divide-y divide-border border border-border rounded-lg bg-surface-elevated/40 overflow-hidden">
                    {squadPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="p-3 flex items-center justify-between gap-3 hover:bg-surface-elevated/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-10 rounded-md bg-surface-elevated border border-border overflow-hidden shrink-0">
                            <img
                              src={player.photo}
                              alt={player.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                                #{player.number}
                              </Badge>
                              <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                                {player.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {player.position} • {player.nationality}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right hidden sm:block">
                            <span className="text-xs font-mono font-bold text-primary block">
                              {player.careerGoals} Goals
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {player.careerApps} Apps
                            </span>
                          </div>

                          <Button asChild variant="outline" size="xs">
                            <Link to={`/players/${player.id}`} onClick={() => setSelectedTeam(null)}>
                              <span>Profile</span>
                              <ArrowRight className="size-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MATCH FIXTURES */}
            {selectedTeamTab === "fixtures" && (
              <div className="space-y-3 pt-1">
                {clubFixtures.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-6 text-center">
                    No scheduled marquee fixtures recorded for this club.
                  </p>
                ) : (
                  <div className="divide-y divide-border border border-border rounded-lg bg-surface-elevated/40 overflow-hidden">
                    {clubFixtures.map((m) => (
                      <div
                        key={m.id}
                        className="p-3 flex items-center justify-between gap-2 sm:gap-4 hover:bg-surface-elevated/80 transition-colors"
                      >
                        <div className="text-left w-24 shrink-0">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block truncate">
                            {m.comp.split(" ")[0]}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-foreground">
                            {m.date.split(" • ")[1] || m.date}
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center gap-2">
                          <div className="flex items-center gap-1.5 justify-end flex-1 truncate text-right">
                            <span className="text-xs font-bold text-foreground truncate">
                              {m.home}
                            </span>
                            <img src={m.homeLogo} alt={m.home} className="size-4 object-contain shrink-0" />
                          </div>

                          <span className="px-2 py-0.5 rounded bg-card border border-border text-xs font-mono font-bold shrink-0">
                            {m.score}
                          </span>

                          <div className="flex items-center gap-1.5 justify-start flex-1 truncate text-left">
                            <img src={m.awayLogo} alt={m.away} className="size-4 object-contain shrink-0" />
                            <span className="text-xs font-bold text-foreground truncate">
                              {m.away}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default TeamsPage;
