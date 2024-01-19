import React from "react";
import { useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";

const GptRecommendation = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults } = gpt;

  if (!movieResults || movieResults.length === 0) {
    return null;
  }

  // Flatten the array of arrays into a single array of objects
  const flattenedResults = movieResults.flat();

  return (
    <div className="bg-black text-white bg-opacity-85 py-2">
      <div className="flex flex-wrap gap-3 px-10 ml-28">
        {flattenedResults.map((movie, index) => (
          <div className="py-4">
            <MovieCard
              posterPath={movie?.poster_path}
              key={`${movie.id}-${index}`}
              title={movie?.original_title}
              backImg={movie?.backdrop_path}
              genreIds={movie?.genre_ids}
              cardMovieId={movie?.id}
              overView={movie?.overview}
              releaseDate={movie?.release_date}
              rating={movie?.vote_average?.toFixed(1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptRecommendation;
