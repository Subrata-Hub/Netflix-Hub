import React, { useRef } from "react";

import lang from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearch = () => {
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie in TMDB

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      `
    https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movie
    )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await data.json();
    console.log(json.results.filter((result) => result.title === movie));
    return json.results.filter((result) => result.title === movie);
  };

  const handleGptSearchClick = async () => {
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query : ${searchText.current.value}.only give me names of 20 movies, comma seperated like the example results given ahead.Example results: Gadar, Sholay, Don, Golmal, Dhoom 3`;
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // write error handaling
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) =>
      searchMovieTmdb(movie.trim())
    );
    const movieResults = await Promise.all(promiseArray);

    dispatch(
      addGptMoviesResult({
        movieName: gptMovies,
        movieResults: movieResults,
      })
    );
  };

  return (
    <div className="pt-[12%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-3 m-3 col-span-9"
        />
        <button
          className="px-3 py-2 m-3 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
