import React from "react";
// import {download} from '../assets/download.png'
import { downloadImage } from "../utils";
import download from '../assets/download.png'
const Card = ({ _id, photo, prompt, name }) => {
  return (
    <div className="rounded-xl relative group card">
    {/* // <div className="break-inside-avoid mb-4 rounded-xl relative group card"> */}
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />

      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-sm text-white overflow-y-auto">
{prompt.split(" ").slice(0, 20).join(" ") + (prompt.split(" ").length > 20 ? "..." : "")}


        </p>

        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
<button className="border-none outline-none bg-transparent" type="button" onClick={()=> downloadImage(_id,photo)}>  <img src={download} alt="download" className="w-6 h-6 object-contain invert" /> </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
