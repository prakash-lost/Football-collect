import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamsPage = () => {
  const [putTeams,getPutTeams]=useState();
  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5173/footballTeams.json");
        console.log(res.data);
      } catch (err) {
        console.log("fetching error :",err);
      }
    };
    getTeams();
  },[]);
  return <div>teams</div>;
};

export default TeamsPage;
