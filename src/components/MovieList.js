import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${625 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-625 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  if (!movies || movies.length === 0) return;

  return (
    <div
      className="px-4 py-4 relative flex-col overflow-hidden ml-12"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="text-3xl py-2 text-white">{title}</h1>
      <div className="flex">
        <div
          className={`absolute z-50 h-full transition-all duration-300 ease-in-out font-bold top-0 bottom-0 w-1/12 left-0 text-white text-3xl ${
            !showControls ? "hidden" : ""
          } flex justify-center items-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="">
          <div
            className="flex gap-[7px] w-max translate-x-0 transition-all duration-300 ease-in-out"
            ref={listRef}
          >
            {movies.map((movie) => (
              <MovieCard
                posterPath={movie.poster_path}
                key={movie.id}
                title={movie.original_title}
                backImg={movie.backdrop_path}
                genreIds={movie.genre_ids}
                cardMovieId={movie.id}
                overView={movie.overview}
                releaseDate={movie.release_date}
                rating={movie.vote_average.toFixed(1)}
              />
            ))}
          </div>
        </div>

        <div
          className={`absolute z-50 h-full transition-all duration-300 ease-in-out font-bold top-0 bottom-0 w-1/12 right-0 text-white text-3xl ${
            !showControls ? "hidden" : ""
          } flex justify-center items-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
