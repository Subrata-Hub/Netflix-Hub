import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMG_CDN_URL2 } from "../utils/constants";
// import HoverMovieCard from "./HoverMovieCard";
import PosterFallImage from "../assets/no-poster2.jpeg";
import PersonFallbackImage from "../assets/person-fallback.png";

import LeLazyLoadImage from "./LeLazyLoadImage";

// import { FaRegBookmark } from "react-icons/fa6";
import useDate from "../hooks/useDate";

const MovieCardHorizontal = ({
  posterPath,
  profilePath,
  title,
  backImg,
  genreIds,
  cardMovieId,
  overView,
  releaseDate,
  rating,
  department,
  knownFor,
  mediaTypes,
  character,
}) => {
  const mediaType = useSelector((store) => store.config.mediaType);

  // const formattedDate = useDate(releaseDate);
  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const knownForMedia = knownFor?.map((n) => n.title || n.name);
  return (
    <>
      <Link to={`/${mediaTypes || mediaType}/${cardMovieId}`}>
        <div className="mb-5" onClick={handleMoreInfoClick}>
          <div className="movie-card-container bg-slate-900 flex">
            {mediaTypes !== "person" ? (
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

            {/* <div className="flex absolute bottom-1 mb-14 left-1 text-base w-12 h-12 rounded-full bg-orange-600 text-white font-bold items-center justify-center">
            {rating}
          </div> */}
            <div className="pt-4 w-[1000px]">
              <div className=" text-white text-[18px] font-semibold">
                {title}
              </div>
              <div className="text-gray-100 text-[15px] mt-1">
                {releaseDate}
              </div>
              {mediaTypes !== "person" ? (
                <>
                  {overView && (
                    <div className="text-gray-400 mt-4 line-clamp-2 text-base cursor-default mr-4">
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

            {/* <div className="absolute  mr-2 mt-1 top-0 right-0">
            <FaRegBookmark className="text-yellow-400 text-[24px]" />
          </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCardHorizontal;
