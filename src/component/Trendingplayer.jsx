import React, { useState } from "react";
import { GiClick } from "react-icons/gi";
// import {useState} from "react";

const trendPlayer = [
  {
    image:
      "https://cdn.resfu.com/media/img_news/raphinha--l--celebra-uno-de-sus-goles-en-el-barcelona-valencia-de-primera-division-2025-26--efe-alejandro-garcia.jpg?size=1000x&lossy=1",
    fullName: "Raphael Dias Belloli (Raphinha)",
    clubimage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEddfPbjPKGZFTw543hWiOo2KeUaG1IBIbhvrCiPXtIg&s",
    position: "Center forward",
    number: "11",
    averageRating: "8.73",
    goal: "6",
    assist: "1",
    appreance: "4",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    fullName: "Lamine Yamal Nasraoui Ebana",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    position: "Right winger",
    number: "10",
    averageRating: "8.50",
    goal: "6",
    assist: "3",
    appreance: "5",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    fullName: "Kylian Mbappé Lottin",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    position: "Center forward",
    number: "9",
    averageRating: "8.60",
    goal: "6",
    assist: "2",
    appreance: "5",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    fullName: "Erling Haaland",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    position: "Center forward",
    number: "9",
    averageRating: "8.70",
    goal: "4",
    assist: "1",
    appreance: "4",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCO4oSUiNgYPRBRJW6QBwDAIeiZl0H18-tc4jp84ttA&s=10",
    fullName: "Harry Edward Kane",
    clubimage:
      "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_Munchen_logo.svg",
    position: "Center forward",
    number: "9",
    averageRating: "8.80",
    goal: "2",
    assist: "1",
    appreance: "2",
  },
];

const Trendingplayer = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div 
        onClick={() => setClicked(!clicked)}
        className="flex justify-center items-center h-15 bg-slate-800 gap-3 text-xl  hover:text-slate-300 hover:cursor-pointer hover:scale-[1.02]"
      >
        <h1 className="font-bold">Trending players</h1>
        <span>
          <GiClick className="" />
        </span>
      </div>
      {clicked && (
        <div className="w-full  overflow-x-auto">
          <div className="flex  flex-wrap gap-4 w-max ">
            {trendPlayer.map((val, i) => {
              return (
                <div
                  key={i}
                  className="w-56 border-2 bg-slate-700 border-black rounded-2xl p-4 "
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-slate-900 text-xs px-2 py-1 rounded-full">
                      #{val.number}
                    </span>
                    <span className="bg-green-600 text-xs px-2 py-1 rounded-full">
                      {val.averageRating}
                    </span>
                  </div>

                  <div className="h-32 overflow-hidden rounded-lg mt-2">
                    <img
                      src={val.image}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {/* <div className="h-10 w-12 overflow-hidden rounded-md ">
                      <img
                        src={val.clubimage}
                        className="object-cover h-full w-full"
                      />
                    </div> */}
                    <div className="overflow-hidden">
                      <h1 className="text-sm font-semibold truncate">
                        {val.fullName}
                      </h1>
                      <p className="text-xs text-slate-400">{val.position}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-300 mt-3 border-t border-slate-600 pt-2">
                    <span>G {val.goal}</span>
                    <span>A {val.assist}</span>
                    <span>App {val.appreance}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Trendingplayer;
