import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearch = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[13%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-3 m-3 col-span-9"
        />
        <button className="px-3 py-2 m-3 bg-red-700 text-white rounded-lg col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
