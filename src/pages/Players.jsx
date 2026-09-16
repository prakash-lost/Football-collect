import axios from "axios";
import React, { useEffect, useState } from "react";
import Popupdetails from "../component/Popupdetails";

const Players = () => {
  const [items, setItems] = useState([]);
  const [clicked, setClicked] = useState(null);
  const Listitems = async () => {
    try {
      const { data } = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=133739`,
      );
      console.log(data.player);
      setItems(data.player);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Listitems();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 justify-evenly bg-slate-900">
      {items.length > 0 &&
        items.map((val) => (
          <div
            key={val.idPlayer}
            onClick={() => setClicked(val)}
            className="  gap-3 my-2 flex justify-center text-white "
          >
            <div className="rounded-lg bg-slate-800 h-100 w-80 flex-col  ">
              <div className="h-90 w-90 rounded-2xl overflow-hidden  flex justify-center  items-center">
                <img
                  className=" p-10 object-cover h-full w-full "
                  src={val.strRender}
                  alt={val.strPlayerAlternate}
                  onError={(e) => {
                    e.target.src = "footballlogo.png";
                  }}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl text-center">{val.strPlayer}</h1>
                {/* <p>{val.strPosition}</p>
                <p>{val.strNationality}</p>
                <p>{val.strNumber}</p>
                <p>{val.strTeam}</p> */}
              </div>
            </div>
          </div>
        ))}
      {clicked && (
        <Popupdetails players={clicked} onClose={() => setClicked(null)} />
      )}

      {/* {clicked && (
        <div
          onClick={() => setClicked(null)}
          className="fixed inset-0 z-50 md:z-50 flex items-center justify-center backdrop-blur-md bg-black/60 p-4"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setClicked(null)}
              className="absolute top-4 right-4 text-red-500 text-4xl pr-8 hover:text-white"
            >
              x
            </button>
            <div className="flex flex-col sm:flex-row gap-4 text-white">
              <div></div>
              <div className="flex items-center justify-center bg-transparent p-4 sm:w-1/3 w-100 h-100 rounded-lg overflow-hidden shadow-md">
                <img
                  className="w-full h-full object-cover "
                  src={clicked.strRender}
                  alt={clicked.strPlayer}
                />
              </div>
              <div className="w-150">
                <h1 className="font-bold text-4xl mb-4">{clicked.strPlayer}</h1>
                <p className="text-xl font-semibold">
                  {clicked.strNationality}
                </p>
                <p className="text-xl font-semibold">{clicked.strPosition}</p>
                <p className="text-xl font-semibold">{clicked.strTeam}</p>
                <p>{clicked.strNumber}</p>
                <p>{clicked.strSigning}</p>
                <p>{clicked.strBirthLocation}</p>
                <p>{clicked.strEthnicity}</p>
                <p className="mb-4">{clicked.strStatus}</p>
                <p className="text-sm line-clamp-6">
                  {clicked.strDescriptionEN}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Players;
