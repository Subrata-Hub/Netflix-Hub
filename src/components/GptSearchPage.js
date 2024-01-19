import React from "react";
import GptSearch from "./GptSearch";
import GptRecommendation from "./GptRecommendation";
import { BACKGROUND_IMG } from "../utils/constants";
import { changeMediaType } from "../utils/configSlice";
import { useSelector, useDispatch } from "react-redux";

const GptSearchPage = () => {
  const mediaType = useSelector((store) => store.config.mediaType);
  const dispatch = useDispatch();

  if (mediaType === "tv") {
    dispatch(changeMediaType("movie"));
  }
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
