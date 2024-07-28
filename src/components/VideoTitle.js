import React from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview, id, mediaType }) => {
  return (
    <div className="w-[400px] md:w-[488px] aspect-video bottom-[205px] md:bottom-[200px] z-30 px-6 md:px-12 mt-0 text-white absolute">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>

      <p className="py-3 md:py-6 text-[12px] md:text-sm font-normal w-full">
        {/* {overview.length < 220 ? overview : overview.substring(0, 220)} */}
        {overview.length < 120
          ? overview
          : window.innerWidth >= 768
          ? overview.substring(0, 220)
          : overview.substring(0, 120)}
      </p>

      <div className="flex gap-4">
        <button className="p-[7px] md:p-2 px-12 md:px-12 text-black text-sm bg-white  bg-opacity-90 hover:bg-opacity-80 rounded-md flex items-center gap-2">
          <FaPlay />
          Play
        </button>
        <Link to={`/${mediaType}/${id}`}>
          <button className="p-[7px] md:p-2 px-10 md:px-10  text-white text-sm bg-gray-500  bg-opacity-50 rounded-lg flex items-center gap-2">
            <AiOutlineInfoCircle />
            More info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;

// md:top-56

//top-[285px]
