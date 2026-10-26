import React from "react";
import { Link } from "react-router";
import { Flame, Star, Trophy, ArrowRight } from "lucide-react";
import { IoFootballOutline } from "react-icons/io5";

const trendPlayer = [
  {
    image:
      "https://cdn.resfu.com/media/img_news/raphinha--l--celebra-uno-de-sus-goles-en-el-barcelona-valencia-de-primera-division-2025-26--efe-alejandro-garcia.jpg?size=1000x&lossy=1",
    displayName: "Raphinha",
    fullName: "Raphael Dias Belloli",
    clubName: "FC Barcelona",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    position: "RW / CF",
    number: "11",
    averageRating: "8.73",
    goal: "6",
    assist: "1",
    appreance: "4",
    form: "On Fire 🔥",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    displayName: "Lamine Yamal",
    fullName: "Lamine Yamal Nasraoui",
    clubName: "FC Barcelona",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    position: "Right Winger",
    number: "19",
    averageRating: "8.50",
    goal: "6",
    assist: "3",
    appreance: "5",
    form: "Sensational 🌟",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    displayName: "Kylian Mbappé",
    fullName: "Kylian Mbappé Lottin",
    clubName: "Real Madrid",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    position: "Striker",
    number: "9",
    averageRating: "8.60",
    goal: "6",
    assist: "2",
    appreance: "5",
    form: "Electric ⚡",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    displayName: "Erling Haaland",
    fullName: "Erling Braut Haaland",
    clubName: "Manchester City",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    position: "Center Forward",
    number: "9",
    averageRating: "8.70",
    goal: "4",
    assist: "1",
    appreance: "4",
    form: "Lethal 🎯",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCO4oSUiNgYPRBRJW6QBwDAIeiZl0H18-tc4jp84ttA&s=10",
    displayName: "Harry Kane",
    fullName: "Harry Edward Kane",
    clubName: "Bayern Munich",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_Munchen_logo.svg",
    position: "Center Forward",
    number: "9",
    averageRating: "8.80",
    goal: "2",
    assist: "1",
    appreance: "2",
    form: "Clinical 👑",
  },
];

const Trendingplayer = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* ---------- SECTION HEADER ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Form & Ratings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Trending Superstars
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Top performing stars based on match ratings and decisive goal
            contributions.
          </p>
        </div>

        <Link
          to="/players"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors w-fit group"
        >
          <span>View All 500+ Players</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ---------- PLAYERS CARDS GRID ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {trendPlayer.map((player, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Top Bar: Jersey Number & Match Rating */}
            <div className="relative z-10 flex items-center justify-between p-3 pb-0">
              <span className="px-2 py-0.5 rounded-md bg-muted/80 border border-border/60 text-[11px] font-mono font-bold text-foreground">
                #{player.number}
              </span>

              {/* FotMob Style Star Rating */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold shadow-sm">
                <Star className="w-3 h-3 fill-emerald-400" />
                <span>{player.averageRating}</span>
              </div>
            </div>

            {/* Player Photo with Club Badge Overlay */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden mt-2 bg-gradient-to-b from-transparent to-black/20">
              <img
                src={player.image}
                alt={player.displayName}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Vignette over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

              {/* Club Crest Floating Pill */}
              <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/70 shadow-md">
                <img
                  src={player.clubimage}
                  alt={player.clubName}
                  className="w-4 h-4 object-contain"
                />
                <span className="text-[10px] font-bold text-foreground tracking-tight">
                  {player.clubName}
                </span>
              </div>
            </div>

            {/* Player Identity */}
            <div className="p-4 pt-2 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {player.displayName}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  {player.position}
                </p>
              </div>

              {/* Mini Stats Strip (Goals, Assists, Matches) */}
              <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-3 gap-1.5 text-center bg-muted/30 -mx-1 px-2 py-2 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Goals
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    {player.goal}
                  </span>
                </div>
                <div className="border-x border-border/60">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Assists
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    {player.assist}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Matches
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    {player.appreance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trendingplayer;
