import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamsPage = () => {
  const [putTeams, setPutTeams] = useState([]);
  const [visible, setVisible] = useState(12);
  const HandleVisible = () => {
    setVisible((prev) => prev + 8);
  };
  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5173/footballTeams.json");
        console.log(res.data.teams);
        setPutTeams(res.data.teams);
        console.log(`received`, putTeams);
      } catch (err) {
        console.log("fetching error :", err);
      }
    };
    getTeams();
  }, []);
  // useEffect(()=>{

  //   console.log(`received`,putTeams)
  // },[putTeams])
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4  gap-4 hover:cursor-pointer">
        {putTeams.slice(0, visible).map((member) => (
          <div
            key={member.id}
            className=" overflow-hidden rounded-lg text-white mt-2 hover:scale-[1.05]"
          >
            <img
              src={member.logo}
              alt={member.shortName}
              className="object-contain  bg-slate-900"
            />
          </div>
        ))}
      </div>
      {visible < putTeams.length && (
        <div className="w-full flex justify-center items-center my-6">
          <button
            onClick={HandleVisible}
            className="bg-orange-500 text-white rounded-lg px-4 py-2 text-center font-medium  hover:bg-orange-600 hover:scale-110 active:scale-70" 
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default TeamsPage;
