import React from "react";
import useRecommendations from "../hooks/useRecommendations";
import { useSelector } from "react-redux";
import MovieList from "./shared/MovieList";
import Shimmer from "./shared/Shimmer";

const Recommendations = ({ mediaType, id, loading }) => {
  const recommendationData = useSelector(
    (store) => store.media?.recommendations
  );
  useRecommendations(mediaType, id);

  if (loading && (!recommendationData || recommendationData.length === 0))
    return <Shimmer />;
  return (
    <div>
      <div className="pt-1 pb-4 text-white">
        <MovieList
          title={"Recommendations"}
          movies={recommendationData}
          mediaType={mediaType}
        />
      </div>
    </div>
  );
};

export default Recommendations;
