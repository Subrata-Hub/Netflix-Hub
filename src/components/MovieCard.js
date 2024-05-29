import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMG_CDN_URL5 } from "../utils/constants";
// import HoverMovieCard from "./HoverMovieCard";
import PosterFallImage from "../assets/no-poster2.jpeg";

import LeLazyLoadImage from "./LeLazyLoadImage";

import { FaRegBookmark } from "react-icons/fa6";
import useDate from "../hooks/useDate";
import { useMediaQuery } from "react-responsive";

const MovieCard = ({
  posterPath,
  title,
  backImg,
  genreIds,
  cardMovieId,
  overView,
  releaseDate,

  rating,
  mediaTypes,
}) => {
  const mediaType = useSelector((store) => store.config.mediaType);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const formattedDate = useDate(releaseDate);
  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSavedButtom = () => {
    console.log("Hellow world");
  };

  return (
    <>
      <Link to={`/${mediaTypes || mediaType}/${cardMovieId}`}>
        <div className="relative md:mb-8 mb-4" onClick={handleMoreInfoClick}>
          <div
            className={`w-[${
              isMobile ? 125 : 216
            }px] movie-card-container bg-slate-900`}
          >
            {/* <LeLazyLoadImage
              src={posterPath ? IMG_CDN_URL + posterPath : PosterFallImage}
              alt="poser_img"
              height={300}
              width={216}
            /> */}
            <LeLazyLoadImage
              src={posterPath ? IMG_CDN_URL5 + posterPath : PosterFallImage}
              alt="poser_img"
              height={isMobile ? 185 : 300}
              width={isMobile ? 130 : 216}
            />

            <div className="flex absolute bottom-1 mb-14 left-1 text-base md:w-12 w-10 h-10 md:h-12 rounded-full bg-orange-600 text-white font-bold items-center justify-center">
              {rating}
            </div>

            <div className="bg-slate-950 pt-6">
              <div className=" text-white text-[18px] md:text-[20px] max-w-32  md:max-w-52  truncate">
                {title}
              </div>

              <div className="text-gray-300 text-[15px] mt-1">
                {formattedDate}
              </div>
            </div>

            <div className="absolute  mr-2 mt-1 top-0 right-0">
              <FaRegBookmark
                className="text-yellow-400 text-[24px]"
                onClick={handleSavedButtom}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
