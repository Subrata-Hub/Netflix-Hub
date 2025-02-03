<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNewIndianMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useIndianMovies = () => {
  const dispatch = useDispatch();

  const getIndianMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?page=1&region=IN&with_origin_country=IN&primary_release_year=2024&with_original_language=hi",
      API_OPTIONS
    );
    const responce = await data.json();
    const showsWithPoster = responce.results.filter(
      (show) => show.poster_path != null
    );
    dispatch(addNewIndianMovies(showsWithPoster));
  };

  useEffect(() => {
    getIndianMovies();
  });
};

export default useIndianMovies;
=======
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNewIndianMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useIndianMovies = () => {
  const dispatch = useDispatch();

  const getIndianMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?page=1&region=IN&with_origin_country=IN&primary_release_year=2024&with_original_language=hi",
      API_OPTIONS
    );
    const responce = await data.json();
    const showsWithPoster = responce.results.filter(
      (show) => show.poster_path != null
    );
    dispatch(addNewIndianMovies(showsWithPoster));
  };

  useEffect(() => {
    getIndianMovies();
  });
};

export default useIndianMovies;
>>>>>>> merge-mobinfo
