import React from "react";

import MovieList from "./MovieList";
import { useSelector, useDispatch } from "react-redux";
import { changeMediaType } from "../utils/configSlice";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const mediaType = useSelector((store) => store.config.mediaType);
  const dispatch = useDispatch();

  if (mediaType === "tv") {
    dispatch(changeMediaType("movie"));
  }

  return (
    <div className=" bg-slate-950">
      <div className="-mt-[120px]">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />

        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
