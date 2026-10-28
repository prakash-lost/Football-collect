import React from "react";
import MatchTicker from "../components/HomeComponent/MatchTicker";
import EditorialHero from "../components/HomeComponent/EditorialHero";
import LeagueHighlights from "../components/HomeComponent/LeagueHighlights";
import TrendingPlayer from "../components/HomeComponent/TrendingPlayer";
import Team from "../components/HomeComponent/Team";
import CtaBanner from "../components/HomeComponent/CtaBanner";

const Home = () => {
  return (
    <div className="w-full flex flex-col pb-16">
      {/* 1. Matchday Desk & Live Fixtures Ticker */}
      <MatchTicker />

      {/* 2. Editorial Lead Story, Breaking Wire & Quick Database Search */}
      <EditorialHero />

      {/* 3. League Highlights, Standings & Continental Statistics */}
      <LeagueHighlights />

      {/* 4. In-Form Superstars with Matchday Ratings */}
      <TrendingPlayer />

      {/* 5. 12 European Giant Clubs Directory */}
      <Team />

      {/* 6. Database Discovery Call-to-Action */}
      <CtaBanner />
    </div>
  );
};

export default Home;
