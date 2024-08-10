import Header from "../shared/Header";
import { useParams } from "react-router-dom";
import MediaInfo from "../MediaInfo";
import MediaVideos from "../MediaVideos";
import SimilarMovieOrShow from "../SimilarMovieOrShow";
import Recommendations from "../Recommendations";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../utils/constants";

import { addMediaInfo } from "../../utils/mediaSlice";
import PersonDetailsPage from "./PersonDetailsPage";
import LodingSkeleton from "../shared/LodingSkeleton";

const DetailsPage = () => {
  const { mediaType, id } = useParams();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        setHasError(true);
        console.error("Error fetching media info:", error);
      }
    };

    getMediaInfo();
  }, [dispatch, mediaType, id]);

  if (hasError) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-950 text-white">
        <h1 className="text-3xl">Failed to fetching media info 😒😒.</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-950">
      <Header />
      {loading ? (
        <LodingSkeleton />
      ) : mediaType === "person" ? (
        <PersonDetailsPage />
      ) : (
        <>
          <MediaInfo mediaType={mediaType} id={id} />
          <MediaVideos mediaType={mediaType} id={id} loading={loading} />
          <SimilarMovieOrShow mediaType={mediaType} id={id} loading={loading} />
          <Recommendations mediaType={mediaType} id={id} loading={loading} />
        </>
      )}
    </div>
  );
};
export default DetailsPage;
