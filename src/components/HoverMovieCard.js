import React from "react";
import useGenre from "../hooks/useGenre";
// import { IMG_CDN_URL } from "../utils/constants";
import { GrAdd } from "react-icons/gr";

import { useSelector } from "react-redux";
import useCardMovieTrailer from "../hooks/useCardMovieTrailer";

const HoverMovieCard = ({
  title,
  backImg,
  genreIds,
  cardMovieId,
  overView,
}) => {
  const genresData = useGenre();
  const movieTrailerVideo = useSelector((store) => store.movies?.movieTrailer);

  useCardMovieTrailer(cardMovieId);

  if (!genresData) return;

  if (!movieTrailerVideo) return;

  // Filter genres based on genre IDs
  const matchingGenres = genresData.genres.filter((genre) =>
    genreIds.includes(genre.id)
  );

  // Extract genre names
  const matchingGenreNames = matchingGenres.map((genre) => genre.name);

  console.log(matchingGenreNames);

  return (
    <div className="p-4">
      <div className="w-80 absolute bottom-20 z-50 rounded-lg bg-neutral-800 box-border">
        <div>
          {/* <img className="" alt="video_card" src={IMG_CDN_URL + backImg} /> */}
          <iframe
            className="w-80 aspect-video"
            src={
              "https://www.youtube.com/embed/" +
              movieTrailerVideo?.key +
              "?&autoplay=1&mute=0&showinfo=0&controls=0"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold text-xl p-2 m-1">{title}</h1>{" "}
            <span className="text-white font-semibold text-2xl pr-2">
              <GrAdd />
            </span>
          </div>

          <p className="text-white  p-1 m-1">
            {matchingGenreNames.join("  . ")}
          </p>
          <p className="text-white text-xs p-2 m-1">{overView}</p>
        </div>
      </div>
    </div>
  );
};

export default HoverMovieCard;
