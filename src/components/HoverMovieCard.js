import useGenre from "../hooks/useGenre";

import { GrAdd } from "react-icons/gr";

import { useSelector } from "react-redux";
import useCardMovieTrailer from "../hooks/useCardMovieTrailer";

import CircularProgress from "./CircularProgress";
import { Link } from "react-router-dom";

const HoverMovieCard = ({
  title,
  backImg,
  genreIds,
  cardMovieId,
  overView,
  releaseDate,
  rating,
}) => {
  const mediaType = useSelector((store) => store.config.mediaType);
  const genresData = useGenre();

  const movieTrailerVideo = useSelector((store) => store.movies?.movieTrailer);

  useCardMovieTrailer(mediaType, cardMovieId);

  if (!genresData) return;

  // Filter genres based on genre IDs
  const matchingGenres = genresData?.genres?.filter((genre) =>
    genreIds?.includes(genre.id)
  );

  // Extract genre names
  const matchingGenreNames = matchingGenres?.map((genre) => genre.name);

  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // if (!movieTrailerVideo) return null;
  return (
    <div className="absolute w-72 -bottom-2 bg-slate-800 z-50 rounded-md px-2 shadow-lg">
      <div className="">
        <div className="">
          {/* <img className="" alt="video_card" src={IMG_CDN_URL + backImg} /> */}
          <iframe
            className="w-[276px] aspect-video"
            src={`https://www.youtube.com/embed/${movieTrailerVideo?.key}?&mute=0&showinfo=0&controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-white font-bold text-xl p-2 m-1 line-clamp-2">
              {title}
            </h1>{" "}
            <span className="text-green-500 font-semibold text-2xl pr-2">
              <GrAdd />
            </span>
          </div>
          <div className="text-white flex gap-11 px-2 py-2">
            <span className="font-semibold text-base ml-1 ">
              {new Date(releaseDate).getFullYear()}
            </span>
            <div className="text-sm">
              {matchingGenreNames.slice(0, 3).join(" |  ")}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="px-2 py-4">
              <CircularProgress rating={rating} size={"w-12 h-12"} />
            </div>
            <div className="px-12 text-white py-2 mx-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-indigo-500/40">
              <Link to={`/${mediaType}/${cardMovieId}`}>
                <button onClick={handleMoreInfoClick}>More Info</button>
              </Link>
            </div>
          </div>

          {/* <p className="text-white text-sm mx-2 line-clamp-3">{overView}</p> */}
        </div>
      </div>
    </div>
  );
};

export default HoverMovieCard;

// &autoplay=1
