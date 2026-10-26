import React from "react";
import HeroIntro from "../components/HomeComponent/HeroIntro";
import HeadIMG from "../components/HomeComponent/HeadImg";
import Team from "../components/HomeComponent/Team";
import RivalryBanner from "../components/HomeComponent/RivalryBanner";
import Trendingplayer from "../components/HomeComponent/TrendingPlayer";
import CtaBanner from "../components/HomeComponent/CtaBanner";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-10 pb-16">
      {/* 1. Header & Live Search */}
      <HeroIntro />

      {/* 2. Superstar Spotlight Carousel */}
      <HeadIMG />

      {/* 3. 12 European Giant Clubs Badge Grid */}
      <Team />

      {/* 4. Matchday Clash Spotlight (El Clásico) */}
      <RivalryBanner />

      {/* 5. In-Form Trending Stars with FotMob Ratings */}
      <Trendingplayer />

      {/* 6. Join the Hub / Collector Call-to-Action */}
      <CtaBanner />
    </div>
  );
};

export default Home;
