/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { addTrending } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTrending = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      API_OPTIONS
    );
    const responce = await data.json();
    // const showsWithPoster = responce.results.filter(
    //   (show) => show.poster_path != null
    // );

    dispatch(addTrending(responce.results));
  };

  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrending;
