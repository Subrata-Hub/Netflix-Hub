import React from "react";
import GptSearch from "./GptSearch";
import GptRecommendation from "./GptRecommendation";
import { BACKGROUND_IMG } from "../utils/constants";
import { changeMediaType } from "../utils/configSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";

const GptSearchPage = () => {
  const mediaType = useSelector((store) => store.config.mediaType);
  const dispatch = useDispatch();

  if (mediaType === "tv") {
    dispatch(changeMediaType("movie"));
  }
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
