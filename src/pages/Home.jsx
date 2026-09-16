import React from "react";
import Trendingplayer from "../component/Trendingplayer";
import Tables from "../component/Tables";
import Latestscore from "../component/Latestscore";
import Team from "../component/Team";
import News from "../component/News";
import Transfer from "../component/Transfer";
import HeadIMG from "../component/HeadIMG";

const Home = () => {
  return (
    <div className="flex flex-col bg-slate-900 text-white">
      <HeadIMG />

      <div className=" p-4 flex flex-col gap-4 min-h-screen ">
        <Trendingplayer />

        
        {/* <Transfer /> */}
        <Team/>
      </div>
    </div>
  );
};

export default Home;
