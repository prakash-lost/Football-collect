import React from "react";
import { Link, useNavigate } from "react-router";
import { Shield, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

const topClubs = [
  {
    id: 1,
    name: "Real Madrid",
    shortName: "RMA",
    league: "La Liga",
    country: "Spain",
    flag: "🇪🇸",
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    titles: "15 UCL",
  },
  {
    id: 2,
    name: "FC Barcelona",
    shortName: "FCB",
    league: "La Liga",
    country: "Spain",
    flag: "🇪🇸",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    titles: "5 UCL",
  },
  {
    id: 3,
    name: "Manchester City",
    shortName: "MCI",
    league: "Premier League",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    titles: "1 UCL",
  },
  {
    id: 4,
    name: "Arsenal",
    shortName: "ARS",
    league: "Premier League",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    titles: "13 League",
  },
  {
    id: 5,
    name: "Liverpool",
    shortName: "LIV",
    league: "Premier League",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    titles: "6 UCL",
  },
  {
    id: 6,
    name: "Bayern Munich",
    shortName: "BAY",
    league: "Bundesliga",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    titles: "6 UCL",
  },
  {
    id: 7,
    name: "Paris Saint-Germain",
    shortName: "PSG",
    league: "Ligue 1",
    country: "France",
    flag: "🇫🇷",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    titles: "12 League",
  },
  {
    id: 8,
    name: "Inter Milan",
    shortName: "INT",
    league: "Serie A",
    country: "Italy",
    flag: "🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    titles: "3 UCL",
  },
  {
    id: 9,
    name: "AC Milan",
    shortName: "MIL",
    league: "Serie A",
    country: "Italy",
    flag: "🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    titles: "7 UCL",
  },
  {
    id: 10,
    name: "Borussia Dortmund",
    shortName: "BVB",
    league: "Bundesliga",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
    titles: "1 UCL",
  },
  {
    id: 11,
    name: "Chelsea",
    shortName: "CHE",
    league: "Premier League",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    titles: "2 UCL",
  },
  {
    id: 12,
    name: "Juventus FC",
    shortName: "JUV",
    league: "Serie A",
    country: "Italy",
    flag: "🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
    titles: "2 UCL",
  },
];

const Team = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ---------- HEADER STRIP ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <div>
          <Badge variant="secondary" size="default" className="mb-1.5">
            <Shield className="size-3.5 text-primary" />
            <span>Club Showcase</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Featured European Giants
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Browse Europe's most decorated clubs, historical honors, and squad rosters.
          </p>
        </div>

        <Link
          to="/teams"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors w-fit group"
        >
          <span>View All 80+ Clubs</span>
          <ArrowRight className="size-3.5 text-primary" />
        </Link>
      </div>

      {/* ---------- 12 CLUBS BADGE GRID ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {topClubs.map((club) => (
          <div
            key={club.id}
            onClick={() =>
              navigate(`/teams?search=${encodeURIComponent(club.name)}`)
            }
            className="group flex flex-col items-center justify-between p-3.5 rounded-lg border border-border bg-card hover:border-primary transition-colors cursor-pointer text-center"
          >
            {/* Top Badge: Trophy count */}
            <Badge
              variant="secondary"
              size="sm"
              className="self-end font-mono text-primary font-bold text-[10px]"
            >
              {club.titles}
            </Badge>

            {/* Club Crest */}
            <div className="my-2 size-14 sm:size-16 flex items-center justify-center p-2 rounded-md bg-surface-elevated border border-border">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Club Title & League */}
            <div className="w-full">
              <h3 className="font-bold text-xs sm:text-sm text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
                {club.name}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate flex items-center justify-center gap-1">
                <span>{club.flag}</span>
                <span>{club.league}</span>
              </p>
            </div>

            {/* Action text */}
            <span className="mt-2 text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
              Inspect Club →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
