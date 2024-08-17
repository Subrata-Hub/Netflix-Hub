import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL2, IMG_CDN_URL10 } from "../utils/constants";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { GoUnmute } from "react-icons/go";
import { BiVolumeMute } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import Spinner from "./shared/Spinner";
import LeLazyLoadImage from "./shared/LeLazyLoadImage";

const Baner = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMovieCount = 5;
  const [showVideo, setShowVideo] = useState(false);
  const [mute, setMute] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);

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
    setMute((prevMute) => !prevMute);
  };

  const handleNextVideo = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(Math.min(nextIndex, movies.length - 1));
  };

  const handleImageVisible = () => {
    setImageVisible(true);
  };

  useEffect(() => {
    if (movies && movies.length > 0) {
      setLoading(false);
      setShowVideo(false);

      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 2000); // Delay to ensure proper cleanup

      return () => {
        clearTimeout(timer);
        setShowVideo(false);
      };
    }
  }, [currentIndex, movies]);

  useEffect(() => {
    return () => {
      // Cleanup logic when Baner component unmounts
      setShowVideo(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-[46rem] bg-slate-950">
        <Spinner show={true} position={"bottom-[350px]"} sized={"size-16"} />
      </div>
    );
  }

  const currentMovie = movies[currentIndex];
  const displayedMovies = movies.slice(
    Math.max(currentIndex, 0),
    currentIndex + visibleMovieCount
  );

  return (
    <div className="relative overflow-hidden w-screen h-[45rem] md:h-screen bg-slate-950">
      {!showVideo && (
        <div className="w-full h-full md:w-[1580px] md:h-[1080px] bg-slate-900 movie-card-container mt-16 md:mt-1">
          <LeLazyLoadImage
            src={IMG_CDN_URL10 + currentMovie?.backdrop_path}
            height={isMobile ? 200 : 1080}
            width={isMobile ? 400 : 1580}
            alt="banar"
            handleImageVisible={handleImageVisible}
          />
        </div>
      )}

      {showVideo && imageVisible && (
        <VideoBackground
          key={currentMovie.id} // Force re-render when movie changes
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
      <div className="absolute bottom-[38rem] md:bottom-[220px] z-40 right-6 md:right-20">
        {mute ? (
          <BiVolumeMute className="text-white text-2xl" onClick={handleMute} />
        ) : (
          <GoUnmute className="text-white text-2xl" onClick={handleMute} />
        )}
      </div>
      <div className="absolute bottom-[445px] md:bottom-[120px] md:right-20 right-2 flex gap-1 z-40 md:max-w-[400px] mt-2">
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
            key={movie.id}
            className={`w-16 md:w-[80px] h-[40px] md:h-[44px] border ${
              currentIndex + index === currentIndex
                ? "border-2 border-white"
                : "border-spacing-1 border-zinc-500"
            } hover:scale-110 transition-transform duration-200 cursor-pointer`}
            onClick={() => handleBanarShow(currentIndex + index)}
          >
            <img
              src={IMG_CDN_URL2 + movie?.backdrop_path}
              className={`w-full h-full object-cover object-center rounded-sm`}
              alt="banar"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Baner;
