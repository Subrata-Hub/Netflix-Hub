import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";

const MovieList = ({ title, movies, loading, mediaType }) => {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${799 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-755 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  if (!movies) {
    return (
      <div className="w-full">
        <Shimmer
          className="w-[115px] md:w-[230px] h-[185px] md:h-[300px] bg-stone-700 rounded-xl"
          size={6}
        />
      </div>
    );
  }

  return (
    <div
      className="mx-4 md:mx-12 py-1 relative flex-col overflow-x-scroll md:overflow-hidden z-10"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="md:text-3xl text-2xl pb-3 text-white">{title}</h1>
      <div className="flex">
        {showControls && (
          <div
            className={`absolute z-30 h-full transition-all duration-300 ease-in-out font-bold top-0 bottom-0 w-1/12 left-0 -mt-6 text-white text-3xl flex justify-center items-center`}
          >
            <AiOutlineLeft
              className="bg-slate-900 opacity-60 w-8 h-8 rounded-full"
              onClick={() => handleDirection("left")}
            />
          </div>
        )}
        <div className="">
          <div
            className="flex gap-3 w-max translate-x-0 transition-all duration-300 ease-in-out"
            ref={listRef}
          >
            {movies?.map((movie) => (
              <MovieCard
                posterPath={movie?.poster_path}
                key={movie?.id}
                title={movie?.title || movie?.name}
                backImg={movie?.backdrop_path}
                genreIds={movie?.genre_ids}
                cardMovieId={movie?.id}
                overView={movie?.overview}
                releaseDate={movie?.release_date || movie?.first_air_date}
                rating={movie?.vote_average?.toFixed(1)}
                mediaType={mediaType}
              />
            ))}
          </div>
        </div>
        {showControls && (
          <div
            className={`absolute z-50 h-full transition-all duration-300 ease-in-out font-bold top-0 bottom-0 w-1/12 right-0 -mt-6 text-white text-3xl flex justify-center items-center`}
          >
            <AiOutlineRight
              className="bg-slate-900 opacity-60 w-8 h-8 rounded-full"
              onClick={() => handleDirection("right")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
