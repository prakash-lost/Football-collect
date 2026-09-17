import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { useNavigate } from "react-router";

const teamMembers = [
   
  {
    id: 1,
    name: "Member 1",
    image:
      "https://logomaster.ai/assets/site/6e/6e82e3cc39fa31bfe07ede40fd6011838bf9fa7e27b2ff51ff26446ccc66b56a.jpg",
  },
  {
    id: 2,
    name: "Member 2",
    image:
      "https://logomaster.ai/assets/site/69/695dfb4f26feca17f89b7ed2c534290358ea7cd69d59ff8fb70a89a92a679c8f.jpg",
  },
  {
    id: 3,
    name: "Member 3",
    image:
      "https://logomaster.ai/assets/site/f6/f6b7c3e4457888530433b31558bade2ee9601c24f31cac851714ee4356bf5fd7.jpg",
  },
  {
    id: 4,
    name: "Member 4",
    image:
      "https://logomaster.ai/assets/site/2f/2faee9f2b26e451bf3a60fb1d35ac48548f97803dbac63c5804f0202ef69835c.jpg",
  },
  {
    id: 5,
    name: "Member 5",
    image:
      "https://logomaster.ai/assets/site/8c/8c096d9f0bd298a39a9cf5fb5432d792220abcb34e0fff1bd3268fabb576e817.jpg",
  },
  {
    id: 6,
    name: "Member 6",
    image:
      "https://logomaster.ai/assets/site/91/9180cb4fd5623896dd391a54ddd44660f925c45bdf494f38ffcfa47e61d3a834.jpg",
  },
  {
    id: 7,
    name: "Member 7",
    image:
      "https://logomaster.ai/assets/site/1c/1c13d3b4f23a2dc3ef9da93ca46780a0a689347aad44967bbcf76dc6a860a43d.jpg",
  },
  {
    id: 8,
    name: "Member 8",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_b02rBOsLeZpZ8iz4W69Wr26Oaem1HS4Ng9OI6O1DJyVzDyWgvVYjZhs&s=10",
  },
  {
    id: 9,
    name: "Member 9",
    image:
      "https://logomaster.ai/assets/site/d8/d86d4da34672d93356262fa698e6bb39c6e30da4affad5e6b7d5ddeb9e38a330.jpg",
  },
  {
    id: 10,
    name: "Member 10",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKaPkcapeg6xSlakN8IFAm1enM2MVo2I4g8IcXuEynx4vTPOwSaCRl0gc&s=10",
  },
  {
    id: 11,
    name: "Member 11",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOHSTc_BOxQiF5d05kW9nHv-bVsgCM_khQ6wKJHwr2QuboEMUu1-yAejU&s=10",
  },
  {
    id: 12,
    name: "Member 12",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23ien7ayhUrjEv_VRLKv5otKMS9sVCcWWS4MTxMDuaAACLqt833q6g7E&s=10",
  },
];

const Team = () => {
  const navigate=useNavigate()
  return (
    <>
      <div onClick={()=>navigate("/teams")} className="bg-blue-900 m-10 rounded-lg h-12 text-white flex justify-between items-center px-2 hover:cursor-pointer hover:scale-110">
        <div>

        </div>
        <div  >
          <h1>Teams</h1>
        </div>
        <div className="flex justify-self-end items-center gap-2 hover:scale-[1.05]" >
          More details
          <span className=" ">
             <HiArrowSmRight size={34}/>{" "}
          </span>
        </div>
      </div>
      <div onClick={()=>navigate("/teams")} className="grid grid-cols-2 md:grid-cols-4 gap-4 hover:cursor-pointer ">
        {teamMembers.map((member) => (
          <div key={member.id} className="h-32 overflow-hidden rounded-lg mt-2 hover:scale-[1.05] border-2 border-black ">
            <img
              src={member.image}
              alt={member.name}
              className="object-cover h-full w-full "
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;
