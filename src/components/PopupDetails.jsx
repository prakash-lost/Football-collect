import React from "react";

const Popupdetails = ({ players, onClose }) => {
//   if (!player) return null;
  return (
    
      <div
        // onClick={onClose}
        
        className="fixed inset-0 z-50  flex items-center justify-center backdrop-blur-md bg-black/60 p-4"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 text-4xl pr-8 hover:text-white"
          >
            x
          </button>
          <div className="flex flex-col sm:flex-row gap-4 text-white">
            <div></div>
            <div className="flex items-center justify-center bg-transparent p-4 sm:w-1/3 w-100 h-100 rounded-lg overflow-hidden shadow-md">
              <img
                className="w-full h-full object-cover "
                src={players.strRender}
                alt={players.strPlayer}
              />
            </div>
            <div className="w-150">
              <h1 className="font-bold text-4xl mb-4">{players.strPlayer}</h1>
              <p className="text-xl font-semibold">{players.strNationality}</p>
              <p className="text-xl font-semibold">{players.strPosition}</p>
              <p className="text-xl font-semibold">{players.strTeam}</p>
              <p>{players.strNumber}</p>
              <p>{players.strSigning}</p>
              <p>{players.strBirthLocation}</p>
              <p>{players.strEthnicity}</p>
              <p className="mb-4">{players.strStatus}</p>
              <p className="text-sm line-clamp-6">{players.strDescriptionEN}</p>
            </div>
          </div>
          {/* <div className="flex justify-center items-center mt-8 p-3">
            <button className="bg-white text-red-700 " onClick={onClose}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    
  );
};

export default Popupdetails;
