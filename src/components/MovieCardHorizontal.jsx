import React from "react";
import { Link } from "react-router-dom";
import { IMG_CDN_URL2 } from "../utils/constants";

import PosterFallImage from "../assets/no-poster2.jpeg";
import PersonFallbackImage from "../assets/person-fallback.png";
import useDate from "../hooks/useDate";
import LeLazyLoadImage from "./shared/LeLazyLoadImage";

const MovieCardHorizontal = ({
  posterPath,
  profilePath,
  title,
  cardMovieId,
  overView,
  releaseDate,
  department,
  knownFor,
  mediaType,
  character,
}) => {
  const formattedDate = useDate(releaseDate);

  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const knownForMedia = knownFor?.map((n) => n.title || n.name);
  return (
    <>
      <Link to={`/${mediaType}/${cardMovieId}`}>
        <div className=" mb-5" onClick={handleMoreInfoClick}>
          <div className="movie-card-container bg-slate-900 flex">
            {mediaType !== "person" ? (
              <div className="w-[140px]">
                <LeLazyLoadImage
                  src={posterPath ? IMG_CDN_URL2 + posterPath : PosterFallImage}
                  alt="poser_img"
                  height={150}
                  width={110}
                />
              </div>
            ) : (
              <div className="w-[130px]">
                <LeLazyLoadImage
                  src={
                    profilePath
                      ? IMG_CDN_URL2 + profilePath
                      : PersonFallbackImage
                  }
                  alt="profile_img"
                  height={140}
                  width={100}
                />
              </div>
            )}

            <div className="pt-4 w-full md:w-[1000px] ml-4 md:ml-0">
              <div className=" text-white text-[18px] font-semibold">
                {title}
              </div>
              <div className="text-gray-100 text-[15px] mt-1">
                {formattedDate}
              </div>
              {mediaType !== "person" ? (
                <>
                  {overView && (
                    <div className="text-gray-400 mt-4 line-clamp-1 md:line-clamp-2 text-base cursor-default mr-4">
                      {overView}
                    </div>
                  )}
                  {character && (
                    <div className="text-gray-400 mt-4 text-base cursor-default">
                      as {character}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-gray-100 text-[15px] mt-1">
                    {department}
                  </div>
                  <div className="text-gray-400 mt-6 line-clamp-3 text-base cursor-default">
                    {knownForMedia.join(" , ")}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCardHorizontal;
