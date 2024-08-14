/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { addTrending } from "../utils/movieSlice";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTrending = () => {
  const [hasError, setHasError] = useState(false);
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
      setHasError(true);
      console.error("Faield to fetch Tending Movies or TV Show:", error);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  return { hasError };
};

export default useTrending;
