import React from "react";
import { Link } from "react-router";
import { Flame, Star, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

const trendPlayer = [
  {
    id: "lamine-yamal",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    displayName: "Lamine Yamal",
    fullName: "Lamine Yamal Nasraoui",
    clubName: "FC Barcelona",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    position: "Right Winger",
    number: "19",
    averageRating: "8.85",
    goal: "6",
    assist: "5",
    appearance: "5",
    form: "Sensational 🌟",
  },
  {
    id: "erling-haaland",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    displayName: "Erling Haaland",
    fullName: "Erling Braut Haaland",
    clubName: "Man City",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    position: "Striker",
    number: "9",
    averageRating: "8.90",
    goal: "7",
    assist: "1",
    appearance: "4",
    form: "Unstoppable 🤖",
  },
  {
    id: "kylian-mbappe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    displayName: "Kylian Mbappé",
    fullName: "Kylian Mbappé Lottin",
    clubName: "Real Madrid",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    position: "Striker",
    number: "9",
    averageRating: "8.70",
    goal: "6",
    assist: "2",
    appearance: "5",
    form: "Electric ⚡",
  },
  {
    id: "vinicius-jr",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Vinicius_Junior_2024.jpg",
    displayName: "Vinícius Jr.",
    fullName: "Vinícius José Paixão de Oliveira Júnior",
    clubName: "Real Madrid",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    position: "Left Winger",
    number: "7",
    averageRating: "8.80",
    goal: "5",
    assist: "4",
    appearance: "5",
    form: "Clinical 👑",
  },
  {
    id: "jude-bellingham",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Jude_Bellingham_2024.jpg",
    displayName: "Jude Bellingham",
    fullName: "Jude Victor William Bellingham",
    clubName: "Real Madrid",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    position: "Attacking Midfielder",
    number: "5",
    averageRating: "8.75",
    goal: "5",
    assist: "4",
    appearance: "5",
    form: "Maestro 💫",
  },
];

const TrendingPlayer = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ---------- SECTION HEADER ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <div>
          <Badge variant="secondary" size="default" className="mb-1.5">
            <Flame className="size-3.5 text-primary" />
            <span>Form & Performance</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            In-Form Superstars
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Top performing stars based on matchday ratings and decisive goal contributions.
          </p>
        </div>

        <Link
          to="/players"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors w-fit group"
        >
          <span>View All 27 Player Profiles</span>
          <ArrowRight className="size-3.5 text-primary" />
        </Link>
      </div>

      {/* ---------- PLAYERS CARDS GRID ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {trendPlayer.map((player) => (
          <Link
            key={player.id}
            to={`/players/${player.id}`}
            className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary transition-colors cursor-pointer"
          >
            {/* Top Bar: Jersey Number & Match Rating */}
            <div className="flex items-center justify-between p-3 pb-0">
              <Badge variant="secondary" size="sm" className="font-mono font-bold">
                #{player.number}
              </Badge>

              {/* Match Rating */}
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-primary text-xs font-mono font-bold">
                <Star className="size-3 fill-primary" />
                <span>{player.averageRating}</span>
              </div>
            </div>

            {/* Player Photo with Club Badge Overlay */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden mt-2 bg-surface-base">
              <img
                src={player.image}
                alt={player.displayName}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark vignette over bottom photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

              {/* Club Crest Floating Pill */}
              <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-card/95 border border-border">
                <img
                  src={player.clubimage}
                  alt={player.clubName}
                  className="size-3.5 object-contain"
                />
                <span className="text-[10px] font-bold text-foreground tracking-tight">
                  {player.clubName}
                </span>
              </div>
            </div>

            {/* Player Identity */}
            <div className="p-3.5 pt-2 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {player.displayName}
                </h3>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {player.position}
                </p>
              </div>

              {/* Mini Stats Strip (Goals, Assists, Matches) */}
              <div className="mt-3 pt-2 border-t border-border grid grid-cols-3 gap-1 text-center bg-surface-elevated/40 px-2 py-1.5 rounded-md border border-border">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Goals
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {player.goal}
                  </span>
                </div>
                <div className="border-x border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Assists
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {player.assist}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Matches
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {player.appearance}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingPlayer;
