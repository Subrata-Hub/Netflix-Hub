import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";
// import HoverMovieCard from "./HoverMovieCard";
import PosterFallImage from "../assets/no-poster2.jpeg";

import LeLazyLoadImage from "./LeLazyLoadImage";

import { FaRegBookmark } from "react-icons/fa6";
import useDate from "../hooks/useDate";

const MovieCard = ({
  posterPath,
  title,
  backImg,
  genreIds,
  cardMovieId,
  overView,
  releaseDate,
  rating,
}) => {
  // const [isHovered, setIsHovered] = useState(false);
  const mediaType = useSelector((store) => store.config.mediaType);
  const formattedDate = useDate(releaseDate);

  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <Link to={`/${mediaType}/${cardMovieId}`}>
        <div
          className="relative mb-7"
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          onClick={handleMoreInfoClick}
        >
          <div className="w-56 movie-card-container bg-slate-950">
            <LeLazyLoadImage
              src={posterPath ? IMG_CDN_URL + posterPath : PosterFallImage}
              alt="poser_img"
              height={324}
              width={216}
            />

            <div className="flex absolute bottom-2 mb-14 left-1 text-base w-12 h-12 rounded-full bg-orange-600 text-white font-bold items-center justify-center">
              {rating}
            </div>

            <div className=" text-white text-[20px] mt-7 max-w-52  truncate">
              {title}
            </div>
            <div className="text-gray-300 text-[15px] mt-1">
              {formattedDate}
            </div>

            <div className="absolute  mr-2 mt-1 top-0 right-0">
              <FaRegBookmark className="text-yellow-400 text-[24px]" />
            </div>

            {/* {isHovered && (
          <HoverMovieCard
            title={title}
            backImg={backImg}
            genreIds={genreIds}
            cardMovieId={cardMovieId}
            overView={overView}
            releaseDate={releaseDate}
            rating={rating}
          />
        )} */}
            {/* <div className="flex justify-between  text-white  bg-gradient-to-b from-black opacity-95">
            <div className="relative  bottom-[70px]">
              
            </div>
           
          </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;

// <FcRating className="text-yellow-300 text-[30px]" />
