import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { footballApi } from "../../services/footballApi";

const matchData = [
  {
    id: "m-ucl-1",
    competition: "UCL Quarter-Final",
    leagueCode: "ucl",
    stage: "Leg 1 of 2",
    date: "Apr 9 • 20:00",
    status: "UPCOMING",
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
    id: "m-epl-1",
    competition: "Premier League",
    leagueCode: "epl",
    stage: "Matchday 27",
    date: "Apr 18 • 17:30",
    status: "UPCOMING",
    home: {
      name: "Arsenal",
      short: "ARS",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      score: null,
    },
    away: {
      name: "Man City",
      short: "MCI",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      score: null,
    },
  },
  {
    id: "m-ucl-2",
    competition: "UCL Round of 16",
    leagueCode: "ucl",
    stage: "Leg 2 (Agg 3-1)",
    date: "FT",
    status: "FT",
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
  },
  {
    id: "m-ita-1",
    competition: "Serie A",
    leagueCode: "seriea",
    stage: "Matchday 25",
    date: "FT",
    status: "FT",
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
  },
  {
    id: "m-ger-1",
    competition: "Bundesliga",
    leagueCode: "bundesliga",
    stage: "Matchday 23",
    date: "FT",
    status: "FT",
    home: {
      name: "Bayern Munich",
      short: "BAY",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
      score: 3,
    },
    away: {
      name: "Frankfurt",
      short: "SGE",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg",
      score: 0,
    },
  },
];

const MatchTicker = () => {
  const [filter, setFilter] = useState("all");
  const [liveMatches, setLiveMatches] = useState(matchData);

  useEffect(() => {
    let isMounted = true;
    footballApi
      .getFixtures()
      .then((res) => {
        if (!isMounted || !res.fixtures || res.fixtures.length === 0) return;
        const mapped = res.fixtures.slice(0, 10).map((f) => ({
          id: f.id,
          competition: f.competition?.name || "Match",
          leagueCode: (f.competition?.name || "").toLowerCase().includes("champions")
            ? "ucl"
            : (f.competition?.name || "").toLowerCase().includes("premier")
            ? "epl"
            : "other",
          date: f.status.isLive ? `${f.status.label}` : f.status.isFinished ? "FT" : f.localKickoff,
          status: f.status.isFinished ? "FT" : f.status.isLive ? "LIVE" : "UPCOMING",
          home: {
            name: f.home.name,
            short: f.home.short,
            logo: f.home.logo,
            score: f.home.score,
          },
          away: {
            name: f.away.name,
            short: f.away.short,
            logo: f.away.logo,
            score: f.away.score,
          },
        }));
        setLiveMatches(mapped);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMatches = liveMatches.filter((m) => {
    if (filter === "all") return true;
    if (filter === "ucl") return m.leagueCode === "ucl";
    if (filter === "epl") return m.leagueCode === "epl";
    return true;
  });

  return (
    <section className="w-full border-b border-border bg-surface-base/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left label & quick filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-bold text-foreground uppercase tracking-wider">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="hidden sm:inline">Matchday Desk</span>
            </span>

            <div className="hidden md:flex items-center gap-1 border-l border-border pl-2">
              {[
                { id: "all", label: "All" },
                { id: "ucl", label: "UCL" },
                { id: "epl", label: "Premier League" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    filter === f.id
                      ? "bg-surface-elevated text-primary font-bold border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal scrollable match cards */}
          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1">
            {filteredMatches.map((m) => {
              const isFinished = m.status === "FT";
              const isLive = m.status === "LIVE";

              return (
                <Link
                  key={m.id}
                  to={`/fixtures/${m.id}`}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-md bg-card border border-border hover:border-primary transition-colors shrink-0 text-left"
                >
                  {/* Competition & status */}
                  <div className="flex flex-col text-[10px] leading-tight">
                    <span className="font-semibold text-muted-foreground truncate max-w-[80px]">
                      {m.competition}
                    </span>
                    <span
                      className={`font-mono font-bold mt-0.5 ${
                        isLive ? "text-primary animate-pulse" : isFinished ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {m.date}
                    </span>
                  </div>

                  <div className="h-6 w-px bg-border" />

                  {/* Teams & Scores */}
                  <div className="flex flex-col gap-1 min-w-[110px]">
                    {/* Home */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <img
                          src={m.home.logo}
                          alt={m.home.name}
                          className="size-3.5 object-contain shrink-0"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {m.home.short}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-foreground">
                        {isFinished || isLive ? m.home.score ?? 0 : "—"}
                      </span>
                    </div>

                    {/* Away */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <img
                          src={m.away.logo}
                          alt={m.away.name}
                          className="size-3.5 object-contain shrink-0"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {m.away.short}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-foreground">
                        {isFinished || isLive ? m.away.score ?? 0 : "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right link to leagues/fixtures */}
          <Link
            to="/fixtures"
            className="hidden lg:flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            <span>All Fixtures</span>
            <ChevronRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MatchTicker;

