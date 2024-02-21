import React, { useState } from "react";
import useMediaVideos from "../hooks/useMediaVideos";
import { useSelector } from "react-redux";

import { AiOutlinePlayCircle } from "react-icons/ai";

import VideoPopup from "./VideoPopup";
import LeLazyLoadImage from "./LeLazyLoadImage";
import Shimmer from "./Shimmer";

const MediaVideos = ({ mediaType, id, loading }) => {
  const [videoPopup, setVideoPopup] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const mediaVideos = useSelector((store) => store.media?.mediaVideos);

  useMediaVideos(mediaType, id);

  const handleShowPopup = (videoKey) => {
    setVideoPopup(true);
    setVideoKey(videoKey);
  };

  const handleHidePopup = () => {
    setVideoPopup(false);
    setVideoKey(null);
  };

  if (loading && (!mediaVideos || mediaVideos.length === 0)) return <Shimmer />;

  return (
    <div className="pt-6 px-20 text-white">
      <div className="font-semibold text-3xl py-5">Official Videos</div>
      <div className="flex gap-6 overflow-scroll">
        {mediaVideos?.map((video) => (
          <div className="relative cursor-pointer" key={video.id}>
            <div
              className="w-[330px] h-[190px] bg-slate-900"
              onClick={() => handleShowPopup(video?.key)}
            >
              <LeLazyLoadImage
                src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                alt={"youthumb"}
                height={190}
                width={330}
              />
              <AiOutlinePlayCircle className="text-yellow-500 text-[56px] absolute top-16 left-36" />
            </div>
            <div className="py-3 text-[17px] max-w-72">{video?.name}</div>
          </div>
        ))}
      </div>

      {videoPopup && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <VideoPopup mediaVideo={videoKey} videoPopup={videoPopup} />
            <button
              className="absolute top-36 right-[356px] text-white text-2xl cursor-pointer"
              onClick={handleHidePopup}
            >
              Close
            </button>
          </div>
          <div className="fixed w-full top-0 left-0 bg-gray-900  h-full opacity-90 z-30"></div>
        </>
      )}
    </div>
  );
};

export default MediaVideos;
