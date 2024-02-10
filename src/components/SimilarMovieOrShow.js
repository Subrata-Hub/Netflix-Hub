import React from "react";
import useSimilar from "../hooks/useSimilar";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Shimmer from "./Shimmer";

const SimilarMovieOrShow = ({ mediaType, id, loading }) => {
  const similarData = useSelector((store) => store.media?.similar);
  useSimilar(mediaType, id);

  if (loading && (!similarData || similarData.length === 0)) return <Shimmer />;

  return (
    <div className="pt-1 text-white">
      <MovieList title={"Similar"} movies={similarData} />
    </div>
  );
};

export default SimilarMovieOrShow;
