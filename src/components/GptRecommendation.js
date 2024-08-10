import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./shared/MovieCard";
import Spinner from "./shared/Spinner";

const GptRecommendation = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, loading, movieName, hasSearched } = gpt;

  console.log(movieName);

  if (!hasSearched) {
    return null;
  }

  if (loading) {
    return <Spinner show={true} position={"bottom-60"} sized={"size-12"} />;
  }

  const flattenedResults = movieResults ? movieResults.flat() : [];

  if (!loading && flattenedResults.length === 0) {
    return (
      <h1 className="text-white text-center">No Result Found for your query</h1>
    );
  }

  return (
    <div className="bg-black text-white bg-opacity-85 py-2">
      <div className="flex flex-wrap gap-3 px-2 md:px-10 ml-10 md:ml-28">
        {flattenedResults.map((movie, index) => (
          <div className="py-4" key={`${movie.id}-${index}`}>
            <MovieCard
              posterPath={movie?.poster_path}
              title={movie?.original_title || movie?.name}
              mediaType={movie?.media_type}
              backImg={movie?.backdrop_path}
              genreIds={movie?.genre_ids}
              cardMovieId={movie?.id}
              overView={movie?.overview}
              releaseDate={movie?.release_date || movie?.first_air_date}
              rating={movie?.vote_average?.toFixed(1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptRecommendation;
