import axios from "axios";
import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const Leagues = () => {
  const Leagues = [
    {
      id: 1,
      countryName: "England",
      name: "Premier league",
      teamsCount: 20,
      color: "bg-[#3d195a]",
      logo: "https://assets.football-logos.cc/logos/england/512x512/english-premier-league.b597f797.png",
    },
    {
      id: 2,
      countryName: "Spain",
      name: "Laliga",
      teamsCount: 20,
      color: "bg-[#ff4b4b]",
      logo: "https://logos-world.net/wp-content/uploads/2023/07/LaLiga-Logo.png",
    },
    {
      id: 3,
      countryName: "Italy",
      name: "Seria A",
      teamsCount: 20,
      color: "bg-[#002f6c]",
      logo: "https://logos-world.net/wp-content/uploads/2025/07/Italian-Serie-A-Logo-500x281.png",
    },
    {
      id: 4,
      countryName: "Germany",
      name: "Bundesliga",
      teamsCount: 18,
      color: "bg-[#df0000]",
      logo: "https://logos-world.net/wp-content/uploads/2025/04/Bundesliga-Logo-500x281.png",
    },
    {
      id: 5,
      countryName: "France",
      name: "Ligue 1",
      teamsCount: 18,
      color: "bg-[#002f6c]",
      logo: "https://logos-world.net/wp-content/uploads/2024/06/Ligue-1-Logo-New-500x281.png",
    },
  ];

  // useEffect(() => {
  //   const getTeams = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5174/footballTeams.json");
  //       console.log(res);
  //     } catch (error) {
  //       console.log("Error fetching teams:", error);
  //     }
  //   };
  //   getTeams();
  // }, []);
  return (
    <>
      <div className=" min-h-screen bg-slate-900 text-white p-3 md:p-6">
        <header>
          <h1 className="text-4xl  font-extrabold font-serif">
            Select a league
          </h1>
          <p className="text-white/50">
            Explore the league and find your club then connect
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 mx-10">
          {Leagues.map((val) => (
            <div className={`${val.color} hover:cursor-pointer rounded-lg hover:scale-[1.08]  hover:border-transparent `}>
              <div className="flex justify-between mx-6">
                <span>{val.id}</span>
                <span>{val.countryName}</span>
              </div>
              <div className="bg-slate-400  flex  items-center justify-center text-center gap-5">
                <div className="h-32 overflow-hidden rounded-lg mt-2">
                  <img className="object-cover h-full w-full " src={val.logo} />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-extrabold text-3xl font-serif">
                    {val.name}
                  </h1>
                  <p>{val.teamsCount} Teams</p>
                </div>
              </div>
              <div className="flex justify-between mx-3 hover:cursor-pointer">
                <p>Explore teams </p>
                <button className="hover:cursor-pointer">
                  <span>
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Leagues;
