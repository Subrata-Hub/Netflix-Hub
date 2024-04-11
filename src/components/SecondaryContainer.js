import React from "react";

import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-slate-950">
      <div className="-mt-[16.4rem] md:-mt-[95px]">
        <MovieList title={"Trending Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"New In India"} movies={movies.newIndianMovies} />
        <MovieList
          title={"Fan Favorites Movies"}
          movies={movies.allTimeFavourites}
        />
        <MovieList title={"Trending Show"} movies={movies.trendingShow} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
