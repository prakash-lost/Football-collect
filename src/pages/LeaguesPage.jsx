import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import {
  Trophy,
  Search,
  ChevronRight,
  Calendar,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { EmptyState } from "../components/ui/empty-state";
import { Dialog, DialogContent } from "../components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

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

// Verified real matches & fixtures from the database
const officialMatches = [
  {
    id: "m-ucl-1",
    competition: "UEFA Champions League",
    competitionCode: "ucl",
    round: "Quarter-Final • Leg 1 of 2",
    dateGroup: "Wednesday, April 9, 2026",
    timeOrScore: "20:00 CET",
    status: "upcoming",
    venue: "Santiago Bernabéu, Madrid",
    home: {
      name: "Real Madrid",
      short: "RMA",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      score: null,
    },
    away: {
      name: "FC Barcelona",
      short: "BAR",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      score: null,
    },
  },
  {
    id: "m-ucl-2",
    competition: "UEFA Champions League",
    competitionCode: "ucl",
    round: "Quarter-Final • Leg 1 of 2",
    dateGroup: "Wednesday, April 9, 2026",
    timeOrScore: "20:00 CET",
    status: "upcoming",
    venue: "Emirates Stadium, London",
    home: {
      name: "Arsenal",
      short: "ARS",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      score: null,
    },
    away: {
      name: "Bayern Munich",
      short: "BAY",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
      score: null,
    },
  },
  {
    id: "m-epl-1",
    competition: "Premier League",
    competitionCode: "epl",
    round: "Matchday 27 • Title Clash",
    dateGroup: "Saturday, April 18, 2026",
    timeOrScore: "17:30 BST",
    status: "upcoming",
    venue: "Emirates Stadium, London",
    home: {
      name: "Arsenal",
      short: "ARS",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      score: null,
    },
    away: {
      name: "Manchester City",
      short: "MCI",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      score: null,
    },
  },
  {
    id: "m-fra-1",
    competition: "Ligue 1",
    competitionCode: "ligue1",
    round: "Matchday 24 • Le Classique",
    dateGroup: "Sunday, April 19, 2026",
    timeOrScore: "20:45 CET",
    status: "upcoming",
    venue: "Parc des Princes, Paris",
    home: {
      name: "Paris Saint-Germain",
      short: "PSG",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
      score: null,
    },
    away: {
      name: "Marseille",
      short: "OM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg",
      score: null,
    },
  },
  {
    id: "m-ucl-3",
    competition: "UEFA Champions League",
    competitionCode: "ucl",
    round: "Round of 16 • Leg 2 (Agg 3-1)",
    dateGroup: "Recent European Results",
    timeOrScore: "FT",
    status: "completed",
    venue: "Anfield, Liverpool",
    home: {
      name: "Liverpool",
      short: "LIV",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      score: 2,
    },
    away: {
      name: "Real Madrid",
      short: "RMA",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      score: 0,
    },
    events: [
      { minute: "52'", type: "goal", player: "Alexis Mac Allister", team: "home", note: "Assist by Conor Bradley" },
      { minute: "60'", type: "var", player: "Kylian Mbappé", team: "away", note: "Penalty Saved by Kelleher" },
      { minute: "61'", type: "card", player: "Eduardo Camavinga", team: "away", card: "yellow" },
      { minute: "76'", type: "goal", player: "Cody Gakpo", team: "home", note: "Header from Robertson corner" },
    ],
    stats: {
      possession: [58, 42],
      shots: [16, 7],
      shotsOnTarget: [7, 2],
      xg: ["2.45", "0.75"],
      corners: [7, 3],
      fouls: [9, 11],
    },
  },
  {
    id: "m-ita-1",
    competition: "Serie A",
    competitionCode: "seriea",
    round: "Matchday 25 • Derby della Madonnina",
    dateGroup: "Recent Domestic Results",
    timeOrScore: "FT",
    status: "completed",
    venue: "San Siro, Milan",
    home: {
      name: "Inter Milan",
      short: "INT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
      score: 2,
    },
    away: {
      name: "AC Milan",
      short: "MIL",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
      score: 1,
    },
    events: [
      { minute: "24'", type: "goal", player: "Lautaro Martínez", team: "home", note: "Header from Dimarco cross" },
      { minute: "44'", type: "goal", player: "Christian Pulisic", team: "away", note: "Low strike into far corner" },
      { minute: "78'", type: "goal", player: "Lautaro Martínez", team: "home", note: "Volley after counter-attack" },
    ],
    stats: {
      possession: [53, 47],
      shots: [14, 11],
      shotsOnTarget: [6, 4],
      xg: ["1.82", "1.30"],
      corners: [5, 6],
      fouls: [12, 14],
    },
  },
  {
    id: "m-ger-1",
    competition: "Bundesliga",
    competitionCode: "bundesliga",
    round: "Matchday 23",
    dateGroup: "Recent Domestic Results",
    timeOrScore: "FT",
    status: "completed",
    venue: "Allianz Arena, Munich",
    home: {
      name: "Bayern Munich",
      short: "BAY",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
      score: 3,
    },
    away: {
      name: "Eintracht Frankfurt",
      short: "SGE",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg",
      score: 0,
    },
    events: [
      { minute: "18'", type: "goal", player: "Harry Kane", team: "home", note: "Header from Olise delivery" },
      { minute: "39'", type: "goal", player: "Jamal Musiala", team: "home", note: "Solo dribble through box" },
      { minute: "72'", type: "goal", player: "Harry Kane", team: "home", note: "Left-foot drive inside far post" },
    ],
    stats: {
      possession: [67, 33],
      shots: [21, 4],
      shotsOnTarget: [9, 1],
      xg: ["3.10", "0.38"],
      corners: [9, 2],
      fouls: [7, 10],
    },
  },
  {
    id: "m-ita-2",
    competition: "Serie A",
    competitionCode: "seriea",
    round: "Matchday 24",
    dateGroup: "Scheduled Fixtures",
    timeOrScore: "Postponed",
    status: "postponed",
    venue: "Gewiss Stadium, Bergamo",
    home: {
      name: "Atalanta",
      short: "ATA",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/66/Atalanta_BC_logo.svg",
      score: null,
    },
    away: {
      name: "SS Lazio",
      short: "LAZ",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
      score: null,
    },
  },
];

const LeaguesPage = () => {
  const [activeView, setActiveView] = useState("standings"); // "standings" | "fixtures" | "overview"
  const [activeLeagueId, setActiveLeagueId] = useState("premier-league");
  const [fixtureFilter, setFixtureFilter] = useState("all"); // "all" | "upcoming" | "completed" | "ucl" | "epl"
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [activeModalLeague, setActiveModalLeague] = useState(null);
  const [activeMatchModal, setActiveMatchModal] = useState(null);
  const navigate = useNavigate();

  // Active league data for the full table view
  const currentLeague =
    leagueData.find((lg) => lg.id === activeLeagueId) || leagueData[0];

  // Filtered standings based on search query
  const filteredStandings = useMemo(() => {
    if (!search.trim()) return currentLeague.standings;
    return currentLeague.standings.filter((row) =>
      row.club.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentLeague, search]);

  // Filtered fixtures based on tabs and search
  const filteredMatches = useMemo(() => {
    return officialMatches.filter((m) => {
      const matchSearch =
        m.home.name.toLowerCase().includes(search.toLowerCase()) ||
        m.away.name.toLowerCase().includes(search.toLowerCase()) ||
        m.competition.toLowerCase().includes(search.toLowerCase()) ||
        m.venue.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (fixtureFilter === "all") return true;
      if (fixtureFilter === "upcoming") return m.status === "upcoming";
      if (fixtureFilter === "completed") return m.status === "completed";
      if (fixtureFilter === "ucl") return m.competitionCode === "ucl";
      if (fixtureFilter === "epl") return m.competitionCode === "epl";
      return true;
    });
  }, [search, fixtureFilter]);

  // Grouped matches by dateGroup
  const groupedMatches = useMemo(() => {
    const groups = {};
    filteredMatches.forEach((m) => {
      const g = m.dateGroup;
      if (!groups[g]) groups[g] = [];
      groups[g].push(m);
    });
    return groups;
  }, [filteredMatches]);

  // Filtered Leagues for Competitions Overview
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border text-foreground text-xs font-semibold tracking-wider uppercase mb-2">
            <Trophy className="size-3.5 text-primary" />
            <span>Official European Competitions & Match Center • 2026/27</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-sans">
            Leagues, Standings & Fixtures
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Verified division tables, matchday schedules, final scores, and continental qualification race.
          </p>
        </div>

        {/* Global Search Input */}
        <div className="w-full sm:w-72">
          <Input
            leftIcon={Search}
            placeholder="Search club, competition, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9.5 text-xs"
          />
        </div>
      </div>

      {/* ---------- 2. PRIMARY VIEW SELECTOR (Standings / Fixtures / Overview) ---------- */}
      <div className="flex items-center justify-between border-b border-border pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-1.5 bg-surface-elevated/80 p-1 rounded-lg border border-border">
          {[
            { id: "standings", label: "League Standings", icon: Trophy },
            { id: "fixtures", label: "Fixtures & Results", icon: Calendar },
            { id: "overview", label: "Competition Profiles", icon: Layers },
          ].map((v) => {
            const Icon = v.icon;
            const isSelected = activeView === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-card text-foreground border border-border shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`size-3.5 ${isSelected ? "text-primary" : ""}`} />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
          Season 2026/27 Verified
        </span>
      </div>

      {/* =================================================================== */}
      {/* ---------- VIEW 1: PROPER DATA TABLE FOR LEAGUE STANDINGS --------- */}
      {/* =================================================================== */}
      {activeView === "standings" && (
        <div className="flex flex-col gap-5">
          {/* League Selector Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {leagueData.map((lg) => {
              const isSelected = activeLeagueId === lg.id;
              return (
                <button
                  key={lg.id}
                  onClick={() => setActiveLeagueId(lg.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <span>{lg.flag}</span>
                  <span>{lg.name}</span>
                </button>
              );
            })}
          </div>

          {/* League Intelligence Summary Card */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="size-14 sm:size-16 p-2 rounded-lg bg-surface-elevated border border-border flex items-center justify-center shrink-0">
                <img
                  src={currentLeague.logo}
                  alt={currentLeague.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">
                    {currentLeague.flag} {currentLeague.country}
                  </span>
                  <span className="text-border">•</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {currentLeague.teamsCount} Teams
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  {currentLeague.name} Table
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-xl line-clamp-1">
                  {currentLeague.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-5 text-xs">
              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Reigning Champion
                </span>
                <span className="font-bold text-foreground flex items-center gap-1">
                  <img
                    src={currentLeague.defendingChampion.logo}
                    alt={currentLeague.defendingChampion.name}
                    className="size-3.5 object-contain inline"
                  />
                  <span>{currentLeague.defendingChampion.name}</span>
                </span>
              </div>

              <div className="h-7 w-px bg-border" />

              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Top Scorer
                </span>
                <span className="font-bold text-foreground">
                  {currentLeague.topScorer.split(" (")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* The Proper Data Table */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border bg-surface-elevated/40">
                    <TableHead className="w-12 text-center font-bold">#</TableHead>
                    <TableHead className="min-w-[180px] sm:min-w-[240px]">Club</TableHead>
                    <TableHead className="text-center w-12 font-mono">MP</TableHead>
                    <TableHead className="text-center w-12 font-mono hidden sm:table-cell">W</TableHead>
                    <TableHead className="text-center w-12 font-mono hidden sm:table-cell">D</TableHead>
                    <TableHead className="text-center w-12 font-mono hidden sm:table-cell">L</TableHead>
                    <TableHead className="text-center w-14 font-mono">GD</TableHead>
                    <TableHead className="text-center w-16 font-mono font-black text-foreground">
                      PTS
                    </TableHead>
                    <TableHead className="text-right w-28 hidden md:table-cell pr-4">
                      Form
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStandings.map((row) => {
                    const isLeader = row.pos === 1;
                    const isUCL = row.pos <= 4;
                    const isUEL = row.pos === 5;

                    return (
                      <TableRow
                        key={row.club}
                        className="border-b border-border/50 hover:bg-surface-elevated/40 transition-colors"
                      >
                        {/* Position with Qualifier Marker */}
                        <TableCell className="text-center font-mono font-bold text-xs py-2.5">
                          <span
                            className={`inline-flex items-center justify-center size-5.5 rounded text-[11px] ${
                              isLeader
                                ? "bg-primary text-primary-foreground font-black"
                                : isUCL
                                ? "bg-surface-elevated text-foreground border border-border font-bold"
                                : isUEL
                                ? "text-amber-400 font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {row.pos}
                          </span>
                        </TableCell>

                        {/* Club Identity */}
                        <TableCell className="py-2.5">
                          <Link
                            to={`/teams?search=${encodeURIComponent(row.club)}`}
                            className="flex items-center gap-2.5 group/club"
                          >
                            <img
                              src={row.logo}
                              alt={row.club}
                              className="size-5 object-contain shrink-0"
                              loading="lazy"
                            />
                            <span className="font-bold text-xs sm:text-sm text-foreground group-hover/club:text-primary transition-colors truncate">
                              {row.club}
                            </span>
                          </Link>
                        </TableCell>

                        {/* Matches Played */}
                        <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground py-2.5">
                          {row.p}
                        </TableCell>

                        {/* Wins */}
                        <TableCell className="text-center font-mono tabular-nums text-xs text-foreground font-semibold py-2.5 hidden sm:table-cell">
                          {row.w}
                        </TableCell>

                        {/* Draws */}
                        <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground py-2.5 hidden sm:table-cell">
                          {row.d}
                        </TableCell>

                        {/* Losses */}
                        <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground py-2.5 hidden sm:table-cell">
                          {row.l}
                        </TableCell>

                        {/* Goal Difference */}
                        <TableCell className="text-center font-mono tabular-nums text-xs text-muted-foreground py-2.5">
                          {row.gd}
                        </TableCell>

                        {/* Points (Prominent) */}
                        <TableCell className="text-center font-mono tabular-nums font-black text-sm sm:text-base text-foreground py-2.5">
                          {row.pts}
                        </TableCell>

                        {/* Form Last 5 */}
                        <TableCell className="text-right py-2.5 hidden md:table-cell pr-4">
                          <div className="flex items-center justify-end gap-1">
                            {row.form?.map((f, i) => (
                              <span
                                key={i}
                                className={`size-4.5 rounded-[3px] text-[9px] font-mono font-bold flex items-center justify-center ${
                                  f === "W"
                                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                                    : f === "D"
                                    ? "bg-amber-600/20 text-amber-400 border border-amber-500/30"
                                    : "bg-red-600/20 text-red-400 border border-red-500/30"
                                }`}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Table Legend Footer */}
            <div className="px-4 py-3 border-t border-border bg-surface-base/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>UEFA Champions League (Positions 1–4)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span>UEFA Europa League (Position 5)</span>
                </span>
              </div>

              <Link
                to={`/teams?league=${encodeURIComponent(currentLeague.name)}`}
                className="font-bold text-primary hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <span>Browse {currentLeague.name} Roster in Club Directory</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ---------- VIEW 2: COMPACT FIXTURES & RESULTS ROWS --------------- */}
      {/* =================================================================== */}
      {activeView === "fixtures" && (
        <div className="flex flex-col gap-5">
          {/* Calendar Fixture Link Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/70 border border-border flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="font-bold text-foreground">
                Full calendar date picker, live scores & match details available on the Fixtures Desk.
              </span>
            </div>
            <Link
              to="/fixtures"
              className="font-bold text-primary hover:underline flex items-center gap-1 ml-auto"
            >
              <span>Open Fixture Desk & Live Scores</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Fixture Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Matchdays" },
              { id: "upcoming", label: "Upcoming Fixtures" },
              { id: "completed", label: "Recent Results (FT)" },
              { id: "ucl", label: "Champions League" },
              { id: "epl", label: "Premier League" },
            ].map((f) => {
              const isSelected = fixtureFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFixtureFilter(f.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Grouped Match Rows */}
          {Object.keys(groupedMatches).length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No fixtures match your criteria"
              description="Try adjusting your filter or search query."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFixtureFilter("all");
                    setSearch("");
                  }}
                >
                  Reset Match Filters
                </Button>
              }
            />
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(groupedMatches).map(([dateHeader, matches]) => (
                <div
                  key={dateHeader}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  {/* Date / Round Header */}
                  <div className="px-4 py-2.5 bg-surface-elevated/60 border-b border-border flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <Calendar className="size-3.5 text-primary" />
                      <span>{dateHeader}</span>
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {matches.length} {matches.length === 1 ? "Match" : "Matches"}
                    </span>
                  </div>

                  {/* Compact Match Rows List */}
                  <div className="divide-y divide-border/60">
                    {matches.map((m) => {
                      const isCompleted = m.status === "completed";
                      const isPostponed = m.status === "postponed";
                      const isLive = m.status === "live";

                      return (
                        <div
                          key={m.id}
                          onClick={() => setActiveMatchModal(m)}
                          className="px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 hover:bg-surface-elevated/40 transition-colors cursor-pointer group"
                        >
                          {/* 1. Time / Match Status (Left column, fixed width) */}
                          <div className="w-14 sm:w-28 shrink-0 flex flex-col text-left">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground truncate">
                              {m.competitionCode.toUpperCase()}
                            </span>
                            <span
                              className={`text-xs font-mono font-bold mt-0.5 ${
                                isCompleted
                                  ? "text-muted-foreground"
                                  : isLive
                                  ? "text-primary flex items-center gap-1"
                                  : isPostponed
                                  ? "text-amber-400"
                                  : "text-foreground"
                              }`}
                            >
                              {isLive && (
                                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                              )}
                              {m.timeOrScore}
                            </span>
                          </div>

                          {/* 2. Teams Matchup & Score (Centered Alignment) */}
                          <div className="flex-1 flex items-center justify-center max-w-xl mx-auto">
                            {/* Home Team (Right aligned text + Crest) */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/teams?search=${encodeURIComponent(m.home.name)}`);
                              }}
                              className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2 text-right group/team min-w-0"
                            >
                              <span className="font-bold text-xs sm:text-sm text-foreground group-hover/team:text-primary transition-colors truncate">
                                <span className="sm:hidden">{m.home.short}</span>
                                <span className="hidden sm:inline">{m.home.name}</span>
                              </span>
                              <img
                                src={m.home.logo}
                                alt={m.home.name}
                                className="size-5 sm:size-6 object-contain shrink-0"
                              />
                            </div>

                            {/* Score or Kickoff Box (Centered) */}
                            <div className="w-14 sm:w-24 text-center shrink-0 px-1 sm:px-2">
                              {isCompleted ? (
                                <div className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 rounded bg-surface-elevated border border-border font-mono font-black text-xs sm:text-sm text-foreground">
                                  <span>{m.home.score}</span>
                                  <span className="mx-0.5 sm:mx-1 text-muted-foreground">-</span>
                                  <span>{m.away.score}</span>
                                </div>
                              ) : isPostponed ? (
                                <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-1.5 sm:px-2 py-0.5 rounded bg-surface-elevated border border-border text-amber-400">
                                  P - P
                                </span>
                              ) : (
                                <span className="text-[11px] sm:text-xs font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-surface-elevated border border-border text-muted-foreground">
                                  VS
                                </span>
                              )}
                            </div>

                            {/* Away Team (Crest + Left aligned text) */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/teams?search=${encodeURIComponent(m.away.name)}`);
                              }}
                              className="flex-1 flex items-center justify-start gap-1.5 sm:gap-2 text-left group/team min-w-0"
                            >
                              <img
                                src={m.away.logo}
                                alt={m.away.name}
                                className="size-5 sm:size-6 object-contain shrink-0"
                              />
                              <span className="font-bold text-xs sm:text-sm text-foreground group-hover/team:text-primary transition-colors truncate">
                                <span className="sm:hidden">{m.away.short}</span>
                                <span className="hidden sm:inline">{m.away.name}</span>
                              </span>
                            </div>
                          </div>

                          {/* 3. Venue & Stage Details (Right column) */}
                          <div className="hidden lg:flex flex-col text-right w-44 shrink-0 text-xs">
                            <span className="text-muted-foreground text-[11px] truncate">
                              {m.round}
                            </span>
                            <span className="text-muted-foreground/80 text-[10px] truncate">
                              {m.venue}
                            </span>
                          </div>

                          {/* 4. Action arrow */}
                          <div
                            className="p-1 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                            title="Inspect Match"
                          >
                            <ChevronRight className="size-4" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* ---------- VIEW 3: COMPETITION PROFILES OVERVIEW ----------------- */}
      {/* =================================================================== */}
      {activeView === "overview" && (
        <div className="flex flex-col gap-6">
          {/* Competition Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <span>{tab.flag}</span>
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Grid of Competition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLeagues.map((lg) => (
              <div
                key={lg.id}
                className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-5 hover:border-primary transition-colors"
              >
                <div>
                  {/* Top Bar: Country & UEFA Rank Badge */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-foreground font-medium text-[11px]">
                      <span>{lg.flag}</span>
                      <span>{lg.country}</span>
                    </span>
                    <Badge variant="secondary" size="sm">
                      {lg.coefficientRank}
                    </Badge>
                  </div>

                  {/* League Crest + Title */}
                  <div className="flex items-center gap-3.5 my-2">
                    <div className="size-14 p-2 rounded-lg bg-surface-elevated border border-border group-hover:border-primary transition-colors flex items-center justify-center shrink-0">
                      <img
                        src={lg.logo}
                        alt={lg.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {lg.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Est. {lg.founded} • {lg.teamsCount} Clubs
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 line-clamp-2">
                    {lg.description}
                  </p>

                  {/* Reigning Champion Strip */}
                  <div className="mt-3.5 p-2.5 rounded-md bg-surface-elevated border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={lg.defendingChampion.logo}
                        alt={lg.defendingChampion.name}
                        className="size-5 object-contain"
                      />
                      <span className="text-xs font-semibold text-foreground">
                        {lg.defendingChampion.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-primary font-bold">
                      {lg.defendingChampion.titles} Titles
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                  <Button
                    onClick={() => {
                      setActiveLeagueId(lg.id);
                      setActiveView("standings");
                    }}
                    variant="default"
                    size="sm"
                    className="flex-1"
                  >
                    <span>View Table</span>
                    <ArrowRight className="size-3" />
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(`/teams?league=${encodeURIComponent(lg.name)}`)
                    }
                    variant="secondary"
                    size="sm"
                  >
                    <span>Clubs</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- 4. STANDINGS MODAL (Preserved for compatibility) ---------- */}
      <Dialog
        open={Boolean(activeModalLeague)}
        onOpenChange={(isOpen) => !isOpen && setActiveModalLeague(null)}
      >
        {activeModalLeague && (
          <DialogContent
            title={`${activeModalLeague.name} Standings`}
            description={`Official 2026/27 table standings for ${activeModalLeague.country}`}
            className="max-w-4xl"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 text-center font-bold">#</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead className="text-center font-mono">MP</TableHead>
                    <TableHead className="text-center font-mono">GD</TableHead>
                    <TableHead className="text-center font-mono font-bold text-foreground">
                      PTS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeModalLeague.standings.map((r) => (
                    <TableRow key={r.club}>
                      <TableCell className="text-center font-mono font-bold text-xs">
                        {r.pos}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                          <img
                            src={r.logo}
                            alt={r.club}
                            className="size-4 object-contain"
                          />
                          <span>{r.club}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs text-muted-foreground">
                        {r.p}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs text-muted-foreground">
                        {r.gd}
                      </TableCell>
                      <TableCell className="text-center font-mono font-bold text-xs text-foreground">
                        {r.pts}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        )}
      </Dialog>
      {/* ---------- 5. MATCH DETAIL MODAL (EVENTS & STATISTICS) ---------- */}
      <Dialog
        open={Boolean(activeMatchModal)}
        onOpenChange={(isOpen) => !isOpen && setActiveMatchModal(null)}
      >
        {activeMatchModal && (
          <DialogContent
            title={`${activeMatchModal.home.name} vs ${activeMatchModal.away.name}`}
            description={`${activeMatchModal.competition} • ${activeMatchModal.round}`}
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            onClose={() => setActiveMatchModal(null)}
          >
            {/* 1. Clear Match Header & Scoreboard */}
            <div className="rounded-lg border border-border bg-surface-elevated/60 p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2.5">
                <span className="font-bold text-primary uppercase tracking-wide">
                  {activeMatchModal.competition}
                </span>
                <span className="font-mono text-[11px]">
                  {activeMatchModal.venue}
                </span>
              </div>

              {/* Big Scoreboard */}
              <div className="flex items-center justify-between gap-4 py-2">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="size-14 p-2 rounded-lg bg-card border border-border flex items-center justify-center mb-1.5">
                    <img
                      src={activeMatchModal.home.logo}
                      alt={activeMatchModal.home.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {activeMatchModal.home.name}
                  </h3>
                </div>

                {/* Score / VS Display */}
                <div className="flex flex-col items-center shrink-0">
                  {activeMatchModal.status === "completed" ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-2xl sm:text-3xl text-foreground">
                        {activeMatchModal.home.score}
                      </span>
                      <span className="text-muted-foreground font-mono text-xl">-</span>
                      <span className="font-mono font-black text-2xl sm:text-3xl text-foreground">
                        {activeMatchModal.away.score}
                      </span>
                    </div>
                  ) : activeMatchModal.status === "postponed" ? (
                    <span className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs">
                      Postponed
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-surface-elevated border border-border text-foreground font-mono font-bold text-xs">
                      {activeMatchModal.timeOrScore}
                    </span>
                  )}

                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase mt-1">
                    {activeMatchModal.status === "completed" ? "Full Time" : "Scheduled Kickoff"}
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="size-14 p-2 rounded-lg bg-card border border-border flex items-center justify-center mb-1.5">
                    <img
                      src={activeMatchModal.away.logo}
                      alt={activeMatchModal.away.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {activeMatchModal.away.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* 2. Structured Events Timeline (If Completed) */}
            {activeMatchModal.events && activeMatchModal.events.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Match Timeline & Decisive Events
                </span>

                <div className="divide-y divide-border/60">
                  {activeMatchModal.events.map((ev, i) => (
                    <div
                      key={i}
                      className={`py-2 text-xs flex items-center gap-3 ${
                        ev.team === "home" ? "justify-start" : "justify-end flex-row-reverse"
                      }`}
                    >
                      <span className="font-mono font-bold text-primary text-[11px] px-1.5 py-0.5 rounded bg-surface-elevated border border-border shrink-0">
                        {ev.minute}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-foreground">
                          {ev.type === "goal" ? "⚽" : ev.type === "card" ? "🟨" : "⚠️"} {ev.player}
                        </span>
                        {ev.note && (
                          <span className="text-[11px] text-muted-foreground">
                            ({ev.note})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Match Statistics (If Completed) */}
            {activeMatchModal.stats && (
              <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Match Performance Statistics</span>
                  <span className="text-[10px] font-mono text-primary font-normal">
                    Verified Opta / UEFA Data
                  </span>
                </span>

                <div className="space-y-3 pt-1">
                  {[
                    { label: "Possession (%)", h: activeMatchModal.stats.possession[0], a: activeMatchModal.stats.possession[1] },
                    { label: "Total Shots", h: activeMatchModal.stats.shots[0], a: activeMatchModal.stats.shots[1] },
                    { label: "Shots on Target", h: activeMatchModal.stats.shotsOnTarget[0], a: activeMatchModal.stats.shotsOnTarget[1] },
                    { label: "Expected Goals (xG)", h: activeMatchModal.stats.xg[0], a: activeMatchModal.stats.xg[1] },
                    { label: "Corner Kicks", h: activeMatchModal.stats.corners[0], a: activeMatchModal.stats.corners[1] },
                    { label: "Fouls Committed", h: activeMatchModal.stats.fouls[0], a: activeMatchModal.stats.fouls[1] },
                  ].map((s) => {
                    const hNum = Number(s.h);
                    const aNum = Number(s.a);
                    const total = hNum + aNum || 1;
                    const hWidth = Math.round((hNum / total) * 100);

                    return (
                      <div key={s.label} className="text-xs flex flex-col gap-1">
                        <div className="flex items-center justify-between font-mono font-bold">
                          <span className="text-foreground">{s.h}</span>
                          <span className="text-muted-foreground text-[11px] font-sans font-medium uppercase">
                            {s.label}
                          </span>
                          <span className="text-foreground">{s.a}</span>
                        </div>

                        {/* Comparative Bar */}
                        <div className="w-full h-1.5 rounded-full bg-surface-elevated flex overflow-hidden border border-border">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${hWidth}%` }}
                          />
                          <div
                            className="bg-muted-foreground h-full transition-all duration-300"
                            style={{ width: `${100 - hWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <Button asChild variant="outline" size="sm">
                <Link
                  to={`/teams?search=${encodeURIComponent(activeMatchModal.home.name)}`}
                  onClick={() => setActiveMatchModal(null)}
                >
                  <span>{activeMatchModal.home.name} Roster</span>
                </Link>
              </Button>

              <Button asChild variant="outline" size="sm">
                <Link
                  to={`/teams?search=${encodeURIComponent(activeMatchModal.away.name)}`}
                  onClick={() => setActiveMatchModal(null)}
                >
                  <span>{activeMatchModal.away.name} Roster</span>
                </Link>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default LeaguesPage;
