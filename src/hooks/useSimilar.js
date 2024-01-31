/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSimilar } from "../utils/mediaSlice";

const useSimilar = (mediaType, id) => {
  const dispatch = useDispatch();
  const getSimilarMoviesOrShow = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/similar`,
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addSimilar(json?.results));
  };

  useEffect(() => {
    getSimilarMoviesOrShow();
  }, [id]);
};

export default useSimilar;
