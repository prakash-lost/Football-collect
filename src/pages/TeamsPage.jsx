import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamsPage = () => {
  const [putTeams, setPutTeams] = useState();
  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5173/footballTeams.json");
        console.log(res.data);
        setPutTeams(res.data);
        console.log(`received`, putTeams);
      } catch (err) {
        console.log("fetching error :", err);
      }
    };
    getTeams();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 hover:cursor-pointer">
      {putTeams.map((member) => (
        <div
          key={member.id}
          className="h-32 overflow-hidden rounded-lg mt-2 hover:scale-[1.05]"
        >
          <img
            src={member.name}
            alt={member.name}
            className="object-cover h-full w-full bg-slate-900"
          />
        </div>
      ))}
    </div>
  );
};

export default TeamsPage;
