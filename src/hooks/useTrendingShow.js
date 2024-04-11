/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingShow } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrendingShow = () => {
  const dispatch = useDispatch();

  const getTrendingShow = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week",
      API_OPTIONS
    );
    const responce = await data.json();
    dispatch(addTrendingShow(responce?.results));
  };

  useEffect(() => {
    getTrendingShow();
  }, []);
};

export default useTrendingShow;
