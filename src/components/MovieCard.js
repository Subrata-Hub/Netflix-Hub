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

  return (
    <div
      className="w-48 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-auto"
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
  );
};

export default MovieCard;

// className="w-48 mr-3 relative"
