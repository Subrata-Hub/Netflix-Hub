import Header from "./Header";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import InfiniteScroll from "./InfiniteScroll";
import { useState, useEffect } from "react";
import { changeMediaType } from "../utils/configSlice";
import useGenre from "../hooks/useGenre";
import { sortbyData } from "../utils/constants";

// let filters = {};

const ExplorePage = () => {
  const { mediaType } = useParams();
  const [key, setKey] = useState(mediaType);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const genreData = useGenre();
  console.log(filters);

  const fetchData = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?&page=${page}&${new URLSearchParams(
        filters
      )}`,
      API_OPTIONS
    );
    const data = await response.json();
    return data;
  };

  const onchange = (e, selectType) => {
    const value = e.target.value;
    const newFilters = { ...filters }; // Create a copy of filters

    if (selectType === "genre") {
      setSelectedGenre(value);
      newFilters.with_genres = value;
    } else if (selectType === "sort") {
      setSelectedSort(value);
      newFilters.sort_by = value;
    }

    setFilters(newFilters); // Update filters using the new copy
  };

  useEffect(() => {
    setKey(mediaType);
    setFilters({}); // Reset filters

    setPageNumber(1);
    setSelectedGenre("");
    setSelectedSort("");
    dispatch(changeMediaType(mediaType));
  }, [mediaType, dispatch]);

  return (
    <div className="">
      <Header />

      <div className="px-10 bg-black py-24">
        <div className="flex justify-between py-4 px-16 align-middle">
          <div className="font-semibold text-2xl text-white">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="mr-4">
            <select
              className="px-12 py-2 mr-4 text-white bg-slate-500 rounded-lg"
              onChange={(e) => onchange(e, "genre")}
              value={selectedGenre}
            >
              <option value="" disabled hidden>
                Select Genres
              </option>
              {genreData?.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="px-8 py-2 rounded-lg text-white bg-slate-500"
              onChange={(e) => onchange(e, "sort")}
              value={selectedSort}
            >
              <option value="" disabled hidden>
                Sort by
              </option>
              {sortbyData?.map((sort) => (
                <option key={sort.value} value={sort.value}>
                  {sort.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <InfiniteScroll
          fetchData={fetchData}
          key={`${key}-${selectedGenre}-${selectedSort}`}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
