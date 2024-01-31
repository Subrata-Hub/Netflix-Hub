import React from "react";
import useRecommendations from "../hooks/useRecommendations";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const Recommendations = ({ mediaType, id }) => {
  const recommendationData = useSelector(
    (store) => store.media?.recommendations
  );
  useRecommendations(mediaType, id);
  if (!recommendationData || recommendationData.length === 0) return;
  return (
    <div>
      <div className="py-5 text-white">
        <MovieList title={"Recommendations"} movies={recommendationData} />
      </div>
    </div>
  );
};

export default Recommendations;
