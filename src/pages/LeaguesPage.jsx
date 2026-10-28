import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Trophy,
  Search,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

// Official top leagues & continental competitions data
const leagueData = [
  {
    id: "premier-league",
    name: "Premier League",
    shortName: "EPL",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    type: "domestic",
    logo: "https://assets.football-logos.cc/logos/england/512x512/english-premier-league.b597f797.png",
    founded: 1992,
    teamsCount: 20,
    matchesPerSeason: 380,
    marketValue: "€11.8B",
    avgGoals: 3.24,
    defendingChampion: {
      name: "Manchester City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      titles: 10,
    },
    topScorer: "Erling Haaland (Man City)",
    coefficientRank: "#1 UEFA",
    description:
      "The most watched football league in the world, renowned for intense physical pace, competitive parity, and tactical mastery.",
    standings: [
      { pos: 1, club: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", p: 26, w: 19, d: 4, l: 3, gd: "+36", pts: 61, form: ["W", "W", "W", "D", "W"] },
      { pos: 2, club: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", p: 26, w: 17, d: 6, l: 3, gd: "+31", pts: 57, form: ["W", "D", "W", "W", "W"] },
      { pos: 3, club: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", p: 26, w: 16, d: 5, l: 5, gd: "+28", pts: 53, form: ["L", "W", "D", "W", "W"] },
      { pos: 4, club: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", p: 26, w: 14, d: 7, l: 5, gd: "+19", pts: 49, form: ["W", "W", "D", "L", "W"] },
      { pos: 5, club: "Aston Villa", logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg", p: 26, w: 13, d: 7, l: 6, gd: "+11", pts: 46, form: ["D", "W", "W", "L", "D"] },
      { pos: 6, club: "Newcastle United", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg", p: 26, w: 12, d: 5, l: 9, gd: "+8", pts: 41, form: ["W", "L", "W", "W", "L"] },
      { pos: 7, club: "Brighton", logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg", p: 26, w: 10, d: 8, l: 8, gd: "+4", pts: 38, form: ["D", "D", "L", "W", "D"] },
      { pos: 8, club: "Tottenham Hotspur", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg", p: 26, w: 11, d: 3, l: 12, gd: "+5", pts: 36, form: ["L", "W", "L", "W", "L"] },
    ],
  },
  {
    id: "la-liga",
    name: "La Liga",
    shortName: "ESP",
    country: "Spain",
    flag: "🇪🇸",
    type: "domestic",
    logo: "https://logos-world.net/wp-content/uploads/2023/07/LaLiga-Logo.png",
    founded: 1929,
    teamsCount: 20,
    matchesPerSeason: 380,
    marketValue: "€5.4B",
    avgGoals: 2.85,
    defendingChampion: {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      titles: 36,
    },
    topScorer: "Robert Lewandowski / Mbappé",
    coefficientRank: "#2 UEFA",
    description:
      "Home to El Clásico and a heritage of technical excellence, artistic dribbling, and European club dominance.",
    standings: [
      { pos: 1, club: "FC Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg", p: 25, w: 18, d: 3, l: 4, gd: "+42", pts: 57, form: ["W", "W", "W", "W", "D"] },
      { pos: 2, club: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", p: 25, w: 17, d: 5, l: 3, gd: "+32", pts: 56, form: ["W", "D", "W", "W", "W"] },
      { pos: 3, club: "Atlético Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg", p: 25, w: 15, d: 8, l: 2, gd: "+24", pts: 53, form: ["W", "W", "D", "W", "D"] },
      { pos: 4, club: "Athletic Club", logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg", p: 25, w: 13, d: 6, l: 6, gd: "+16", pts: 45, form: ["D", "W", "W", "D", "W"] },
      { pos: 5, club: "Villarreal", logo: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg", p: 25, w: 12, d: 5, l: 8, gd: "+9", pts: 41, form: ["L", "W", "W", "L", "W"] },
      { pos: 6, club: "Real Sociedad", logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg", p: 25, w: 10, d: 5, l: 10, gd: "+2", pts: 35, form: ["W", "L", "D", "W", "L"] },
    ],
  },
  {
    id: "serie-a",
    name: "Serie A",
    shortName: "ITA",
    country: "Italy",
    flag: "🇮🇹",
    type: "domestic",
    logo: "https://logos-world.net/wp-content/uploads/2025/07/Italian-Serie-A-Logo-500x281.png",
    founded: 1898,
    teamsCount: 20,
    matchesPerSeason: 380,
    marketValue: "€4.9B",
    avgGoals: 2.76,
    defendingChampion: {
      name: "Inter Milan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
      titles: 20,
    },
    topScorer: "Lautaro Martínez (Inter)",
    coefficientRank: "#3 UEFA",
    description:
      "The pinnacle of Italian tactical discipline, defensive craft, passionate ultras, and historic European powerhouses.",
    standings: [
      { pos: 1, club: "Inter Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg", p: 25, w: 18, d: 4, l: 3, gd: "+38", pts: 58, form: ["W", "W", "W", "D", "W"] },
      { pos: 2, club: "Napoli", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/SSC_Napoli_2024_%28deep_navy_blue%29.svg", p: 25, w: 17, d: 5, l: 3, gd: "+26", pts: 56, form: ["W", "D", "W", "W", "W"] },
      { pos: 3, club: "Atalanta", logo: "https://upload.wikimedia.org/wikipedia/en/6/66/Atalanta_BC_logo.svg", p: 25, w: 16, d: 3, l: 6, gd: "+31", pts: 51, form: ["W", "W", "W", "L", "W"] },
      { pos: 4, club: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg", p: 25, w: 12, d: 13, l: 0, gd: "+22", pts: 49, form: ["D", "W", "D", "W", "D"] },
      { pos: 5, club: "Lazio", logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg", p: 25, w: 14, d: 4, l: 7, gd: "+15", pts: 46, form: ["L", "W", "W", "D", "W"] },
      { pos: 6, club: "AC Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg", p: 25, w: 12, d: 6, l: 7, gd: "+11", pts: 42, form: ["W", "L", "D", "W", "W"] },
    ],
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    shortName: "GER",
    country: "Germany",
    flag: "🇩🇪",
    type: "domestic",
    logo: "https://logos-world.net/wp-content/uploads/2025/04/Bundesliga-Logo-500x281.png",
    founded: 1963,
    teamsCount: 18,
    matchesPerSeason: 306,
    marketValue: "€4.3B",
    avgGoals: 3.32,
    defendingChampion: {
      name: "Bayer Leverkusen",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg",
      titles: 1,
    },
    topScorer: "Harry Kane (Bayern Munich)",
    coefficientRank: "#4 UEFA",
    description:
      "Famed for electric stadium atmospheres, the 50+1 rule, explosive counter-attacking football, and the highest goals-per-game in Europe.",
    standings: [
      { pos: 1, club: "Bayern Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg", p: 23, w: 18, d: 4, l: 1, gd: "+46", pts: 58, form: ["W", "W", "W", "D", "W"] },
      { pos: 2, club: "Bayer Leverkusen", logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg", p: 23, w: 14, d: 8, l: 1, gd: "+29", pts: 50, form: ["D", "W", "W", "W", "D"] },
      { pos: 3, club: "Eintracht Frankfurt", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg", p: 23, w: 13, d: 5, l: 5, gd: "+17", pts: 44, form: ["W", "W", "L", "W", "D"] },
      { pos: 4, club: "RB Leipzig", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2020_logo.svg", p: 23, w: 12, d: 6, l: 5, gd: "+15", pts: 42, form: ["L", "D", "W", "W", "W"] },
      { pos: 5, club: "Borussia Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg", p: 23, w: 11, d: 4, l: 8, gd: "+10", pts: 37, form: ["W", "L", "L", "W", "W"] },
      { pos: 6, club: "SC Freiburg", logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/SC_Freiburg_logo.svg", p: 23, w: 10, d: 6, l: 7, gd: "+4", pts: 36, form: ["D", "W", "D", "L", "W"] },
    ],
  },
  {
    id: "ligue-1",
    name: "Ligue 1",
    shortName: "FRA",
    country: "France",
    flag: "🇫🇷",
    type: "domestic",
    logo: "https://logos-world.net/wp-content/uploads/2024/06/Ligue-1-Logo-New-500x281.png",
    founded: 1932,
    teamsCount: 18,
    matchesPerSeason: 306,
    marketValue: "€3.7B",
    avgGoals: 2.88,
    defendingChampion: {
      name: "Paris Saint-Germain",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
      titles: 12,
    },
    topScorer: "Ousmane Dembélé / Bradley Barcola",
    coefficientRank: "#5 UEFA",
    description:
      "World renowned incubator of elite global talent, featuring intense technical matchups and Paris Saint-Germain's star ensemble.",
    standings: [
      { pos: 1, club: "Paris Saint-Germain", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg", p: 23, w: 17, d: 6, l: 0, gd: "+41", pts: 57, form: ["W", "W", "D", "W", "W"] },
      { pos: 2, club: "Marseille", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg", p: 23, w: 15, d: 4, l: 4, gd: "+22", pts: 49, form: ["W", "W", "W", "L", "W"] },
      { pos: 3, club: "Monaco", logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/AS_Monaco_FC.svg", p: 23, w: 13, d: 4, l: 6, gd: "+15", pts: 43, form: ["D", "L", "W", "W", "W"] },
      { pos: 4, club: "Lille", logo: "https://upload.wikimedia.org/wikipedia/en/6/6f/Lille_OSC_2018_logo.svg", p: 23, w: 11, d: 8, l: 4, gd: "+14", pts: 41, form: ["W", "D", "D", "W", "D"] },
      { pos: 5, club: "Lyon", logo: "https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg", p: 23, w: 11, d: 6, l: 6, gd: "+10", pts: 39, form: ["W", "W", "L", "D", "W"] },
      { pos: 6, club: "Nice", logo: "https://upload.wikimedia.org/wikipedia/en/2/2e/OGC_Nice_logo.svg", p: 23, w: 10, d: 7, l: 6, gd: "+12", pts: 37, form: ["L", "W", "W", "D", "W"] },
    ],
  },
  {
    id: "champions-league",
    name: "UEFA Champions League",
    shortName: "UCL",
    country: "Europe",
    flag: "🇪🇺",
    type: "continental",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg",
    founded: 1955,
    teamsCount: 36,
    matchesPerSeason: 189,
    marketValue: "€16.5B",
    avgGoals: 3.42,
    defendingChampion: {
      name: "Real Madrid",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      titles: 15,
    },
    topScorer: "Cristiano Ronaldo (All-Time 140)",
    coefficientRank: "Crown of Club Football",
    description:
      "The most prestigious club tournament on earth, featuring 36 qualified titans competing under the legendary floodlights.",
    standings: [
      { pos: 1, club: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", p: 8, w: 7, d: 0, l: 1, gd: "+12", pts: 21, form: ["W", "W", "W", "W", "L"] },
      { pos: 2, club: "FC Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg", p: 8, w: 6, d: 1, l: 1, gd: "+16", pts: 19, form: ["W", "W", "W", "D", "W"] },
      { pos: 3, club: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", p: 8, w: 6, d: 1, l: 1, gd: "+11", pts: 19, form: ["W", "W", "D", "W", "W"] },
      { pos: 4, club: "Inter Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg", p: 8, w: 6, d: 1, l: 1, gd: "+9", pts: 19, form: ["W", "W", "W", "W", "D"] },
      { pos: 5, club: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", p: 8, w: 5, d: 0, l: 3, gd: "+8", pts: 15, form: ["W", "L", "W", "L", "W"] },
      { pos: 6, club: "Bayern Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg", p: 8, w: 5, d: 0, l: 3, gd: "+10", pts: 15, form: ["W", "W", "L", "W", "W"] },
    ],
  },
];

const Leagues = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeModalLeague, setActiveModalLeague] = useState(null);
  const navigate = useNavigate();

  // Filtered Leagues
  const filteredLeagues = useMemo(() => {
    return leagueData.filter((lg) => {
      const matchSearch =
        lg.name.toLowerCase().includes(search.toLowerCase()) ||
        lg.country.toLowerCase().includes(search.toLowerCase()) ||
        lg.defendingChampion.name.toLowerCase().includes(search.toLowerCase());

      const matchType = selectedType === "all" || lg.type === selectedType;

      return matchSearch && matchType;
    });
  }, [search, selectedType]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-border text-foreground text-xs font-semibold tracking-wider uppercase mb-2">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span>European Football Competitions • 2026/27</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Leagues & Competitions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore Europe's elite top-tier leagues, official live standings, defending champions,
            and continental prize coefficients.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search league, country, champion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* ---------- 2. COMPETITION TYPE FILTER PILLS ---------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", name: "All Competitions", flag: "🌍" },
          { id: "domestic", name: "Domestic Top 5", flag: "🏆" },
          { id: "continental", name: "UEFA Continental Cups", flag: "⭐" },
        ].map((tab) => {
          const isSelected = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface-elevated border-border text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <span>{tab.flag}</span>
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- 3. LEAGUES GRID ---------- */}
      {filteredLeagues.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl p-8">
          <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">
            No competitions match your search
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try checking for typos or selecting "All Competitions".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeagues.map((lg) => {
            return (
              <div
                key={lg.id}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 hover:border-primary transition-colors"
              >
                <div>
                  {/* Top Bar: Country & UEFA Rank Badge */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-foreground font-medium">
                      <span>{lg.flag}</span>
                      <span>{lg.country}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-primary font-semibold text-[11px]">
                      {lg.coefficientRank}
                    </span>
                  </div>

                  {/* League Crest + Title */}
                  <div className="flex items-center gap-4 my-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 p-2.5 rounded-xl bg-background border border-border group-hover:border-primary transition-colors flex items-center justify-center shrink-0">
                      <img
                        src={lg.logo}
                        alt={lg.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden w-full h-full flex-col items-center justify-center text-primary font-black">
                        ⚽
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {lg.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        Est. {lg.founded} • {lg.teamsCount} Participating Clubs
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3 line-clamp-2">
                    {lg.description}
                  </p>

                  {/* Defending Champion Chip */}
                  <div className="mt-4 p-3 rounded-lg bg-surface-elevated border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-card p-1 border border-border flex items-center justify-center shrink-0">
                        <img
                          src={lg.defendingChampion.logo}
                          alt={lg.defendingChampion.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                          Reigning Champion
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {lg.defendingChampion.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-warning bg-card px-2 py-0.5 rounded-md border border-border">
                      🏆 {lg.defendingChampion.titles} Titles
                    </span>
                  </div>

                  {/* Metric Chips */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-md bg-surface-elevated border border-border text-center">
                      <span className="font-bold text-foreground block">
                        {lg.avgGoals}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">
                        Goals / Match
                      </span>
                    </div>
                    <div className="p-2 rounded-md bg-surface-elevated border border-border text-center">
                      <span className="font-bold text-primary block">
                        {lg.marketValue}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">
                        Market Value
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-3 border-t border-border flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveModalLeague(lg)}
                    className="flex-1 py-2 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>View Standings</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/teams?league=${encodeURIComponent(lg.name)}`)}
                    className="py-2 px-3 rounded-md bg-surface-elevated border border-border text-foreground hover:border-primary text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="View Clubs"
                  >
                    <span>Clubs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- 4. STANDINGS TABLE MODAL ---------- */}
      {activeModalLeague && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150"
          onClick={() => setActiveModalLeague(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalLeague(null)}
              className="absolute top-5 right-5 p-1.5 rounded-md bg-surface-elevated border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                <img
                  src={activeModalLeague.logo}
                  alt={activeModalLeague.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary uppercase">
                    {activeModalLeague.country} • {activeModalLeague.flag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Season 2026/27
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {activeModalLeague.name} Standings
                </h2>
              </div>
            </div>

            {/* Live Standings Table */}
            <div className="overflow-x-auto rounded-lg border border-border bg-background">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-elevated text-muted-foreground font-semibold text-[11px] uppercase">
                    <th className="py-2.5 px-3 sm:px-4 text-center">#</th>
                    <th className="py-2.5 px-3">Club</th>
                    <th className="py-2.5 px-2 text-center">MP</th>
                    <th className="py-2.5 px-2 text-center">W</th>
                    <th className="py-2.5 px-2 text-center">D</th>
                    <th className="py-2.5 px-2 text-center">L</th>
                    <th className="py-2.5 px-2 text-center hidden sm:table-cell">GD</th>
                    <th className="py-2.5 px-3 text-center font-bold text-foreground">PTS</th>
                    <th className="py-2.5 px-3 text-center hidden md:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {activeModalLeague.standings.map((row) => {
                    const isUCL = row.pos <= 4;
                    const isTop = row.pos === 1;

                    return (
                      <tr
                        key={row.pos}
                        className="hover:bg-surface-elevated transition-colors"
                      >
                        {/* Position */}
                        <td className="py-2.5 px-3 sm:px-4 text-center font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs ${
                              isTop
                                ? "bg-warning/20 text-warning font-extrabold"
                                : isUCL
                                ? "bg-primary/20 text-primary font-bold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {row.pos}
                          </span>
                        </td>

                        {/* Club */}
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                              <img
                                src={row.logo}
                                alt={row.club}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="font-semibold text-foreground truncate max-w-[140px] sm:max-w-none">
                              {row.club}
                            </span>
                          </div>
                        </td>

                        {/* Matches Played */}
                        <td className="py-2.5 px-2 text-center text-muted-foreground">
                          {row.p}
                        </td>

                        {/* Won */}
                        <td className="py-2.5 px-2 text-center font-semibold text-foreground">
                          {row.w}
                        </td>

                        {/* Draw */}
                        <td className="py-2.5 px-2 text-center text-muted-foreground">
                          {row.d}
                        </td>

                        {/* Lost */}
                        <td className="py-2.5 px-2 text-center text-muted-foreground">
                          {row.l}
                        </td>

                        {/* Goal Difference */}
                        <td className="py-2.5 px-2 text-center text-muted-foreground hidden sm:table-cell">
                          {row.gd}
                        </td>

                        {/* Points */}
                        <td className="py-2.5 px-3 text-center font-bold text-sm text-primary">
                          {row.pts}
                        </td>

                        {/* Form Bubbles */}
                        <td className="py-2.5 px-3 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {row.form?.map((f, i) => (
                              <span
                                key={i}
                                className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-foreground ${
                                  f === "W"
                                    ? "bg-success text-white"
                                    : f === "D"
                                    ? "bg-warning text-black"
                                    : "bg-destructive text-white"
                                }`}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>UEFA Champions League (Top 4)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning" />
                  <span>Title Leader (Rank 1)</span>
                </span>
              </div>

              <Link
                to="/teams"
                onClick={() => setActiveModalLeague(null)}
                className="font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Browse {activeModalLeague.name} Teams</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leagues;
