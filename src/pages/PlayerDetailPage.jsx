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
  Sparkles,
  ArrowRight,
  Activity,
} from "lucide-react";
import footballPlayersData from "../../footballPlayers.json";

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
        <div className="p-12 rounded-3xl border border-dashed border-border bg-card/60 flex flex-col items-center gap-4">
          <Trophy className="w-16 h-16 text-muted-foreground/40 mb-2" />
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            Player Career Profile Not Found
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            The player identifier <code className="text-primary font-bold font-mono">"{id}"</code> does not exist in our historical archive.
          </p>
          <Link
            to="/players"
            className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10">
      {/* ---------- 1. TOP BREADCRUMB & ACTION BAR ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <Link
          to="/players"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border/80 bg-card hover:bg-accent text-foreground text-xs font-bold transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5 ${
              isLegend
                ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                : "bg-sky-500/15 border-sky-500/30 text-sky-400"
            }`}
          >
            {isLegend ? <Landmark className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
            <span>{player.eraLabel}</span>
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{player.rating.toFixed(2)} Icon Rating</span>
          </span>
        </div>
      </div>

      {/* ---------- 2. HERO CAREER SHOWCASE ---------- */}
      <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card/90 backdrop-blur-md p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10">
          {/* Large Player Portrait */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-b from-primary/15 via-background to-background border-2 border-border/80 flex items-center justify-center overflow-hidden shadow-2xl shrink-0">
            <span className="absolute bottom-2 right-3 text-6xl font-black text-foreground/5 select-none pointer-events-none">
              #{player.number}
            </span>
            <img
              src={player.photo}
              alt={player.name}
              className="w-full h-full object-cover object-top filter drop-shadow-lg"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden w-full h-full flex-col items-center justify-center text-primary font-black text-3xl">
              ⚽
            </div>
          </div>

          {/* Player Identity Details */}
          <div className="flex-1 text-center lg:text-left flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-muted text-foreground font-black text-xs uppercase tracking-wider">
                  {player.posCode || player.position} #{player.number}
                </span>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{player.careerSpan}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
                {player.fullName || player.name}
              </h1>

              <div className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-base">{player.flag}</span>
                <span className="font-semibold text-foreground">{player.nationality}</span>
                <span>•</span>
                <span>Prime: <strong className="text-primary">{player.primeClub}</strong></span>
                <span>•</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-muted/60">{player.currentClub}</span>
              </div>

              {/* Biography Quote */}
              <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-2xl border border-border/40">
                "{player.bio}"
              </p>
            </div>

            {/* Quick Link to Prime Club */}
            <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/teams"
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
              >
                <span>View {player.primeClub} in Club Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- 3. CAREER TOTALS DASHBOARD STRIP ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md text-center shadow-sm">
          <span className="text-3xl sm:text-4xl font-black text-foreground block tracking-tight">
            {player.careerGoals}
          </span>
          <span className="text-xs sm:text-sm font-black text-primary block mt-1 uppercase">
            Official Career Goals ⚽
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Across all competitive leagues
          </span>
        </div>

        <div className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md text-center shadow-sm">
          <span className="text-3xl sm:text-4xl font-black text-foreground block tracking-tight">
            {player.careerApps}
          </span>
          <span className="text-xs sm:text-sm font-black text-primary block mt-1 uppercase">
            Career Matches 🏟️
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Senior club appearances
          </span>
        </div>

        <div className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md text-center shadow-sm">
          <span className="text-3xl sm:text-4xl font-black text-primary block tracking-tight">
            {player.intlCaps}
          </span>
          <span className="text-xs sm:text-sm font-black text-foreground block mt-1 uppercase">
            National Caps ({player.intlGoals} Goals) 🌍
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Representing {player.nationality}
          </span>
        </div>

        <div className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md text-center shadow-sm">
          <span className="text-3xl sm:text-4xl font-black text-amber-500 block tracking-tight">
            {player.totalTrophies}
          </span>
          <span className="text-xs sm:text-sm font-black text-foreground block mt-1 uppercase">
            Silverware Won 🏆
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            Official team trophies
          </span>
        </div>
      </div>

      {/* ---------- 4. OFFICIAL TROPHY & HONORS ROOM ---------- */}
      <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-amber-500/5 p-6 sm:p-8 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Personal & Team Honors</span>
            </div>
            <h3 className="text-2xl font-black text-foreground">
              Trophy & Accolades Cabinet
            </h3>
          </div>
          <span className="text-xs font-bold text-muted-foreground hidden sm:block">
            Verified UEFA & FIFA Records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 text-center flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 block mb-1">
              {player.ballonDor} 🏆
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              Ballon d'Or
            </span>
            <span className="text-[11px] text-muted-foreground">
              {player.ballonDor > 0 ? "Global Best Player" : "Nominee"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 text-center flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-black text-foreground block mb-1">
              {player.worldCup} 🌍
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              FIFA World Cup
            </span>
            <span className="text-[11px] text-muted-foreground">
              {player.worldCup > 0 ? "World Champion" : "Contender"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 text-center flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-black text-primary block mb-1">
              {player.ucl} ⭐
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              UCL / Cont. Cups
            </span>
            <span className="text-[11px] text-muted-foreground">
              European / Continental Champion
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 text-center flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-black text-foreground block mb-1">
              {player.leagueTitles} 🥇
            </span>
            <span className="text-xs font-bold text-foreground uppercase">
              League Titles
            </span>
            <span className="text-[11px] text-muted-foreground">
              Domestic league triumphs
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 5. CHRONOLOGICAL CLUB TIMELINE JOURNEY ---------- */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl flex flex-col gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase mb-1">
            <Milestone className="w-3.5 h-3.5" />
            <span>Club-By-Club Journey</span>
          </div>
          <h3 className="text-2xl font-black text-foreground">
            Chronological Career Timeline
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every club, transfer spell, match statistics, and silverware achieved throughout their career.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
          {player.timeline?.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-4 border-primary group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl border border-border/80 bg-background/60 hover:bg-background/90 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-base sm:text-lg font-black text-foreground">
                      {step.club}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-bold text-muted-foreground">
                      {step.years}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Honors:</strong> {step.honors}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold shrink-0 bg-muted/30 px-3 py-2 rounded-xl border border-border/40">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Matches</span>
                    <span className="font-black text-foreground text-sm">{step.apps}</span>
                  </div>
                  <div className="h-6 w-px bg-border/80" />
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Goals</span>
                    <span className="font-black text-primary text-sm">{step.goals}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 6. ATTRIBUTES & SIGNATURE MOMENT GRID ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Tactical Attributes Radar */}
        {player.stats && (
          <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card flex flex-col justify-between gap-4 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Peak Prime Attributes</span>
              </div>
              <h3 className="text-xl font-black text-foreground">
                Tactical Skill Ratings (1-100)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(player.stats).map(([stat, val]) => (
                <div
                  key={stat}
                  className="p-3 rounded-xl bg-background border border-border/60 flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="capitalize font-bold text-muted-foreground">
                      {stat}
                    </span>
                    <span className="font-black text-foreground">{val}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400"
                      style={{ width: `${Math.min(val, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signature Career Moment */}
        <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/10 flex flex-col justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Career Defining Masterpiece</span>
            </div>
            <h3 className="text-xl font-black text-foreground">
              Iconic Signature Moment
            </h3>
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed font-medium">
              "{player.signatureMoment}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Historical Standing</span>
            <span className="font-black text-amber-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> All-Time Football Pantheon
            </span>
          </div>
        </div>
      </div>

      {/* ---------- 7. RELATED LEGENDS & SUPERSTARS ---------- */}
      {relatedPlayers.length > 0 && (
        <div className="flex flex-col gap-4 pt-6 border-t border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-foreground">
                More {player.position}s & Legends to Explore
              </h3>
              <p className="text-xs text-muted-foreground">
                Compare other icons from the same tactical era.
              </p>
            </div>
            <Link
              to="/players"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All 28 Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedPlayers.map((rel) => (
              <Link
                key={rel.id}
                to={`/players/${rel.id}`}
                className="group p-4 rounded-2xl border border-border/80 bg-card/80 hover:bg-card hover:border-primary/50 hover:shadow-lg transition-all flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border/60 overflow-hidden shrink-0">
                  <img
                    src={rel.photo}
                    alt={rel.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="truncate">
                  <h5 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                    {rel.name}
                  </h5>
                  <p className="text-xs text-muted-foreground truncate">
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
