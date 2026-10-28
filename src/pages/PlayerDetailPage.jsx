import React, { useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  Trophy,
  Star,
  ChevronLeft,
  Calendar,
  Milestone,
  Landmark,
  Flame,
  ExternalLink,
  ArrowRight,
  Shield,
} from "lucide-react";
import footballPlayersData from "../data/footballPlayers.json";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { EmptyState } from "../components/ui/empty-state";

const PlayerDetailPage = () => {
  const { id } = useParams();

  // Find player by unique id (case-insensitive fallback)
  const player = useMemo(() => {
    const list = footballPlayersData?.players || [];
    return (
      list.find((p) => p.id === id) ||
      list.find((p) => p.id.toLowerCase() === id?.toLowerCase()) ||
      null
    );
  }, [id]);

  // Related players from the same position or era (excluding current player)
  const relatedPlayers = useMemo(() => {
    if (!player) return [];
    const list = footballPlayersData?.players || [];
    return list
      .filter((p) => p.id !== player.id && (p.position === player.position || p.era === player.era))
      .slice(0, 4);
  }, [player]);

  if (!player) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center">
        <EmptyState
          icon={Trophy}
          title="Player Profile Not Found"
          description={`The player identifier "${id}" does not exist in our historical archive.`}
          action={
            <Button asChild variant="default" size="sm">
              <Link to="/players" className="inline-flex items-center gap-2">
                <ChevronLeft className="size-4" />
                <span>Return to Career Archive</span>
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const isLegend = player.era === "legend";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ---------- 1. TOP BREADCRUMB & ACTION BAR ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <Button asChild variant="outline" size="sm">
          <Link to="/players" className="inline-flex items-center gap-1.5">
            <ChevronLeft className="size-4" />
            <span>Back to All Careers</span>
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Badge
            variant={isLegend ? "warning" : "default"}
            size="default"
          >
            {isLegend ? <Landmark className="size-3.5" /> : <Flame className="size-3.5" />}
            <span>{player.eraLabel}</span>
          </Badge>

          <Badge variant="secondary" size="default" className="font-mono font-bold text-primary">
            <Star className="size-3.5 fill-primary" />
            <span>{player.rating.toFixed(2)} Icon Rating</span>
          </Badge>
        </div>
      </div>

      {/* ---------- 2. HERO CAREER SHOWCASE ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
          {/* Large Player Portrait */}
          <div className="relative size-40 sm:size-48 rounded-xl bg-surface-elevated border border-border flex items-center justify-center overflow-hidden shrink-0">
            <span className="absolute bottom-1 right-2 text-4xl font-black text-foreground/5 select-none pointer-events-none font-mono">
              #{player.number}
            </span>
            <img
              src={player.photo}
              alt={player.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden w-full h-full flex-col items-center justify-center text-primary font-black text-2xl">
              ⚽
            </div>
          </div>

          {/* Player Identity Details */}
          <div className="flex-1 text-center lg:text-left flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                <Badge variant="secondary" size="sm" className="font-mono uppercase font-bold">
                  {player.posCode || player.position} #{player.number}
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-primary" />
                  <span>{player.careerSpan}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
                {player.fullName || player.name}
              </h1>

              <div className="mt-2 text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-base">{player.flag}</span>
                <span className="font-semibold text-foreground">{player.nationality}</span>
                <span className="text-border">•</span>
                <span>Prime: <strong className="text-primary">{player.primeClub}</strong></span>
                <span className="text-border">•</span>
                <Badge variant="secondary" size="sm">
                  {player.currentClub}
                </Badge>
              </div>

              {/* Biography Quote */}
              <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-surface-elevated p-3.5 rounded-lg border border-border">
                "{player.bio}"
              </p>
            </div>

            {/* Quick Link to Prime Club */}
            <div className="mt-5 pt-3.5 border-t border-border flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Button asChild variant="default" size="sm">
                <Link
                  to={`/teams?search=${encodeURIComponent(player.primeClub)}`}
                  className="inline-flex items-center gap-2"
                >
                  <span>View {player.primeClub} in Directory</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- 3. CAREER TOTALS DASHBOARD STRIP ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center">
          <span className="text-2xl sm:text-3xl font-black text-foreground block tracking-tight font-mono tabular-nums">
            {player.careerGoals}
          </span>
          <span className="text-xs font-bold text-primary block mt-1 uppercase">
            Official Goals ⚽
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Competitive senior goals
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center">
          <span className="text-2xl sm:text-3xl font-black text-foreground block tracking-tight font-mono tabular-nums">
            {player.careerApps}
          </span>
          <span className="text-xs font-bold text-primary block mt-1 uppercase">
            Career Matches 🏟️
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Senior club appearances
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center">
          <span className="text-2xl sm:text-3xl font-black text-primary block tracking-tight font-mono tabular-nums">
            {player.intlCaps}
          </span>
          <span className="text-xs font-bold text-foreground block mt-1 uppercase">
            Caps ({player.intlGoals} Goals) 🌍
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Representing {player.nationality}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center">
          <span className="text-2xl sm:text-3xl font-black text-warning block tracking-tight font-mono tabular-nums">
            {player.totalTrophies}
          </span>
          <span className="text-xs font-bold text-foreground block mt-1 uppercase">
            Silverware Won 🏆
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Official team titles
          </span>
        </div>
      </div>

      {/* ---------- 3B. TECHNICAL ATTRIBUTES & PERFORMANCE STATS ---------- */}
      {player.stats && (
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="default" size="sm">
                  Technical Matrix
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">
                  FIFA / UEFA Normalized (0–100)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-foreground font-sans mt-1">
                Core Competency & Skill Ratings
              </h3>
            </div>
            <span className="text-xs font-mono text-primary font-bold">
              Peak Prime Ability
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {[
              { key: "pace", label: "Pace & Acceleration", val: player.stats.pace, desc: "Sprint speed & off-the-mark burst" },
              { key: "shooting", label: "Finishing & Power", val: player.stats.shooting, desc: "Shot conversion & clinical ball striking" },
              { key: "passing", label: "Passing & Vision", val: player.stats.passing, desc: "Through balls, crossing & distribution" },
              { key: "dribbling", label: "Dribbling & Agility", val: player.stats.dribbling, desc: "Tight-space control & carrying under pressure" },
              { key: "defending", label: "Defensive Awareness", val: player.stats.defending, desc: "Tackling, interception & pressing work rate" },
              { key: "physical", label: "Physicality & Stamina", val: player.stats.physical, desc: "Strength, aerial duel success & endurance" },
            ].map((stat) => {
              const isElite = stat.val >= 85;
              return (
                <div
                  key={stat.key}
                  className="p-3.5 rounded-lg bg-surface-elevated border border-border flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      {stat.label}
                    </span>
                    <span
                      className={`text-sm font-mono font-black tabular-nums ${
                        isElite ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {stat.val}
                    </span>
                  </div>

                  {/* Progress Meter Bar */}
                  <div className="w-full h-2 rounded-full bg-card border border-border overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isElite ? "bg-primary" : "bg-muted-foreground"
                      }`}
                      style={{ width: `${stat.val}%` }}
                    />
                  </div>

                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {stat.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- 4. OFFICIAL TROPHY & HONORS ROOM ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="warning" size="default" className="mb-1">
              <Trophy className="size-3.5" />
              <span>Personal & Team Honors</span>
            </Badge>
            <h3 className="text-lg sm:text-xl font-black text-foreground font-sans">
              Trophy & Accolades Cabinet
            </h3>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Verified UEFA & FIFA Records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border text-center flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-warning block mb-0.5 font-mono">
              {player.ballonDor} 🏆
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              Ballon d'Or
            </span>
            <span className="text-[10px] text-muted-foreground">
              {player.ballonDor > 0 ? "Global Best Player" : "Nominee"}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border text-center flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-foreground block mb-0.5 font-mono">
              {player.worldCup} 🌍
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              World Cup
            </span>
            <span className="text-[10px] text-muted-foreground">
              {player.worldCup > 0 ? "World Champion" : "Contender"}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border text-center flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-primary block mb-0.5 font-mono">
              {player.ucl} ⭐
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              UCL Titles
            </span>
            <span className="text-[10px] text-muted-foreground">
              European Champion
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-elevated border border-border text-center flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-foreground block mb-0.5 font-mono">
              {player.leagueTitles} 🥇
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              League Titles
            </span>
            <span className="text-[10px] text-muted-foreground">
              Domestic triumphs
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 5. CHRONOLOGICAL CLUB TIMELINE JOURNEY ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
        <div>
          <Badge variant="default" size="default" className="mb-1">
            <Milestone className="size-3.5" />
            <span>Club-By-Club Journey</span>
          </Badge>
          <h3 className="text-lg sm:text-xl font-black text-foreground font-sans">
            Chronological Career Timeline
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every club, transfer spell, match statistics, and silverware achieved throughout their career.
          </p>
        </div>

        <div className="relative border-l border-border ml-3 sm:ml-4 pl-5 sm:pl-6 space-y-4">
          {player.timeline?.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-2 size-3 rounded-full bg-background border-2 border-primary" />

              <div className="p-4 rounded-lg border border-border bg-surface-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-sm sm:text-base font-bold text-foreground">
                      {step.club}
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-card border border-border text-[10px] font-mono font-semibold text-muted-foreground">
                      {step.years}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Honors:</strong> {step.honors}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-primary block">
                      {step.goals} Goals
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      in {step.apps} matches
                    </span>
                  </div>

                  <div className="p-2 rounded bg-card border border-border text-xs font-bold text-foreground">
                    ⚽
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 6. RELATED FOOTBALLERS ROW ---------- */}
      {relatedPlayers.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-foreground font-sans">
                Similar Stars in Archive
              </h3>
              <p className="text-xs text-muted-foreground">
                Footballers sharing the {player.position} position or {player.eraLabel} heritage.
              </p>
            </div>
            <Link
              to="/players"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedPlayers.map((rel) => (
              <Link
                key={rel.id}
                to={`/players/${rel.id}`}
                className="group p-4 rounded-lg border border-border bg-card hover:border-primary transition-colors flex items-center gap-3.5"
              >
                <div className="size-12 rounded-md bg-surface-elevated border border-border flex items-center justify-center overflow-hidden shrink-0">
                  {rel.photo ? (
                    <img
                      src={rel.photo}
                      alt={rel.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <Shield className="size-4 text-primary" />
                  )}
                </div>
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {rel.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {rel.primeClub} • {rel.position}
                  </p>
                  <span className="text-[10px] font-mono text-warning font-bold flex items-center gap-1 mt-0.5">
                    <Star className="size-2.5 fill-warning" /> {rel.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetailPage;
