<<<<<<< HEAD
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addrecommendations } from "../utils/mediaSlice";

const useRecommendations = (mediaType, id) => {
  const dispatch = useDispatch();
  const getRecommendationsMoviesOrShow = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addrecommendations(json?.results));
  };

  useEffect(() => {
    getRecommendationsMoviesOrShow();
  }, [id]);
};

export default useRecommendations;
=======
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addrecommendations } from "../utils/mediaSlice";

const useRecommendations = (mediaType, id) => {
  const dispatch = useDispatch();
  const getRecommendationsMoviesOrShow = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addrecommendations(json?.results));
  };

  useEffect(() => {
    getRecommendationsMoviesOrShow();
  }, [id]);
};

export default useRecommendations;
>>>>>>> merge-mobinfo
