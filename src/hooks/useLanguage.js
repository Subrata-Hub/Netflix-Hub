import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useLanguage = () => {
  const [languageData, setLanguagesData] = useState("");

  const getLanguageData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/configuration/languages",
      API_OPTIONS
    );
    const response = await data.json();
    setLanguagesData(response);
  };

  useEffect(() => {
    getLanguageData();
  }, []);

  return languageData;
};

export default useLanguage;
