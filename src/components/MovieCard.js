import React, { useState } from "react";

import { IMG_CDN_URL } from "../utils/constants";
import HoverMovieCard from "./HoverMovieCard";

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
  const [isHovered, setIsHovered] = useState(false);

  if (!posterPath) return;

  return (
    <div className="">
      <div
        className="relative w-52  bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="w-full rounded-xl"
          alt="movie_card"
          src={IMG_CDN_URL + posterPath}
        />

        {isHovered && (
          <HoverMovieCard
            title={title}
            backImg={backImg}
            genreIds={genreIds}
            cardMovieId={cardMovieId}
            overView={overView}
            releaseDate={releaseDate}
            rating={rating}
          />
        )}
      </div>
    </div>
  );
};

export default MovieCard;

// className="w-48 mr-3 relative"
