import React from "react";

import MovieList from "./distribute/MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-slate-950">
      <div className="-mt-[17.4rem] md:-mt-[78px]">
        <MovieList
          title={"Trending Movies"}
          movies={movies.nowPlayingMovies}
          mediaType={"movie"}
        />
        <MovieList
          title={"New In India"}
          movies={movies.newIndianMovies}
          mediaType={"movie"}
        />

        <MovieList
          title={"Fan Favorites Movies"}
          movies={movies.allTimeFavourites}
          mediaType={"movie"}
        />
        <MovieList
          title={"Trending Show"}
          movies={movies.trendingShow}
          mediaType={"tv"}
        />
        <MovieList
          title={"Popular Movies"}
          movies={movies.popularMovies}
          mediaType={"movie"}
        />
        <MovieList
          title={"Top Rated Movies"}
          movies={movies.topRatedMovies}
          mediaType={"movie"}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
