import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-14 text-white absolute bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-sm font-normal w-1/3">{overview}</p>
      <div>
        <button className="p-2 px-10 text-black text-lg bg-white  bg-opacity-90 hover:bg-opacity-80 rounded-md">
          ▶️ Play
        </button>
        <button className="mx-2 p-2 px-8 text-white text-lg bg-gray-500  bg-opacity-50 rounded-lg">
          ℹ️ More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
