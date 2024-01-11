import React from "react";
import GptSearch from "./GptSearch";
import GptRecommendation from "./GptRecommendation";
import { BACKGROUND_IMG } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={BACKGROUND_IMG} alt="bg-img" />
      </div>
      <GptSearch />
      <GptRecommendation />
    </div>
  );
};

export default GptSearchPage;
