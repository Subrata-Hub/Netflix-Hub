/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./Header";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import MovieCardHorizontal from "./MovieCardHorizontal";
import { changeMediaType } from "../utils/configSlice";
import useGenre from "../hooks/useGenre";
import { useMediaQuery } from "react-responsive";
import { sortbyData } from "../utils/constants";
import Spinner from "./Spinner";
import { IoGridOutline } from "react-icons/io5";
import { MdViewList } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import useLanguage from "../hooks/useLanguage";
import Select from "react-select";

let filters = {};

const ExplorePage = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const [listView, setListView] = useState(false);
  const [gridView, setgridView] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showOptions, setShowOptions] = useState([true, false, false]);

  const { mediaType } = useParams();
  const dispatch = useDispatch();
  const genreData = useGenre();
  const languages = useLanguage();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?&${new URLSearchParams(
        filters
      )}`,
      API_OPTIONS
    );
    const responseData = await response.json();
    setData(responseData);
    setPageNumber(2);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?&page=${pageNumber}&${new URLSearchParams(
        filters
      )}`,
      API_OPTIONS
    );
    const responseData = await response.json();
    setData((prevData) => ({
      ...prevData,
      results: [...prevData.results, ...responseData.results],
    }));
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNumber(1);

    setSelectedGenre("");
    setSelectedSort("");
    setSelectedOption("");

    fetchData();
    dispatch(changeMediaType(mediaType));
  }, [mediaType]);

  const onchanges = (selectedOption, selectType) => {
    const value = selectedOption ? selectedOption.iso_639_1 : "";

    if (selectType === "language") {
      setSelectedOption(value);
      filters.with_original_language = value;
    }

    setPageNumber(1);
    fetchData();
  };

  const onchange = (e, selectType) => {
    console.log("onchange called");

    const value = e.target.value;

    console.log(value);

    if (selectType === "genre") {
      let updatedGenre;
      if (selectedGenre.includes(value)) {
        // If already selected, remove it from the array
        updatedGenre = selectedGenre.filter((genre) => genre !== value);
      } else {
        // If not selected, add it to the array
        updatedGenre = [...selectedGenre, value];
      }
      setSelectedGenre(updatedGenre);

      if (updatedGenre.length > 0) {
        filters.with_genres = updatedGenre.join(",");
      } else {
        // filters.with_genres = ""; // or any other default value you want
        delete filters.with_genres; // remove filter if no genres are selected
      }
    } else if (selectType === "sort") {
      setSelectedSort(value);
      filters.sort_by = value;
    }

    setPageNumber(1);
    fetchData();
  };

  const showListView = () => {
    setListView(true);
    setgridView(false);
  };

  const showGridView = () => {
    setgridView(true);
    setListView(false);
  };

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleShowOption = (index) => {
    setShowOptions((prevOptions) =>
      prevOptions.map((option, i) => (i === index ? !option : false))
    );
  };

  return (
    <div className="bg-slate-950 overflow-hidden">
      <Header />

      <div className="pt-20 md:pt-[68px] pb-4 mx-4 md:mx-14 flex justify-between items-center">
        <IoMdMenu
          className="text-white text-2xl md:hidden"
          onClick={toggleShowFilter}
        />
        <div className="font-semibold text-2xl text-white ">
          {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
        </div>
        <div className="text-white flex gap-4 items-center mr-2">
          <IoGridOutline className="text-2xl" onClick={showGridView} />
          <MdViewList className="text-3xl" onClick={showListView} />
        </div>
      </div>

      <div
        className={` min-h-[700px] ${
          showFilter && isMobile ? "flex-col" : "flex"
        } mx-10 md:mx-12  md:gap-4`}
      >
        <div className={`flex flex-col  md:w-[20%]`}>
          <div
            className={`flex gap-4 ${
              !showFilter && isMobile ? "hidden" : "flex-col"
            }  `}
          >
            {/* filter card 1 */}
            <div className="flex-col w-full py-3  bg-slate-900 rounded-md px-3 border border-gray-600">
              <div
                className="flex justify-between items-center"
                onClick={() => toggleShowOption(0)}
              >
                <h1 className="text-white text-lg font-semibold">Genres</h1>
                {!showOptions ? (
                  <MdKeyboardArrowRight className="text-2xl text-white" />
                ) : (
                  <MdKeyboardArrowDown className="text-2xl text-white" />
                )}
              </div>
              {showOptions[0] && (
                <>
                  <div className="w-full h-2 border-b border-gray-600"></div>

                  <div className="text-white flex flex-wrap py-2">
                    {genreData?.genres?.map((genre) => (
                      <button
                        className={`px-3.5 py-1 m-1 rounded-2xl border border-gray-400 ${
                          selectedGenre.includes(genre.id.toString())
                            ? "bg-fuchsia-700"
                            : "bg-slate-800"
                        }`}
                        key={genre.id}
                        value={genre.id}
                        onClick={(e) => onchange(e, "genre")}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* filter card 2 */}
            <div className="flex-col w-full py-3  bg-slate-900 rounded-md px-3 border-b border-gray-600">
              <div
                className="flex justify-between items-center"
                onClick={() => toggleShowOption(1)}
              >
                <h1 className="text-white text-lg font-semibold">Sort</h1>
                {!showOptions ? (
                  <MdKeyboardArrowRight className="text-2xl text-white" />
                ) : (
                  <MdKeyboardArrowDown className="text-2xl text-white" />
                )}
              </div>
              {showOptions[1] && (
                <>
                  <div className="w-full h-2 border-b border-gray-600"></div>
                  <div className="text-white">
                    <h1 className="py-2 text-sm font-light">Sort Results By</h1>
                    <select
                      className="py-2 rounded-lg text-white bg-slate-800 w-full"
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
                </>
              )}
            </div>
            {/* filter card 3 */}
            <div className="flex-col w-full py-3  bg-slate-900 rounded-md px-3 border-b border-gray-600">
              <div
                className="flex justify-between items-center"
                onClick={() => toggleShowOption(2)}
              >
                <h1 className="text-white text-lg font-semibold">Languages</h1>
                {!showOptions ? (
                  <MdKeyboardArrowRight className="text-2xl text-white" />
                ) : (
                  <MdKeyboardArrowDown className="text-2xl text-white" />
                )}
              </div>
              {showOptions[2] && (
                <>
                  <div className="w-full h-2 border-b border-gray-600"></div>
                  <div className="text-white">
                    <Select
                      options={languages.slice(1)}
                      defaultValue={selectedOption}
                      placeholder={"Select languages"}
                      getOptionLabel={(option) => option.english_name}
                      getOptionValue={(option) => option.iso_639_1}
                      onChange={(selectedOption) =>
                        onchanges(selectedOption, "language")
                      }
                      isSearchable
                      isClearable
                      noOptionsMessage={() => "No Option Found"}
                      styles={{
                        menuList: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#0b131c",
                          color: "white",
                        }),

                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#0b131c",
                          ":hover": {
                            backgroundColor: "#2a2d3b", // Adjust hover background color as needed
                          },
                        }),
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`w-full md:w-[80%] mt-6 md:mt-0`}>
          {loading && (
            <Shimmer className="w-[125px] md:w-52 h-[185px] md:h-80 bg-stone-700 rounded-xl" />
          )}

          {!loading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="flex flex-wrap gap-5 md:gap-3"
                  dataLength={data?.results?.length}
                  next={fetchNextPageData}
                  hasMore={pageNumber < data?.total_pages}
                  loader={<Spinner show={true} />}
                >
                  {data?.results?.map((item, index) => {
                    return (
                      <div className="" key={index}>
                        {gridView && (
                          <MovieCard
                            posterPath={item?.poster_path}
                            title={item?.original_title || item.original_name}
                            backImg={item?.backdrop_path}
                            genreIds={item?.genre_ids}
                            cardMovieId={item?.id}
                            overView={item?.overview}
                            releaseDate={
                              item?.release_date || item?.first_air_date
                            }
                            rating={item?.vote_average?.toFixed(1)}
                          />
                        )}

                        {listView && (
                          <MovieCardHorizontal
                            posterPath={item?.poster_path}
                            profilePath={item?.profile_path}
                            title={item?.title || item.name}
                            backImg={item?.backdrop_path}
                            genreIds={item?.genre_ids}
                            cardMovieId={item?.id}
                            overView={item?.overview}
                            releaseDate={
                              item?.release_date || item?.first_air_date
                            }
                            rating={item?.vote_average?.toFixed(1)}
                            department={item?.known_for_department}
                            knownFor={item?.known_for}
                            mediaTypes={item?.media_type}
                          />
                        )}
                      </div>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <div className="text-white font-bold text-3xl text-center">
                  <span>Result not found </span>
                  <span>Try to unselect some genre</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
