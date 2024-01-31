import React, { useState } from "react";

import { IMG_CDN_URL } from "../utils/constants";
import HoverMovieCard from "./HoverMovieCard";
// import LazyImage from "./LazyImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PosterFallImage from "../assets/no-poster2.jpeg";

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

  // if (!posterPath) return;

  return (
    <div>
      <div
        className="relative w-52 transition-all ease duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LazyLoadImage
          // style={{   }}
          className="w-full rounded-xl bg-transparent"
          alt="movie_card"
          src={posterPath ? IMG_CDN_URL + posterPath : PosterFallImage}
          effect="blur"
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
