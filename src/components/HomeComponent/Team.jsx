import React from "react";
import { Link, useNavigate } from "react-router";
import { Shield, ArrowRight, Trophy } from "lucide-react";

// The Top 12 European Giant Clubs with Official Crests
const topClubs = [
  {
    id: 1,
    name: "Real Madrid",
    shortName: "RMA",
    league: "La Liga",
    country: "Spain 🇪🇸",
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    titles: "15 UCL",
  },
  {
    id: 2,
    name: "FC Barcelona",
    shortName: "BAR",
    league: "La Liga",
    country: "Spain 🇪🇸",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    titles: "5 UCL",
  },
  {
    id: 3,
    name: "Manchester City",
    shortName: "MCI",
    league: "Premier League",
    country: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    titles: "1 UCL",
  },
  {
    id: 4,
    name: "Arsenal FC",
    shortName: "ARS",
    league: "Premier League",
    country: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    titles: "13 EPL",
  },
  {
    id: 5,
    name: "Liverpool FC",
    shortName: "LIV",
    league: "Premier League",
    country: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    titles: "6 UCL",
  },
  {
    id: 6,
    name: "Bayern Munich",
    shortName: "BAY",
    league: "Bundesliga",
    country: "Germany 🇩🇪",
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_Munchen_logo.svg",
    titles: "6 UCL",
  },
  {
    id: 7,
    name: "Paris Saint-Germain",
    shortName: "PSG",
    league: "Ligue 1",
    country: "France 🇫🇷",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    titles: "12 Titles",
  },
  {
    id: 8,
    name: "Inter Milan",
    shortName: "INT",
    league: "Serie A",
    country: "Italy 🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    titles: "3 UCL",
  },
  {
    id: 9,
    name: "AC Milan",
    shortName: "MIL",
    league: "Serie A",
    country: "Italy 🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    titles: "7 UCL",
  },
  {
    id: 10,
    name: "Chelsea FC",
    shortName: "CHE",
    league: "Premier League",
    country: "England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    titles: "2 UCL",
  },
  {
    id: 11,
    name: "Borussia Dortmund",
    shortName: "BVB",
    league: "Bundesliga",
    country: "Germany 🇩🇪",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
    titles: "1 UCL",
  },
  {
    id: 12,
    name: "Juventus",
    shortName: "JUV",
    league: "Serie A",
    country: "Italy 🇮🇹",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
    titles: "2 UCL",
  },
];

const Team = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ---------- HEADER STRIP ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Club Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Featured Football Clubs
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Browse the most storied clubs, historical honors, and squad rosters.
          </p>
        </div>

        <Link
          to="/teams"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/80 hover:border-primary/50 text-foreground text-xs sm:text-sm font-bold shadow-sm hover:text-primary transition-all w-fit group"
        >
          <span>View All 50+ Teams</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ---------- 12 CLUBS BADGE GRID ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {topClubs.map((club) => (
          <div
            key={club.id}
            onClick={() => navigate(`/teams`)}
            className="group relative flex flex-col items-center justify-between p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center"
          >
            {/* Top Badge: Trophy count */}
            <span className="self-end px-2 py-0.5 rounded-md bg-muted/80 text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors">
              {club.titles}
            </span>

            {/* Club Crest with Glow */}
            <div className="relative my-3 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 rounded-xl bg-background/50 border border-border/40 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-300">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-contain filter drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Club Title & League */}
            <div className="w-full">
              <h3 className="font-extrabold text-xs sm:text-sm text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
                {club.name}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {club.league}
              </p>
            </div>

            {/* Subtle hover pill */}
            <div className="mt-3 w-full py-1 rounded-lg bg-primary/0 group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20 text-primary text-[10px] font-bold transition-all">
              Squad Details →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
