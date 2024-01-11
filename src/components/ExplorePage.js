import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
// import GptSearchPage from "./GptSearchPage";
// import { useSelector } from "react-redux";

// import GptSearchPage from "./GptSearchPage";

const ExplorePage = () => {
  const { mediaType } = useParams();
  
  return (
    <div>
      <Header />

      <div className="p-20 m-10">
        {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
      </div>
    </div>
  );
};

export default ExplorePage;
