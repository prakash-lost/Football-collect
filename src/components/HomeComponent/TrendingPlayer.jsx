import React from "react";
import { Link } from "react-router";
import { Flame, Star, ArrowRight } from "lucide-react";

const trendPlayer = [
  {
    id: "raphinha",
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
    appearance: "4",
    form: "On Fire 🔥",
  },
  {
    id: "lamine-yamal",
    image:
      "https://i.pinimg.com/736x/ee/ac/43/eeac43ed02a73ea08935f8c4faff7a20.jpg",
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
    appearance: "5",
    form: "Sensational 🌟",
  },
  {
    id: "kylian-mbappe",
    image:
      "https://i.pinimg.com/1200x/7c/31/90/7c3190475b42a989a95df8e6677217e7.jpg",
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
    appearance: "5",
    form: "Electric ⚡",
  },
  {
    id: "erling-haaland",
    image:
      "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg?auto=webp&format=pjpg&width=3840&quality=60",
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
    appearance: "4",
    form: "Lethal 🎯",
  },
  {
    id: "harry-kane",
    image:
      "https://i.pinimg.com/736x/88/64/a4/8864a40106890c8ea92496df98bcf23f.jpg",
    displayName: "Vinícius Jr",
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
];

const Trendingplayer = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ---------- SECTION HEADER ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>Form & Performance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Trending Superstars
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Top performing stars based on matchday ratings and decisive goal contributions.
          </p>
        </div>

        <Link
          to="/players"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors w-fit group"
        >
          <span>View All Players</span>
          <ArrowRight className="w-3.5 h-3.5 text-primary" />
        </Link>
      </div>

      {/* ---------- PLAYERS CARDS GRID ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {trendPlayer.map((player) => (
          <Link
            key={player.id}
            to={`/players/${player.id}`}
            className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary transition-colors cursor-pointer"
          >
            {/* Top Bar: Jersey Number & Match Rating */}
            <div className="flex items-center justify-between p-3 pb-0">
              <span className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-[11px] font-mono font-bold text-foreground">
                #{player.number}
              </span>

              {/* Match Rating */}
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-primary text-xs font-mono font-bold">
                <Star className="w-3 h-3 fill-primary" />
                <span>{player.averageRating}</span>
              </div>
            </div>

            {/* Player Photo with Club Badge Overlay */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden mt-2 bg-[#111310]">
              <img
                src={player.image}
                alt={player.displayName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />

              {/* Dark vignette over bottom photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

              {/* Club Crest Floating Pill */}
              <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-card/95 border border-border">
                <img
                  src={player.clubimage}
                  alt={player.clubName}
                  className="w-3.5 h-3.5 object-contain"
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

export default Trendingplayer;
