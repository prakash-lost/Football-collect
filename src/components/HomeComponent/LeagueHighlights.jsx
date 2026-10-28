import React, { useState } from "react";
import { Link } from "react-router";
import { Trophy, ArrowRight, Award, Target, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";

const leagues = [
  {
    id: "premier-league",
    name: "Premier League",
    shortName: "EPL",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    marketValue: "€11.8B",
    avgGoals: 3.24,
    defendingChampion: {
      name: "Manchester City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      titles: "10 Titles",
    },
    topScorer: {
      name: "Erling Haaland",
      club: "Man City",
      stat: "24 Goals",
    },
    standings: [
      {
        pos: 1,
        club: "Liverpool",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        mp: 26,
        gd: "+36",
        pts: 61,
        form: ["W", "W", "W", "D", "W"],
      },
      {
        pos: 2,
        club: "Arsenal",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        mp: 26,
        gd: "+31",
        pts: 57,
        form: ["W", "D", "W", "W", "W"],
      },
      {
        pos: 3,
        club: "Manchester City",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        mp: 26,
        gd: "+28",
        pts: 53,
        form: ["L", "W", "D", "W", "W"],
      },
      {
        pos: 4,
        club: "Chelsea",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
        mp: 26,
        gd: "+19",
        pts: 49,
        form: ["W", "W", "D", "L", "W"],
      },
      {
        pos: 5,
        club: "Aston Villa",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg",
        mp: 26,
        gd: "+11",
        pts: 46,
        form: ["D", "W", "W", "L", "D"],
      },
    ],
  },
  {
    id: "la-liga",
    name: "La Liga",
    shortName: "ESP",
    flag: "🇪🇸",
    marketValue: "€5.4B",
    avgGoals: 2.85,
    defendingChampion: {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      titles: "36 Titles",
    },
    topScorer: {
      name: "Robert Lewandowski",
      club: "Barcelona",
      stat: "22 Goals",
    },
    standings: [
      {
        pos: 1,
        club: "FC Barcelona",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
        mp: 25,
        gd: "+42",
        pts: 57,
        form: ["W", "W", "W", "W", "D"],
      },
      {
        pos: 2,
        club: "Real Madrid",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        mp: 25,
        gd: "+32",
        pts: 56,
        form: ["W", "D", "W", "W", "W"],
      },
      {
        pos: 3,
        club: "Atlético Madrid",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
        mp: 25,
        gd: "+24",
        pts: 53,
        form: ["W", "W", "D", "W", "D"],
      },
      {
        pos: 4,
        club: "Athletic Club",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg",
        mp: 25,
        gd: "+16",
        pts: 45,
        form: ["D", "W", "W", "D", "W"],
      },
      {
        pos: 5,
        club: "Villarreal",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg",
        mp: 25,
        gd: "+9",
        pts: 41,
        form: ["L", "W", "W", "L", "W"],
      },
    ],
  },
  {
    id: "serie-a",
    name: "Serie A",
    shortName: "ITA",
    flag: "🇮🇹",
    marketValue: "€4.9B",
    avgGoals: 2.76,
    defendingChampion: {
      name: "Inter Milan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
      titles: "20 Titles",
    },
    topScorer: {
      name: "Lautaro Martínez",
      club: "Inter Milan",
      stat: "19 Goals",
    },
    standings: [
      {
        pos: 1,
        club: "Inter Milan",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
        mp: 25,
        gd: "+38",
        pts: 58,
        form: ["W", "W", "W", "D", "W"],
      },
      {
        pos: 2,
        club: "Napoli",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/SSC_Napoli_2024_%28deep_navy_blue%29.svg",
        mp: 25,
        gd: "+26",
        pts: 56,
        form: ["W", "D", "W", "W", "W"],
      },
      {
        pos: 3,
        club: "Atalanta",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/66/Atalanta_BC_logo.svg",
        mp: 25,
        gd: "+31",
        pts: 51,
        form: ["W", "W", "W", "L", "W"],
      },
      {
        pos: 4,
        club: "Juventus",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
        mp: 25,
        gd: "+22",
        pts: 49,
        form: ["D", "W", "D", "W", "D"],
      },
      {
        pos: 5,
        club: "Lazio",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
        mp: 25,
        gd: "+15",
        pts: 46,
        form: ["L", "W", "W", "D", "W"],
      },
    ],
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    shortName: "GER",
    flag: "🇩🇪",
    marketValue: "€4.3B",
    avgGoals: 3.32,
    defendingChampion: {
      name: "Bayer Leverkusen",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
      titles: "1 Title",
    },
    topScorer: {
      name: "Harry Kane",
      club: "Bayern Munich",
      stat: "25 Goals",
    },
    standings: [
      {
        pos: 1,
        club: "Bayern Munich",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
        mp: 23,
        gd: "+39",
        pts: 55,
        form: ["W", "W", "W", "W", "W"],
      },
      {
        pos: 2,
        club: "Bayer Leverkusen",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
        mp: 23,
        gd: "+25",
        pts: 47,
        form: ["D", "W", "W", "D", "W"],
      },
      {
        pos: 3,
        club: "RB Leipzig",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2020_logo.svg",
        mp: 23,
        gd: "+18",
        pts: 42,
        form: ["W", "L", "W", "W", "D"],
      },
      {
        pos: 4,
        club: "Frankfurt",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg",
        mp: 23,
        gd: "+14",
        pts: 41,
        form: ["L", "W", "W", "L", "W"],
      },
      {
        pos: 5,
        club: "Borussia Dortmund",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
        mp: 23,
        gd: "+12",
        pts: 38,
        form: ["W", "D", "L", "W", "W"],
      },
    ],
  },
];

const LeagueHighlights = () => {
  const [activeLeagueId, setActiveLeagueId] = useState("premier-league");

  const currentLeague =
    leagues.find((l) => l.id === activeLeagueId) || leagues[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ---------- HEADER WITH TABS ---------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <Badge variant="secondary" size="default" className="mb-1.5">
            <Trophy className="size-3.5 text-primary" />
            <span>Table Standings & Form</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            European League Highlights
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Current season standings, title holders, and top goalscorers.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setActiveLeagueId(league.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeLeagueId === league.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-elevated text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <span>{league.flag}</span>
              <span>{league.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- CONTENT GRID (STANDINGS + INTELLIGENCE) ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT: STANDINGS TABLE (8 Cols) ================= */}
        <div className="lg:col-span-8 rounded-lg border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-surface-elevated/40">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <span>{currentLeague.flag}</span>
              <span>{currentLeague.name} — Top 5 Standings</span>
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              Matchday {currentLeague.standings[0]?.mp}
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center font-bold">#</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead className="text-center w-12">MP</TableHead>
                  <TableHead className="text-center w-14">GD</TableHead>
                  <TableHead className="text-center w-14 font-bold text-foreground">
                    PTS
                  </TableHead>
                  <TableHead className="text-right w-28 hidden sm:table-cell">Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLeague.standings.map((row) => (
                  <TableRow key={row.club}>
                    {/* Position */}
                    <TableCell className="text-center font-mono font-bold text-xs">
                      <span
                        className={`inline-flex items-center justify-center size-5 rounded text-[10px] ${
                          row.pos === 1
                            ? "bg-primary text-primary-foreground font-extrabold"
                            : row.pos <= 4
                            ? "bg-surface-elevated text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {row.pos}
                      </span>
                    </TableCell>

                    {/* Club */}
                    <TableCell>
                      <Link
                        to={`/teams?search=${encodeURIComponent(row.club)}`}
                        className="flex items-center gap-2.5 font-bold text-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                      >
                        <img
                          src={row.logo}
                          alt={row.club}
                          className="size-5 object-contain shrink-0"
                        />
                        <span className="truncate">{row.club}</span>
                      </Link>
                    </TableCell>

                    {/* Matches Played */}
                    <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground">
                      {row.mp}
                    </TableCell>

                    {/* Goal Difference */}
                    <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground">
                      {row.gd}
                    </TableCell>

                    {/* Points */}
                    <TableCell className="text-center font-mono tabular-nums font-black text-sm text-foreground">
                      {row.pts}
                    </TableCell>

                    {/* Form pills */}
                    <TableCell className="text-right hidden sm:table-cell">
                      <div className="flex items-center justify-end gap-1">
                        {row.form.map((res, i) => (
                          <span
                            key={i}
                            className={`size-4 rounded-[3px] text-[9px] font-mono font-bold flex items-center justify-center ${
                              res === "W"
                                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                                : res === "D"
                                ? "bg-amber-600/20 text-amber-400 border border-amber-500/30"
                                : "bg-red-600/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-2.5 border-t border-border bg-surface-base flex items-center justify-between text-xs">
            <span className="text-[11px] text-muted-foreground">
              Positions 1–4 qualify for UEFA Champions League group stage.
            </span>
            <Link
              to="/leagues"
              className="font-bold text-primary hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <span>Full League Table</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* ================= RIGHT: LEAGUE INTELLIGENCE (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Card 1: Defending Champion */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <Award className="size-3.5 text-primary" />
              <span>Reigning Champion</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-11 rounded-md bg-surface-elevated border border-border p-1.5 flex items-center justify-center shrink-0">
                <img
                  src={currentLeague.defendingChampion.logo}
                  alt={currentLeague.defendingChampion.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-foreground">
                  {currentLeague.defendingChampion.name}
                </h4>
                <p className="text-xs text-primary font-mono font-semibold">
                  {currentLeague.defendingChampion.titles}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Golden Boot Leader */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <Target className="size-3.5 text-primary" />
              <span>Golden Boot Leader</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">
                  {currentLeague.topScorer.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLeague.topScorer.club}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-primary font-mono font-bold text-xs">
                {currentLeague.topScorer.stat}
              </span>
            </div>
          </div>

          {/* Card 3: Key Season Metric */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <TrendingUp className="size-3.5 text-primary" />
              <span>Division Metrics</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="rounded bg-surface-elevated p-2 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                  Avg Goals / Game
                </span>
                <span className="font-mono text-base font-bold text-foreground">
                  {currentLeague.avgGoals}
                </span>
              </div>
              <div className="rounded bg-surface-elevated p-2 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                  Squad Value
                </span>
                <span className="font-mono text-base font-bold text-primary">
                  {currentLeague.marketValue}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link to="/leagues" className="flex items-center justify-center gap-1.5">
              <span>View All 12 League Databases</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeagueHighlights;

