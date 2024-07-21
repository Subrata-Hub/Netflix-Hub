import React from "react";
import useSimilar from "../hooks/useSimilar";
import { useSelector } from "react-redux";
import MovieList from "./distribute/MovieList";
import Shimmer from "./distribute/Shimmer";

const SimilarMovieOrShow = ({ mediaType, id, loading }) => {
  const similarData = useSelector((store) => store.media?.similar);
  useSimilar(mediaType, id);

  if (loading && (!similarData || similarData.length === 0)) return <Shimmer />;

  return (
    <div>
      <div className="pt-6 text-white">
        <MovieList
          title={"Similar"}
          movies={similarData}
          mediaType={mediaType}
        />
      </div>
    </div>
  );
};

export default SimilarMovieOrShow;
