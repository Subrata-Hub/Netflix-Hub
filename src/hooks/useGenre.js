/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useGenre = (mediaType) => {
  const [genreName, setGenreName] = useState(null);

  const getGenreName = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${mediaType}/list`,
      API_OPTIONS
    );
    const json = await data.json();
    setGenreName(json);
  };

  useEffect(() => {
    getGenreName();
  }, [mediaType]);
  return genreName;
};

export default useGenre;
