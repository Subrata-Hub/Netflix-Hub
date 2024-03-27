import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL4, IMG_CDN_URL } from "../utils/constants";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { GoUnmute } from "react-icons/go";
import { BiVolumeMute } from "react-icons/bi";

const Baner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMovieCount = 5;
  const [showVideo, setShowVideo] = useState(false);
  const [mute, setMute] = useState(1);
  const videoRef = useRef(null);

  const movies = useSelector((store) => store.movies?.trending);

  const handleNext = () => {
    const nextIndex = Math.min(
      currentIndex + visibleMovieCount,
      movies.length - 1
    );
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - visibleMovieCount, 0);
    setCurrentIndex(prevIndex);
  };

  const handleBanarShow = (index) => {
    setCurrentIndex(index);
  };

  const handleMute = () => {
    setMute((prevMute) => (prevMute ? 0 : 1));
  };

  const handleNextVideo = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(Math.min(nextIndex, movies.length - 1));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(0); // Reset video to the beginning
    }
    setShowVideo(false);
    setTimeout(() => setShowVideo(true), 1500);
  }, [currentIndex]);

  if (!movies) return null;

  const currentMovie = movies[currentIndex];
  const displayedMovies = movies.slice(
    Math.max(currentIndex, 0),
    currentIndex + visibleMovieCount
  );

  return (
    <div className="relative overflow-hidden w-screen h-[44rem] bg-slate-950">
      <div className="">
        {!showVideo && (
          <img
            src={IMG_CDN_URL + currentMovie?.backdrop_path}
            className="w-full h-full object-cover object-center transition-opacity duration-500"
            alt="banar"
          />
        )}
      </div>

      {showVideo && (
        <VideoBackground
          ref={videoRef}
          movieId={currentMovie.id}
          mute={mute}
          nextVideo={handleNextVideo}
          mediaType={currentMovie.media_type}
        />
      )}

      <VideoTitle
        title={currentMovie?.original_title || currentMovie?.name}
        overview={currentMovie?.overview}
        id={currentMovie.id}
        mediaType={currentMovie.media_type}
      />
      <div className="absolute w-screen h-[1000px] top-0 left-0 bg-gradient-to-r from-black z-10"></div>
      <div className="absolute bottom-60 z-50 right-28">
        {mute === 1 ? (
          <BiVolumeMute className="text-white text-2xl" onClick={handleMute} />
        ) : (
          <GoUnmute className="text-white text-2xl" onClick={handleMute} />
        )}
      </div>
      <div className="absolute bottom-40 right-24 flex gap-1 z-40 max-w-[400px]">
        {currentIndex >= 0 && (
          <div
            className="absolute top-0 bottom-0 left-0 w-10 h-10 bg-transparent text-white flex justify-center items-center cursor-pointer z-50"
            onClick={handlePrev}
          >
            {"<"}
          </div>
        )}
        {currentIndex + visibleMovieCount < movies.length && (
          <div
            className="absolute top-0 bottom-0 right-0 w-10 h-10 bg-transparent text-white flex justify-center items-center cursor-pointer z-50"
            onClick={handleNext}
          >
            {">"}
          </div>
        )}
        {displayedMovies.map((movie, index) => (
          <div
            key={index}
            className="w-20 h-[44px] border border-spacing-2"
            onClick={() => handleBanarShow(currentIndex + index)}
          >
            <img
              src={IMG_CDN_URL4 + movie?.backdrop_path}
              className="w-full h-full object-cover object-center"
              alt="banar"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Baner;
