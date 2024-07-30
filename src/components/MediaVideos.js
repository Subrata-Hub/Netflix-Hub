import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import VideoPopup from "./VideoPopup";
import Shimmer from "./distribute/Shimmer";
import useMediaVideos from "../hooks/useMediaVideos";
import LeLazyLoadImage from "./distribute/LeLazyLoadImage";
import useOutsideClick from "../hooks/useOutsideClick";

const MediaVideos = ({ mediaType, id, loading }) => {
  const [videoPopup, setVideoPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaVideos = useSelector((store) => store.media?.mediaVideos);
  useMediaVideos(mediaType, id);

  const videoPopupContainerRef = useRef(null);
  useOutsideClick(videoPopupContainerRef, () => setVideoPopup(false));

  const handleShowPopup = (index) => {
    setVideoPopup(true);
    setCurrentIndex(index);
  };

  const handleHidePopup = () => {
    setVideoPopup(false);
  };

  const handleNextVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (mediaVideos?.length || 1)
    );
  };

  const currentVideo =
    mediaVideos && mediaVideos.length > 0 ? mediaVideos[currentIndex] : null;

  if (loading && (!mediaVideos || mediaVideos.length === 0)) {
    return <Shimmer />;
  }

  return (
    <div className="pb-4 md:pb-8 px-4 md:px-12 text-white">
      <div className="font-semibold text-3xl py-5">Official Videos</div>
      <div className="flex gap-6 overflow-scroll" ref={videoPopupContainerRef}>
        {mediaVideos?.map((video, index) => (
          <div className="relative cursor-pointer" key={video.id}>
            <div
              className="w-[330px] h-[190px] bg-slate-900 border border-blue-400"
              onClick={() => handleShowPopup(index)}
            >
              <LeLazyLoadImage
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={"youthumb"}
                height={190}
                width={330}
              />
              <AiOutlinePlayCircle className="text-yellow-500 text-[56px] absolute top-16 left-36" />
            </div>
            <div className="py-3 text-[17px] max-w-72">{video.name}</div>
          </div>
        ))}
      </div>

      {videoPopup && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <VideoPopup
              mediaVideo={currentVideo.key}
              videoPopup={videoPopup}
              nextVideo={handleNextVideo}
            />
            <button
              className="absolute top-56 md:top-20 right-2 md:right-[300px] text-white text-2xl cursor-pointer"
              onClick={handleHidePopup}
            >
              <IoMdClose className="text-white text-3xl" />
            </button>
          </div>
          <div className="fixed w-full top-0 left-0 bg-gray-900 h-full opacity-90 z-30"></div>
        </>
      )}
    </div>
  );
};

export default MediaVideos;
