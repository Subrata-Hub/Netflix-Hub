import Header from "./Header";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import InfiniteScroll from "./InfiniteScroll";
import { useState, useEffect } from "react";
import { changeMediaType } from "../utils/configSlice";

const ExplorePage = () => {
  const { mediaType } = useParams();
  const [key, setKey] = useState(mediaType);
  const dispatch = useDispatch();
  dispatch(changeMediaType(mediaType));

  const fetchData = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?page=${page}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setKey(mediaType); // Update the key when mediaType changes
  }, [mediaType]);

  return (
    <div className="">
      <Header />

      <div className="px-10 bg-black text-white py-24">
        <div>{mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}</div>

        <InfiniteScroll fetchData={fetchData} key={key} />
      </div>
    </div>
  );
};

export default ExplorePage;
