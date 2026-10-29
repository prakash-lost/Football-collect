import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  RefreshCw,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { footballApi } from "../services/footballApi";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { EmptyState } from "../components/ui/empty-state";

export default function FixturesPage() {
  // 1. Date state (defaults to today YYYY-MM-DD)
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // 2. Data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState(null);

  // 3. Filter states
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "live", "upcoming", "finished"
  const [selectedLeagueId, setSelectedLeagueId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedLeagues, setCollapsedLeagues] = useState(new Set());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Load fixtures for selectedDate
  const loadFixtures = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const res = await footballApi.getFixtures({ date });
      setFixtures(res.fixtures);
      setIsFallback(res.isFallback);
      setFallbackReason(res.fallbackReason);
    } catch (err) {
      setError(err.message || "Failed to load football fixtures.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFixtures(selectedDate);
  }, [selectedDate]);

  // Optional background refresh for live games (60s)
  useEffect(() => {
    if (!autoRefresh || selectedDate !== todayStr) return;

    const interval = setInterval(() => {
      // Background silent refresh
      footballApi.getFixtures({ date: selectedDate }).then((res) => {
        setFixtures(res.fixtures);
      }).catch(() => {});
    }, 60000);

    return () => clearInterval(interval);
  }, [autoRefresh, selectedDate, todayStr]);

  // Date Navigation Handlers
  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const handleToday = () => {
    setSelectedDate(todayStr);
  };

  // Human readable date label
  const formattedDateLabel = useMemo(() => {
    const d = new Date(selectedDate);
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  }, [selectedDate]);

  // Filtered fixtures
  const filteredFixtures = useMemo(() => {
    return fixtures.filter((f) => {
      // Status filter
      if (statusFilter === "live" && !f.status.isLive) return false;
      if (statusFilter === "upcoming" && !f.status.isUpcoming) return false;
      if (statusFilter === "finished" && !f.status.isFinished) return false;

      // League filter
      if (selectedLeagueId !== "all" && String(f.competition?.id) !== String(selectedLeagueId)) {
        return false;
      }

      // Search query (club or league name)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const homeMatch = f.home.name.toLowerCase().includes(q);
        const awayMatch = f.away.name.toLowerCase().includes(q);
        const leagueMatch = f.competition.name.toLowerCase().includes(q);
        if (!homeMatch && !awayMatch && !leagueMatch) return false;
      }

      return true;
    });
  }, [fixtures, statusFilter, selectedLeagueId, searchQuery]);

  // Group by competition
  const groupedByCompetition = useMemo(() => {
    const map = new Map();
    filteredFixtures.forEach((f) => {
      const compId = f.competition.id || f.competition.name;
      if (!map.has(compId)) {
        map.set(compId, {
          competition: f.competition,
          matches: [],
        });
      }
      map.get(compId).matches.push(f);
    });
    return Array.from(map.values());
  }, [filteredFixtures]);

  // Competition tabs list for quick filter
  const competitionTabs = useMemo(() => {
    const set = new Map();
    fixtures.forEach((f) => {
      if (f.competition?.id) {
        set.set(f.competition.id, f.competition.name);
      }
    });
    return Array.from(set.entries()).map(([id, name]) => ({ id, name }));
  }, [fixtures]);

  // Live match count
  const liveCount = useMemo(() => {
    return fixtures.filter((f) => f.status.isLive).length;
  }, [fixtures]);

  const toggleLeagueCollapse = (compId) => {
    setCollapsedLeagues((prev) => {
      const next = new Set(prev);
      if (next.has(compId)) next.delete(compId);
      else next.add(compId);
      return next;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      {/* ---------- 1. HEADER & DATE CONTROLS ---------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-xs font-semibold text-foreground mb-2">
            <span className="size-2 rounded-full bg-primary" />
            <span>Official Fixture Desk & Live Scores</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Football Fixtures & Matchday Results
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Real kickoff times in local timezone & Nepal Standard Time (UTC+5:45).
          </p>
        </div>

        {/* Date Navigator Strip */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-elevated border border-border self-start md:self-auto">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handlePrevDay}
            aria-label="Previous day"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant={selectedDate === todayStr ? "default" : "outline"}
            size="sm"
            onClick={handleToday}
            className="text-xs font-bold"
          >
            Today
          </Button>

          {/* Date Picker Input */}
          <div className="relative flex items-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
              className="bg-card border border-border text-foreground text-xs font-mono font-bold px-2 py-1.5 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleNextDay}
            aria-label="Next day"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* ---------- 2. ACTIVE DATE BANNER & REFRESH ---------- */}
      <div className="flex items-center justify-between flex-wrap gap-3 py-2 px-4 rounded-lg bg-surface-base border border-border text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="size-3.5 text-primary" />
          <span className="font-bold text-foreground">{formattedDateLabel}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-mono">
            {fixtures.length} {fixtures.length === 1 ? "Fixture" : "Fixtures"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isFallback && (
            <span
              className="text-[11px] text-amber-400 font-medium"
              title={fallbackReason || "Operating in demo fallback"}
            >
              Demo/Archive Mode
            </span>
          )}

          <button
            type="button"
            onClick={() => setAutoRefresh((prev) => !prev)}
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
              autoRefresh
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-surface-elevated text-muted-foreground border-border"
            }`}
            title="Toggle 60s background live auto-refresh"
          >
            Auto-refresh: {autoRefresh ? "ON" : "OFF"}
          </button>

          <button
            type="button"
            onClick={() => loadFixtures(selectedDate)}
            className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3 text-primary" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ---------- 3. FILTERS BAR (STATUS + SEARCH + COMPETITION) ---------- */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-elevated/70 border border-border overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Matches" },
              { id: "live", label: `Live (${liveCount})`, isLive: true },
              { id: "upcoming", label: "Upcoming" },
              { id: "finished", label: "Finished (FT)" },
            ].map((f) => {
              const isSelected = statusFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-card text-foreground border border-border shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.isLive && liveCount > 0 && (
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-64">
            <Input
              size="sm"
              leftIcon={Search}
              placeholder="Search club or league..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Competition Quick Filters */}
        {competitionTabs.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedLeagueId("all")}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedLeagueId === "all"
                  ? "bg-primary text-primary-foreground border-primary font-bold"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
              }`}
            >
              All Competitions
            </button>

            {competitionTabs.map((c) => {
              const isSelected = String(selectedLeagueId) === String(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedLeagueId(c.id)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------- 4. FIXTURES LIST BY COMPETITION ---------- */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
              <div className="h-5 w-44 bg-surface-elevated rounded mb-4" />
              <div className="space-y-3">
                <div className="h-12 w-full bg-surface-elevated/60 rounded" />
                <div className="h-12 w-full bg-surface-elevated/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={Shield}
          title="Failed to Load Fixtures"
          description={error}
          action={
            <Button variant="default" size="sm" onClick={() => loadFixtures(selectedDate)}>
              <RefreshCw className="size-3.5" />
              <span>Retry Request</span>
            </Button>
          }
        />
      ) : groupedByCompetition.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Fixtures Found"
          description={`There are no football matches matching your criteria for ${formattedDateLabel}.`}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusFilter("all");
                setSelectedLeagueId("all");
                setSearchQuery("");
                setSelectedDate(todayStr);
              }}
            >
              Reset Date & Filters
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          {groupedByCompetition.map(({ competition, matches }) => {
            const compId = competition.id || competition.name;
            const isCollapsed = collapsedLeagues.has(compId);

            return (
              <div
                key={compId}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-xs"
              >
                {/* Competition Header (Clickable to Collapse) */}
                <div
                  onClick={() => toggleLeagueCollapse(compId)}
                  className="px-4 py-3 bg-surface-elevated/80 border-b border-border flex items-center justify-between cursor-pointer hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {competition.logo ? (
                      <img
                        src={competition.logo}
                        alt=""
                        className="size-5 object-contain"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <Trophy className="size-4 text-primary" />
                    )}
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-foreground">
                        {competition.name}
                      </span>
                      {competition.country && (
                        <span className="text-[11px] text-muted-foreground ml-2 font-normal hidden sm:inline">
                          ({competition.country})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-card border border-border">
                      {matches.length} {matches.length === 1 ? "match" : "matches"}
                    </span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        isCollapsed ? "-rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Match Rows List */}
                {!isCollapsed && (
                  <div className="divide-y divide-border/60">
                    {matches.map((m) => {
                      const isLive = m.status.isLive;
                      const isFinished = m.status.isFinished;
                      const isPostponed = m.status.isPostponed;

                      return (
                        <Link
                          key={m.id}
                          to={`/fixtures/${m.id}`}
                          className="px-3 sm:px-5 py-3 flex items-center justify-between gap-3 hover:bg-surface-elevated/40 transition-colors group text-left"
                        >
                          {/* 1. Time / Live Minute Column */}
                          <div className="w-16 sm:w-24 shrink-0 flex flex-col text-left">
                            {isLive ? (
                              <span className="text-primary font-mono font-black text-xs flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                <span>{m.status.label}</span>
                              </span>
                            ) : isFinished ? (
                              <span className="text-muted-foreground font-mono font-bold text-xs">
                                {m.status.label}
                              </span>
                            ) : isPostponed ? (
                              <span className="text-amber-400 font-mono font-bold text-xs">
                                Postponed
                              </span>
                            ) : (
                              <>
                                <span className="text-foreground font-mono font-bold text-xs">
                                  {m.localKickoff}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">
                                  {m.nepalKickoff}
                                </span>
                              </>
                            )}
                          </div>

                          {/* 2. Teams Matchup & Score (Centered Alignment) */}
                          <div className="flex-1 flex items-center justify-center max-w-xl mx-auto">
                            {/* Home Team */}
                            <div className="flex-1 flex items-center justify-end gap-2 text-right min-w-0">
                              <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                <span className="sm:hidden">{m.home.short}</span>
                                <span className="hidden sm:inline">{m.home.name}</span>
                              </span>
                              {m.home.logo ? (
                                <img
                                  src={m.home.logo}
                                  alt=""
                                  className="size-5 sm:size-6 object-contain shrink-0"
                                  loading="lazy"
                                  onError={(e) => { e.target.style.display = "none"; }}
                                />
                              ) : (
                                <Shield className="size-5 text-primary shrink-0" />
                              )}
                            </div>

                            {/* Score or VS Box */}
                            <div className="w-14 sm:w-20 text-center shrink-0 px-1">
                              {isFinished || isLive ? (
                                <div
                                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded border font-mono font-black text-xs sm:text-sm ${
                                    isLive
                                      ? "bg-primary/10 text-primary border-primary/30"
                                      : "bg-surface-elevated text-foreground border-border"
                                  }`}
                                >
                                  <span>{m.home.score ?? 0}</span>
                                  <span className="mx-1 text-muted-foreground">-</span>
                                  <span>{m.away.score ?? 0}</span>
                                </div>
                              ) : isPostponed ? (
                                <span className="text-[11px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-surface-elevated border border-border">
                                  P - P
                                </span>
                              ) : (
                                <span className="text-xs font-mono font-bold text-muted-foreground px-2 py-0.5 rounded bg-surface-elevated border border-border">
                                  VS
                                </span>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="flex-1 flex items-center justify-start gap-2 text-left min-w-0">
                              {m.away.logo ? (
                                <img
                                  src={m.away.logo}
                                  alt=""
                                  className="size-5 sm:size-6 object-contain shrink-0"
                                  loading="lazy"
                                  onError={(e) => { e.target.style.display = "none"; }}
                                />
                              ) : (
                                <Shield className="size-5 text-primary shrink-0" />
                              )}
                              <span className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                <span className="sm:hidden">{m.away.short}</span>
                                <span className="hidden sm:inline">{m.away.name}</span>
                              </span>
                            </div>
                          </div>

                          {/* 3. Venue & Action */}
                          <div className="hidden lg:flex flex-col text-right w-36 shrink-0 text-xs">
                            <span className="text-muted-foreground text-[11px] truncate">
                              {m.venue.name}
                            </span>
                          </div>

                          <div className="p-1 text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                            <ChevronRight className="size-4" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
