import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import lang from "../utils/languageConstants";

const GptSearch = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      const json = await data.json();
      return json.results.filter(
        (result) =>
          (result.title || result.original_name === movie) &&
          result.poster_path != null
      );
    } catch (error) {
      console.error("Error fetching TMDB results:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    dispatch(addGptMoviesResult({ loading: true }));
    const gptQuery = `Act as a Movie web series tv show  Recommendation system and suggest some movies web series tv show for the query: ${searchText.current.value}. Only give me names of 10 movies web series tv show, comma separated. Example results: Gadar, Sholay, Don, Golmal, Dhoom 3.`;

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const gptResults = await model.generateContent(gptQuery);

      if (!gptResults) {
        dispatch(addGptMoviesResult({ loading: false }));
        return null;
      }

      const gptMovies = gptResults.response.text().split(",");
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTmdb(movie.trim())
      );
      const movieResults = await Promise.all(promiseArray);

      dispatch(
        addGptMoviesResult({
          movieName: gptMovies,
          movieResults: movieResults,
          loading: false,
        })
      );
    } catch (error) {
      console.error("Error fetching GPT results:", error);
      dispatch(addGptMoviesResult({ loading: false }));
    }
  };

  return (
    <div className="pt-[30%] md:pt-[12%] flex justify-center">
      <form
        className="bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-3 m-3 col-span-9"
        />
        <button
          className="px-2 md:px-3 py-1 md:py-2 m-1 md:m-3 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
