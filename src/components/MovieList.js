import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";

const MovieList = ({ title, movies, loading }) => {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${740 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-762 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  if (!movies) {
    return <Shimmer />;
  }

  // if (loading && (!movies || movies.length === 0)) return <Shimmer />;

  return (
    <div
      className="mx-20 py-3 relative flex-col overflow-hidden"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="text-3xl pb-3 text-white">{title}</h1>
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
            className="flex gap-3 w-max translate-x-0 transition-all duration-300 ease-in-out"
            ref={listRef}
          >
            {movies?.map((movie) => (
              <MovieCard
                posterPath={movie?.poster_path}
                key={movie?.id}
                title={movie?.original_title || movie?.original_name}
                backImg={movie?.backdrop_path}
                genreIds={movie?.genre_ids}
                cardMovieId={movie?.id}
                overView={movie?.overview}
                releaseDate={movie?.release_date || movie?.first_air_date}
                rating={movie?.vote_average?.toFixed(1)}
                // mediaTypes={movie.media_type}
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
