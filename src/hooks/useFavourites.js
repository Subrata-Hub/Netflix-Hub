import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAllTimeFavourites } from "../utils/movieSlice";
import { useEffect } from "react";

const useFavourites = () => {
  const dispatch = useDispatch();

  const getFavourites = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?page=1&region=IN&sort_by=vote_count.desc&with_origin_country=IN&with_original_language=hi",
      API_OPTIONS
    );
    const responce = await data.json();

    dispatch(addAllTimeFavourites(responce.results));
  };

  useEffect(() => {
    getFavourites();
  });
};

export default useFavourites;
