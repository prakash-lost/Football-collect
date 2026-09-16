import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram, FaFacebook } from "react-icons/fa";
// import {  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { IoShieldOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { IoTrophySharp } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";

const Footer = () => {
  return (
    <div className=" bg-blue-950 w-full ">
      <div className="text-white mb-3 border-b-2 p-8 flex flex-col sm:flex-row justify-between items-center flex-wrap sm:p-8">
        <div className="mb-8 text-center  order-1 ">
          <h1 className="font-bold text-2xl font-serif ">
            <span className="">⚽</span>FOOTBALL HUB
            <span className="">⚽</span>
          </h1>
          <p className="mt-3">
            Your place for teams, players, stats & football information.
          </p>
          <div className="text-start flex gap-6 mt-6">
            <div>
              <IoShieldOutline className="ml-6" />
              50+ Teams
            </div>
            <div>
              <MdGroups className="ml-6" />
              500+ Players
            </div>
            <div>
              <IoTrophySharp className="ml-6" />
              12+ Leagues
            </div>
            <div>
              <IoEarth className="ml-6" />
              80+ Countries
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between  gap-10 order-2 ">
          <section>
            <h1 className="font-bold">EXPLORE</h1>
            <ul className="list-disc">
              <li>Home</li>
              <li> Players</li>
              <li> Teams</li>
              <li> Competitions</li>
            </ul>
          </section>
          <section>
            <h1 className="font-bold">FOOTBALL</h1>
            <ul className="list-disc">
              <li>Teams</li>
              <li>Players</li>
              <li>Leagues</li>
              <li>Ranking</li>
            </ul>
          </section>
          <section>
            <h1 className="font-bold">INFORMATION</h1>
            <ul className="list-disc">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy policy</li>
              <li>Terms</li>
            </ul>
          </section>
        </div>
        <div className="mb-8 text-center  order-3 ">
          <h1 className="font-bold text-2xl font-serif mb-6 pt-2">
            Stay Updated
          </h1>
          <p>
            Follow us for more intresting content <br />
          </p>
          <div className="mt-4 ">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black rounded-md mr-2 "
            />
            <button className="bg-slate-500 p-1 rounded-md">
              <FaLocationArrow />
            </button>
          </div>
        </div>
      </div>

      <div className="text-white flex flex-row justify-between mx-20 pb-5">
        <div>
          <p>
            Follow Football Hub <br />[ Youtube ] [ Instagram ] [ Facebook ] [ X
            ] [ Linkeden ] [ GitHub ]
          </p>
        </div>
        <div>
          <div>
            © 2026 Football Hub ⚽<span className="">All rights reserved</span>
            <br />
            <div className=" flex gap-4 justify-center mt-3">
              <AiOutlineYoutube />
              <FaInstagram />
              <FaFacebook />
              <FaXTwitter />
              <FaLinkedin />
              <FaSquareGithub />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
