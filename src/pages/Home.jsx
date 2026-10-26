import React from "react";
import TrendingPlayer from "../components/TrendingPlayer";
import Tables from "../components/Tables";
import LatestScore from "../components/LatestScore";
import Team from "../components/Team";
import News from "../components/News";
import Transfer from "../components/Transfer";
import HeadImg from "../components/HeadImg";

const Home = () => {
  return (
    <div className="bg-background text-foreground">
      <HeadImg />

      <div className="p-4 flex flex-col gap-4 min-h-screen bg-background text-foreground">
        <TrendingPlayer />

        {/* <Transfer /> */}
        <Team />
      </div>
    </div>
  );
};

export default Home;
