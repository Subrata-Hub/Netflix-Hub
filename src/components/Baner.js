import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL4, IMG_CDN_URL } from "../utils/constants";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { GoUnmute } from "react-icons/go";
import { BiVolumeMute } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "react-responsive";

const Baner = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMovieCount = 5;
  const [showVideo, setShowVideo] = useState(false);
  const [mute, setMute] = useState(true);

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
    setMute((prevMute) => (prevMute ? false : true));
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
    setTimeout(() => setShowVideo(true), 2000);
  }, [currentIndex]);

  if (!movies) return null;

  const currentMovie = movies[currentIndex];
  const displayedMovies = movies.slice(
    Math.max(currentIndex, 0),
    currentIndex + visibleMovieCount
  );

  return (
    <div className="relative overflow-hidden w-screen h-[44rem]  bg-slate-950">
      <div className="">
        {!showVideo && (
          // <div className="w-full h-full  mt-6 md:mt-4 md:w-[1580px] md:h-[1080px] movie-card-container bg-slate-900">
          //   <LazyLoadImage
          //     src={IMG_CDN_URL + currentMovie?.backdrop_path}
          //     className="object-cover object-center transition-opacity duration-500"
          //     // width={1920}
          //     // height={1080}
          //     height={isMobile ? 600 : 1080}
          //     width={isMobile ? 500 : 1580}
          //     alt="banar"
          //   />
          // </div>

          <div className="w-full h-full md:w-[1580px] md:h-[1080px] bg-slate-900  movie-card-container mt-8 md:mt-4">
            <LazyLoadImage
              src={IMG_CDN_URL + currentMovie?.backdrop_path}
              className="object-cover object-center transition-opacity duration-500"
              // width={1920}
              // height={1080}
              height={isMobile ? 300 : 1080}
              width={isMobile ? 400 : 1580}
              alt="banar"
            />
          </div>
          // <img
          //   src={IMG_CDN_URL + currentMovie?.backdrop_path}
          //   className="w-full h-full object-cover object-center transition-opacity duration-500 mt-10 md:mt-4"
          //   alt="banar"
          // />
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
      <div className="absolute top-24 md:top-[420px] z-40 right-10 md:right-28">
        {mute ? (
          <BiVolumeMute className="text-white text-2xl" onClick={handleMute} />
        ) : (
          <GoUnmute className="text-white text-2xl" onClick={handleMute} />
        )}
      </div>
      <div className="absolute  top-56 md:top-[31rem] md:right-24 right-2 flex gap-1 z-40 md:max-w-[400px] mt-2">
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
            className="w-16 md:w-20 h-[40px] md:h-[44px] border border-spacing-2"
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
