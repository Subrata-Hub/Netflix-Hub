import React from "react";
import useSimilar from "../hooks/useSimilar";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SimilarMovieOrShow = ({ mediaType, id }) => {
  const similarData = useSelector((store) => store.media?.similar);
  useSimilar(mediaType, id);
  if (!similarData || similarData.length === 0) return;
  return (
    <div className="py-4 text-white">
      <MovieList title={"Similar"} movies={similarData} />
    </div>
  );
};

export default SimilarMovieOrShow;
