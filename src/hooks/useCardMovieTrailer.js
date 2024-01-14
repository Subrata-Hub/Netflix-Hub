/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/movieSlice";

import { useDispatch, useSelector } from "react-redux";

const useCardMovieTrailer = (cardMovieId) => {
  const mediaType = useSelector((store) => store.config.mediaType);
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${cardMovieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useCardMovieTrailer;
