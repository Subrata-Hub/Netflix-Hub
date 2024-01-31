import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import MediaInfo from "./MediaInfo";
import MediaVideos from "./MediaVideos";
import SimilarMovieOrShow from "./SimilarMovieOrShow";
import Recommendations from "./Recommendations";

const DetailsPage = () => {
  const { mediaType, id } = useParams();
  return (
    <div className="bg-black">
      {/* <div className="">
       
      </div> */}
      <Header />

      <MediaInfo mediaType={mediaType} id={id} />
      <MediaVideos mediaType={mediaType} id={id} />
      <SimilarMovieOrShow mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />

      {/* <div className="bg-black">
        
      </div> */}
    </div>
  );
};

export default DetailsPage;
