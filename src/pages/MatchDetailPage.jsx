import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Shield,
  Activity,
  Users,
  Award,
  RefreshCw,
} from "lucide-react";
import { footballApi } from "../services/footballApi";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { EmptyState } from "../components/ui/empty-state";
import MatchPitch from "../components/MatchPitch";

export default function MatchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const loadMatchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await footballApi.getFixtureDetails(id);
      setMatch(data);
    } catch (err) {
      setError(err.message || "Failed to load match details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadMatchData();
    }
  }, [id, loadMatchData]);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-6 w-32 bg-surface-elevated rounded mb-6" />
        <div className="h-56 w-full bg-surface-elevated rounded-xl mb-6" />
        <div className="h-10 w-80 bg-surface-elevated rounded-lg mb-6" />
        <div className="h-64 w-full bg-surface-elevated rounded-xl" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <EmptyState
          icon={Shield}
          title="Match Details Unavailable"
          description={error || "We could not locate this match fixture in the official database."}
          action={
            <div className="flex items-center gap-3">
              <Button variant="default" size="sm" onClick={loadMatchData}>
                <RefreshCw className="size-3.5" />
                <span>Retry</span>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/fixtures">Browse Today's Fixtures</Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const { home, away, status, competition, venue, referee, localKickoff, nepalKickoff, formattedDate } = match;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      {/* ---------- 1. TOP NAV & BREADCRUMB ---------- */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Matches</span>
        </button>

        {match.isFallback && (
          <Badge variant="secondary" size="sm" className="font-mono text-[10px] text-muted-foreground">
            Archive Mode
          </Badge>
        )}
      </div>

      {/* ---------- 2. BIG MATCH SCOREBOARD HEADER ---------- */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
        {/* Competition Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-surface-elevated border-b border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {competition.logo ? (
              <img src={competition.logo} alt="" className="size-4 object-contain" />
            ) : (
              <span>🏆</span>
            )}
            <span className="font-bold text-foreground">
              {competition.name}
            </span>
            {competition.round && (
              <>
                <span className="text-border">•</span>
                <span className="text-muted-foreground">{competition.round}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <Calendar className="size-3 text-primary" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Teams & Scoreboard */}
        <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
          {/* Home Team */}
          <Link
            to={`/teams?search=${encodeURIComponent(home.name)}`}
            className="flex-1 flex flex-col items-center text-center group"
          >
            <div className="size-16 sm:size-20 p-2.5 rounded-xl bg-surface-elevated border border-border group-hover:border-primary transition-colors flex items-center justify-center mb-2">
              {home.logo ? (
                <img src={home.logo} alt={home.name} className="w-full h-full object-contain" />
              ) : (
                <Shield className="size-8 text-primary" />
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate max-w-[160px] sm:max-w-xs">
              {home.name}
            </h2>
            <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5">
              Home
            </span>
          </Link>

          {/* Score / Status Display */}
          <div className="flex flex-col items-center shrink-0 px-2 sm:px-6">
            {status.isLive ? (
              <div className="flex flex-col items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono font-black text-xs animate-pulse flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>LIVE {status.elapsed}'</span>
                </span>
                <div className="flex items-center gap-3 font-mono font-black text-3xl sm:text-4xl text-foreground">
                  <span>{home.score ?? 0}</span>
                  <span className="text-muted-foreground font-light text-2xl">-</span>
                  <span>{away.score ?? 0}</span>
                </div>
              </div>
            ) : status.isFinished ? (
              <div className="flex flex-col items-center gap-1.5">
                <Badge variant="secondary" size="sm" className="font-mono text-[11px] font-bold">
                  {status.label}
                </Badge>
                <div className="flex items-center gap-3 font-mono font-black text-3xl sm:text-4xl text-foreground">
                  <span>{home.score ?? 0}</span>
                  <span className="text-muted-foreground font-light text-2xl">-</span>
                  <span>{away.score ?? 0}</span>
                </div>
                {match.halftimeScore?.home !== null && (
                  <span className="text-[10px] font-mono text-muted-foreground">
                    HT: {match.halftimeScore.home} - {match.halftimeScore.away}
                  </span>
                )}
              </div>
            ) : status.isPostponed ? (
              <div className="flex flex-col items-center gap-1">
                <span className="px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs">
                  {status.label}
                </span>
                <span className="text-xs text-muted-foreground">Fixture rescheduled</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono font-black text-2xl sm:text-3xl text-foreground">
                  {localKickoff}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-primary" />
                  <span>Nepal: {nepalKickoff}</span>
                </span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <Link
            to={`/teams?search=${encodeURIComponent(away.name)}`}
            className="flex-1 flex flex-col items-center text-center group"
          >
            <div className="size-16 sm:size-20 p-2.5 rounded-xl bg-surface-elevated border border-border group-hover:border-primary transition-colors flex items-center justify-center mb-2">
              {away.logo ? (
                <img src={away.logo} alt={away.name} className="w-full h-full object-contain" />
              ) : (
                <Shield className="size-8 text-primary" />
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate max-w-[160px] sm:max-w-xs">
              {away.name}
            </h2>
            <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5">
              Away
            </span>
          </Link>
        </div>

        {/* Venue & Referee Meta Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-surface-base border-t border-border flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span>{venue.name}{venue.city ? `, ${venue.city}` : ""}</span>
          </div>

          {referee && (
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground">Referee:</span>
              <span>{referee}</span>
            </div>
          )}
        </div>
      </div>

      {/* ---------- 3. CONTENT TABS ---------- */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <Award className="size-3.5" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="events">
            <Activity className="size-3.5" />
            <span>Events ({match.events?.length || 0})</span>
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <Clock className="size-3.5" />
            <span>Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="lineups">
            <Users className="size-3.5" />
            <span>Lineups & Pitch</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* ---------- TAB 1: OVERVIEW ---------- */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Events Highlights */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Activity className="size-3.5 text-primary" />
              <span>Decisive Match Incidents</span>
            </span>

            {match.events && match.events.length > 0 ? (
              <div className="divide-y divide-border/60">
                {match.events.slice(0, 5).map((ev) => (
                  <div key={ev.id} className="py-2 text-xs flex items-center justify-between gap-3">
                    <span className="font-mono font-bold text-primary text-[11px] px-1.5 py-0.5 rounded bg-surface-elevated border border-border shrink-0">
                      {ev.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-foreground">
                        {ev.icon} {ev.player}
                      </span>
                      {ev.assist && (
                        <span className="text-[11px] text-muted-foreground ml-1">
                          (ast: {ev.assist})
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground truncate max-w-[100px]">
                      {ev.teamName}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4">
                No major match events registered yet.
              </p>
            )}
          </div>

          {/* Quick Stats Summary */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" />
              <span>Performance Snapshot</span>
            </span>

            {match.statistics && match.statistics.length > 0 ? (
              <div className="space-y-3 pt-1">
                {match.statistics.slice(0, 4).map((stat) => {
                  const hNum = parseFloat(stat.home) || 0;
                  const aNum = parseFloat(stat.away) || 0;
                  const total = hNum + aNum || 1;
                  const hWidth = Math.round((hNum / total) * 100);

                  return (
                    <div key={stat.label} className="text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                        <span>{stat.home}</span>
                        <span className="text-muted-foreground font-sans font-medium uppercase text-[10px]">
                          {stat.label}
                        </span>
                        <span>{stat.away}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-elevated flex overflow-hidden border border-border">
                        <div className="bg-primary h-full" style={{ width: `${hWidth}%` }} />
                        <div className="bg-muted-foreground/60 h-full" style={{ width: `${100 - hWidth}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4">
                Match performance statistics are not available for this fixture.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------- TAB 2: EVENTS TIMELINE ---------- */}
      {activeTab === "events" && (
        <div className="rounded-xl border border-border bg-card p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
            Chronological Match Events
          </span>

          {match.events && match.events.length > 0 ? (
            <div className="relative border-l border-border ml-4 pl-6 space-y-5">
              {match.events.map((ev) => {
                const isHome = ev.teamId === home.id;

                return (
                  <div key={ev.id} className="relative flex items-start justify-between gap-4">
                    {/* Minute Circle on Timeline */}
                    <div className="absolute -left-[31px] top-0 size-6 rounded-full bg-surface-elevated border border-border font-mono font-bold text-[10px] text-primary flex items-center justify-center">
                      {ev.time}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{ev.icon}</span>
                        <span className="font-bold text-foreground text-sm">
                          {ev.player}
                        </span>
                      </div>
                      {ev.assist && (
                        <p className="text-xs text-muted-foreground ml-6">
                          Assist: {ev.assist}
                        </p>
                      )}
                      {ev.detail && (
                        <p className="text-[11px] text-muted-foreground ml-6">
                          {ev.detail}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                      <span className="font-medium text-foreground">
                        {isHome ? home.name : away.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-6 text-center">
              No events recorded for this match.
            </p>
          )}
        </div>
      )}

      {/* ---------- TAB 3: COMPLETE MATCH STATISTICS ---------- */}
      {activeTab === "statistics" && (
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Dual-Club Comparative Statistics
            </span>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-primary flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span>{home.name}</span>
              </span>
              <span className="text-muted-foreground flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground" />
                <span>{away.name}</span>
              </span>
            </div>
          </div>

          {match.statistics && match.statistics.length > 0 ? (
            <div className="space-y-4">
              {match.statistics.map((stat) => {
                const hNum = parseFloat(stat.home) || 0;
                const aNum = parseFloat(stat.away) || 0;
                const total = hNum + aNum || 1;
                const hWidth = Math.round((hNum / total) * 100);

                return (
                  <div key={stat.label} className="text-xs flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span className="text-foreground text-sm">{stat.home}</span>
                      <span className="text-muted-foreground text-[11px] font-sans font-medium uppercase">
                        {stat.label}
                      </span>
                      <span className="text-foreground text-sm">{stat.away}</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-surface-elevated flex overflow-hidden border border-border">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${hWidth}%` }} />
                      <div className="bg-muted-foreground/60 h-full transition-all duration-300" style={{ width: `${100 - hWidth}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-8 text-center">
              Detailed statistics are not provided by the competition for this fixture.
            </p>
          )}
        </div>
      )}

      {/* ---------- TAB 4: LINEUPS & TACTICAL PITCH ---------- */}
      {activeTab === "lineups" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <MatchPitch
            homeLineup={match.lineups?.[0] || null}
            awayLineup={match.lineups?.[1] || null}
          />
        </div>
      )}
    </div>
  );
}
