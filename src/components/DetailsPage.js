import Header from "./Header";
import { useParams } from "react-router-dom";
import MediaInfo from "./MediaInfo";
import MediaVideos from "./MediaVideos";
import SimilarMovieOrShow from "./SimilarMovieOrShow";
import Recommendations from "./Recommendations";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

import { addMediaInfo } from "../utils/mediaSlice";
import LodingSkeleton from "./LodingSkeleton";

const DetailsPage = () => {
  const { mediaType, id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getMediaInfo = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits`,
          API_OPTIONS
        );
        const json = await data.json();

        dispatch(addMediaInfo(json));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching media info:", error);
      }
    };

    getMediaInfo();
  }, [dispatch, mediaType, id]);

  return (
    <div className="bg-slate-950">
      <Header />
      {loading ? (
        <LodingSkeleton />
      ) : (
        <MediaInfo mediaType={mediaType} id={id} />
      )}
      <MediaVideos mediaType={mediaType} id={id} loading={loading} />
      <SimilarMovieOrShow mediaType={mediaType} id={id} loading={loading} />
      <Recommendations mediaType={mediaType} id={id} loading={loading} />
    </div>
  );
};
export default DetailsPage;
