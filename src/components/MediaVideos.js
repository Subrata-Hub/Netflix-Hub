import React, { useState } from "react";
import useMediaVideos from "../hooks/useMediaVideos";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlinePlayCircle } from "react-icons/ai";

import VideoPopup from "./VideoPopup";

const MediaVideos = ({ mediaType, id }) => {
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

  if (!mediaVideos || mediaVideos.length === 0) return null;

  return (
    <div className="py-6 px-20 text-white">
      <div className="font-semibold text-3xl py-5">Official Videos</div>
      <div className="flex gap-6 overflow-scroll">
        {mediaVideos?.map((video) => (
          <div className="relative cursor-pointer" key={video.id}>
            <div
              className="w-[300px] h-44"
              onClick={() => handleShowPopup(video?.key)}
            >
              <LazyLoadImage
                className="w-full h-full object-cover object-center rounded-xl overflow-hidden"
                src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
              />
              <AiOutlinePlayCircle className="text-yellow-500 text-[56px] absolute top-16 left-36" />
            </div>
            <div className="py-3 text-[17px] max-w-72">{video?.name}</div>
          </div>
        ))}
      </div>

      {videoPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <VideoPopup mediaVideo={videoKey} videoPopup={videoPopup} />
          <button
            className="absolute top-36 right-[356px] text-white text-2xl cursor-pointer"
            onClick={handleHidePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaVideos;
