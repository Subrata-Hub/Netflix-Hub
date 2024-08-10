import React from "react";
import GptSearch from "../GptSearch";
import GptRecommendation from "../GptRecommendation";
import { BACKGROUND_IMG } from "../../utils/constants";
import Header from "../shared/Header";

const GptSearchPage = () => {
  return (
    <div>
      <Header />
      <div className="fixed -z-10 w-full h-full">
        <img
          src={BACKGROUND_IMG}
          alt="bg-img"
          className="w-full h-full object-cover object-center "
        />
      </div>
      <GptSearch />
      <GptRecommendation />
    </div>
  );
};

export default GptSearchPage;
