import React from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[14%] px-14 text-white absolute bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-sm font-normal w-1/3">{overview}</p>
      <div className="flex gap-4">
        <button className="p-2 px-12 text-black text-lg bg-white  bg-opacity-90 hover:bg-opacity-80 rounded-md flex items-center gap-2">
          <FaPlay />
          Play
        </button>
        <button className="p-2 px-10 text-white text-lg bg-gray-500  bg-opacity-50 rounded-lg flex items-center gap-2">
          <AiOutlineInfoCircle />
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
