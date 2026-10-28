import React, { useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  Trophy,
  Star,
  ChevronLeft,
  Calendar,
  Award,
  Milestone,
  Landmark,
  Flame,
  ExternalLink,
  ArrowRight,
  Activity,
  Shield,
} from "lucide-react";
import footballPlayersData from "../data/footballPlayers.json";

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
        <div className="p-10 rounded-xl border border-dashed border-border bg-card flex flex-col items-center gap-3">
          <Trophy className="w-12 h-12 text-muted-foreground/50 mb-1" />
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Player Profile Not Found
          </h2>
          <p className="text-xs text-muted-foreground max-w-md">
            The player identifier <code className="text-primary font-mono font-bold">"{id}"</code> does not exist in our historical archive.
          </p>
          <Link
            to="/players"
            className="mt-3 px-5 py-2 rounded-md bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 hover:bg-primary-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Career Archive</span>
          </Link>
        </div>
      </div>
    );
  }

  const isLegend = player.era === "legend";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* ---------- 1. TOP BREADCRUMB & ACTION BAR ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <Link
          to="/players"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card hover:bg-surface-elevated text-foreground text-xs font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5 ${
              isLegend
                ? "bg-surface-elevated border-border text-warning"
                : "bg-surface-elevated border-border text-primary"
            }`}
          >
            {isLegend ? <Landmark className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
            <span>{player.eraLabel}</span>
          </span>

          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-primary font-mono font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-primary" />
            <span>{player.rating.toFixed(2)} Icon Rating</span>
          </span>
        </div>
      </div>

      {/* ---------- 2. HERO CAREER SHOWCASE ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">
          {/* Large Player Portrait */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-surface-elevated border border-border flex items-center justify-center overflow-hidden shrink-0">
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
                <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-foreground font-mono font-bold text-xs uppercase">
                  {player.posCode || player.position} #{player.number}
                </span>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
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
                <span className="text-xs px-2 py-0.5 rounded bg-surface-elevated border border-border text-foreground">{player.currentClub}</span>
              </div>

              {/* Biography Quote */}
              <p className="mt-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-surface-elevated p-3.5 rounded-lg border border-border">
                "{player.bio}"
              </p>
            </div>

            {/* Quick Link to Prime Club */}
            <div className="mt-5 pt-3.5 border-t border-border flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to={`/teams?search=${encodeURIComponent(player.primeClub)}`}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold flex items-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-colors"
              >
                <span>View {player.primeClub} in Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- 3. CAREER TOTALS DASHBOARD STRIP ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-lg border border-border bg-card text-center">
          <span className="text-2xl sm:text-3xl font-black text-foreground block tracking-tight font-mono">
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
          <span className="text-2xl sm:text-3xl font-black text-foreground block tracking-tight font-mono">
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
          <span className="text-2xl sm:text-3xl font-black text-primary block tracking-tight font-mono">
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
          <span className="text-2xl sm:text-3xl font-black text-warning block tracking-tight font-mono">
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

      {/* ---------- 4. OFFICIAL TROPHY & HONORS ROOM ---------- */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-warning text-xs font-semibold uppercase mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Personal & Team Honors</span>
            </div>
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-primary text-xs font-semibold uppercase mb-1">
            <Milestone className="w-3.5 h-3.5" />
            <span>Club-By-Club Journey</span>
          </div>
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
              <div className="absolute -left-[27px] sm:-left-[31px] top-2 w-3 h-3 rounded-full bg-background border-2 border-primary" />

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

                <div className="flex items-center gap-3 text-xs font-semibold shrink-0 bg-card px-3 py-1.5 rounded-md border border-border">
                  <div>
                    <span className="text-[9px] uppercase text-muted-foreground block">Matches</span>
                    <span className="font-bold text-foreground font-mono">{step.apps}</span>
                  </div>
                  <div className="h-5 w-px bg-border" />
                  <div>
                    <span className="text-[9px] uppercase text-muted-foreground block">Goals</span>
                    <span className="font-bold text-primary font-mono">{step.goals}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 6. ATTRIBUTES & SIGNATURE MOMENT GRID ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* Tactical Attributes Radar */}
        {player.stats && (
          <div className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-primary text-xs font-semibold uppercase mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Attributes</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-foreground font-sans">
                Tactical Skill Ratings (1-100)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(player.stats).map(([stat, val]) => (
                <div
                  key={stat}
                  className="p-2.5 rounded-lg bg-surface-elevated border border-border flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="capitalize font-semibold text-muted-foreground">
                      {stat}
                    </span>
                    <span className="font-bold text-foreground font-mono">{val}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-card overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min(val, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signature Career Moment */}
        <div className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-warning text-xs font-semibold uppercase mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Career Masterpiece</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-foreground font-sans">
              Signature Career Moment
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal bg-surface-elevated p-3.5 rounded-lg border border-border">
              "{player.signatureMoment}"
            </p>
          </div>

          <div className="p-3 rounded-lg bg-surface-elevated border border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Historical Status</span>
            <span className="font-bold text-warning font-mono">
              All-Time Football Pantheon
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 7. RELATED LEGENDS & SUPERSTARS ---------- */}
      {relatedPlayers.length > 0 && (
        <div className="flex flex-col gap-3.5 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground font-sans">
                Explore More {player.position}s
              </h3>
              <p className="text-xs text-muted-foreground">
                Compare other stars from our historical archive.
              </p>
            </div>
            <Link
              to="/players"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Careers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {relatedPlayers.map((rel) => (
              <Link
                key={rel.id}
                to={`/players/${rel.id}`}
                className="group p-3 rounded-lg border border-border bg-card hover:border-primary transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-md bg-surface-elevated border border-border overflow-hidden shrink-0">
                  <img
                    src={rel.photo}
                    alt={rel.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="truncate">
                  <h5 className="font-bold text-foreground text-xs group-hover:text-primary transition-colors truncate">
                    {rel.name}
                  </h5>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {rel.flag} {rel.primeClub}
                  </p>
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
