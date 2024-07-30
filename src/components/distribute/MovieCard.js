import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL5 } from "../../utils/constants";
import PosterFallImage from "../../assets/no-poster2.jpeg";
import LeLazyLoadImage from "./LeLazyLoadImage";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import useDate from "../../hooks/useDate";
import { useMediaQuery } from "react-responsive";
import CircularProgress from "./CircularProgress";
import { addMovieOrTVShow, removeMovieOrTVShow } from "../../utils/savedSlice";
import { toast } from "react-toastify";

const MovieCard = ({
  posterPath,
  title,
  genreIds,
  cardMovieId,
  releaseDate,
  overView,
  rating,
  mediaType,
}) => {
  const dispatch = useDispatch();

  const savedMoviesOrTVShow = useSelector(
    (store) => store.saved.savedMovieOrTVShow
  );
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const formattedDate = useDate(releaseDate);

  const isBookedMark = savedMoviesOrTVShow.some(
    (movie) => movie.cardMovieId === cardMovieId
  );

  const handleMoreInfoClick = () => {
    // Scroll to the top of the page

    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const savedData = {
    posterPath,
    title,
    overView,
    cardMovieId,
    releaseDate,
    mediaType,
  };

  const handleSavedButton = () => {
    // if (!user) {
    //   navigate("/login");
    // }

    if (user) {
      if (isBookedMark) {
        dispatch(removeMovieOrTVShow(cardMovieId));
        toast.success("Remove from Bookmark");
      } else {
        dispatch(addMovieOrTVShow(savedData));
        toast.success("Added to Bookmark");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="relative md:mb-8 mb-4">
        <Link to={`/${mediaType}/${cardMovieId}`}>
          <div
            className={`w-[${
              isMobile ? 125 : 216
            }px] movie-card-container bg-slate-900`}
            onClick={handleMoreInfoClick}
          >
            <LeLazyLoadImage
              src={posterPath ? IMG_CDN_URL5 + posterPath : PosterFallImage}
              alt="poser_img"
              height={isMobile ? 185 : 300}
              width={isMobile ? 130 : 216}
              threshold={0.09}
              offset={100}
            />

            <div className="flex absolute bottom-1 mb-14 left-1 text-base">
              <CircularProgress rating={rating} size={"w-12 h-12"} />
            </div>

            <div className="bg-slate-950 pt-6">
              <div className=" text-white text-[18px] md:text-[20px] max-w-32  md:max-w-52  truncate">
                {title}
              </div>

              <div className="text-gray-300 text-[15px] mt-1">
                {formattedDate}
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute  mr-2 mt-1 top-0 right-0">
          {user && isBookedMark ? (
            <FaBookmark
              className="text-yellow-400 text-[22px]"
              onClick={handleSavedButton}
            />
          ) : (
            <FaRegBookmark
              className="text-yellow-400 text-[22px]"
              onClick={handleSavedButton}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
