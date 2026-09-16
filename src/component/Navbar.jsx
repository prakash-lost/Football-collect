import React, { useState } from "react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import LoginForm from "../pages/LoginForm";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50">
      <div className=" px-3 sm:px-8 min-h-16 py-2 flex justify-between items-center   font-bold  bg-blue-950 text-slate-100 flex-wrap sm:flex-row flex-col">
        <div className=" flex ">
          <img
            className="h-10 w-10 sm:h-15 sm:w-14  invert   "
            src="./footballlogo.png"
          />
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-8 items-center text-base sm:text-lg font-serif">
          <Link to={"/"}>Home </Link>
          {/* <Link to={"aboutus"}>About us </Link> */}
          {/* <Link to={"contactus"}>Contact us </Link> */}
          <Link to={"players"}>Players </Link>
          <Link to={"leagues"}>Leagues</Link>
          <Link to={"teams"}>Teams </Link>
          <Link to={"news"}>News </Link>
        </div>
        <div className="flex flex-wrap mr-2 sm:mr-8 gap-4 sm:gap-8 items-center">
          <div className="hidden sm:flex bg-white  items-center focus-within:ring-2 rounded-full ">
            <input
              name="search"
              className=" focus:outline-none w-40 h-7 pl-4 text-sm text-black "
              placeholder="Search"
              type="text"
            />
          </div>
          <button className="sm:hidden text-white" onClick={()=>{setMobileSearchOpen(!mobileSearchOpen)}}>
            <FaSearch className=" pr-2" />
          </button>
          <div className="flex flex-row gap-1">
            <Link to={"profile"}>
              <button className=" bg-slate-700 hover:bg-slate-500 text-white  px-2 py-1 sm:p-2 text-xs sm:text-sm rounded-md hover:cursor-pointer">
                Profile
              </button>
            </Link>
            {/* <Link to={"login"}> */}
            <button
              onClick={() => setClicked(true)}
              className=" bg-slate-700 hover:bg-slate-500 text-white  px-2 py-1 sm:p-2 text-xs sm:text-sm rounded-md hover:cursor-pointer"
            >
              Login
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      {clicked && <LoginForm onclose={() => setClicked(false)} />}
      {mobileSearchOpen && (
        <div className="sm:hidden w-full px-3 pb-2 bg-blue-950 ">
          <input
            name="mobile-search"
            className="focus:outline-none w-full h-8 pl-4 rounded-full text-sm text-white border-white border-2"
            placeholder="Search"
            type="text"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
