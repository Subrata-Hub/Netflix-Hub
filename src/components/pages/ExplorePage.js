/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../distribute/Header";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../../utils/constants";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../distribute/MovieCard";
import MovieCardHorizontal from "../MovieCardHorizontal";
import useGenre from "../../hooks/useGenre";
import { useMediaQuery } from "react-responsive";
import { sortbyData } from "../../utils/constants";
import Spinner from "../distribute/Spinner";
import { IoGridOutline } from "react-icons/io5";

import useLanguage from "../../hooks/useLanguage";
import GenreFilter from "../filters/GenreFilter";
import SortFilter from "../filters/SortFilter";
import LanguageFilter from "../filters/LanguageFilter";
import { MdViewList } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import Shimmer from "../distribute/Shimmer";

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
  const genreData = useGenre(mediaType);
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
    const value = e.target.value;
    if (selectType === "genre") {
      let updatedGenre;
      if (selectedGenre.includes(value)) {
        updatedGenre = selectedGenre.filter((genre) => genre !== value);
      } else {
        updatedGenre = [...selectedGenre, value];
      }
      setSelectedGenre(updatedGenre);
      if (updatedGenre.length > 0) {
        filters.with_genres = updatedGenre.join(",");
      } else {
        delete filters.with_genres;
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
        className={`min-h-[700px] ${
          showFilter && isMobile ? "flex-col" : "flex"
        } mx-10 md:mx-12  md:gap-4`}
      >
        <div className={`flex flex-col  md:w-[20%]`}>
          <div
            className={`flex gap-4 ${
              !showFilter && isMobile ? "hidden" : "flex-col"
            }`}
          >
            <GenreFilter
              genres={genreData?.genres}
              selectedGenre={selectedGenre}
              toggleShowOption={toggleShowOption}
              showOption={showOptions[0]}
              onchange={onchange}
            />
            <SortFilter
              sortbyData={sortbyData}
              selectedSort={selectedSort}
              toggleShowOption={toggleShowOption}
              showOption={showOptions[1]}
              onchange={onchange}
            />
            <LanguageFilter
              languages={languages}
              selectedOption={selectedOption}
              toggleShowOption={toggleShowOption}
              showOption={showOptions[2]}
              onchanges={onchanges}
            />
          </div>
        </div>

        <div className={`w-full md:w-[80%] mt-6 md:mt-0`}>
          {loading && (
            <Shimmer
              className="w-[125px] md:w-52 h-[185px] md:h-80 bg-stone-700 rounded-xl"
              size={18}
            />
          )}

          {!loading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="flex flex-wrap gap-5 md:gap-3"
                  dataLength={data?.results?.length}
                  next={fetchNextPageData}
                  hasMore={pageNumber < data?.total_pages}
                  loader={
                    <Spinner
                      show={true}
                      position={"bottom-0"}
                      sized={"size-12"}
                    />
                  }
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
                            mediaType={mediaType}
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
                            mediaType={mediaType}
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
