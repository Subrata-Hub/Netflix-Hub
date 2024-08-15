/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { addTrending } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTrending = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        API_OPTIONS
      );
      const responce = await data.json();

      dispatch(addTrending(responce.results));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrending;
