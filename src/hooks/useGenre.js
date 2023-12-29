import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useGenre = () => {
  const [genreName, setGenreName] = useState(null);

  const getGenreName = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      API_OPTIONS
    );
    const json = await data.json();
    setGenreName(json);
  };

  useEffect(() => {
    getGenreName();
  }, []);
  return genreName;
};

export default useGenre;
