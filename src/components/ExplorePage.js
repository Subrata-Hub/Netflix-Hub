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
import { sortbyData, SELECT_LANGUAGES } from "../utils/constants";
import Spinner from "./Spinner";
import { IoGridOutline } from "react-icons/io5";
import { MdViewList } from "react-icons/md";

let filters = {};

const ExplorePage = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState("");
  const [listView, setListView] = useState(false);
  const [gridView, setgridView] = useState(true);

  const { mediaType } = useParams();
  const dispatch = useDispatch();
  const genreData = useGenre();

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
    console.log("useEffect called");
    filters = {};
    setData(null);
    setPageNumber(1);

    setSelectedGenre("");
    setSelectedSort("");
    setSelectedLanguages("");
    fetchData();
    dispatch(changeMediaType(mediaType));
  }, [mediaType]);

  const onchange = (e, selectType) => {
    console.log("onchange called");
    const value = e.target.value;

    if (selectType === "genre") {
      setSelectedGenre(value);
      filters.with_genres = value;
    } else if (selectType === "sort") {
      setSelectedSort(value);
      filters.sort_by = value;
    } else if (selectType === "language") {
      setSelectedLanguages(value);
      filters.with_original_language = value;
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

  return (
    <div className="bg-slate-950 overflow-hidden">
      <Header />

      <div className="pt-24 pb-4 mx-14 flex justify-between items-center">
        <div className="font-semibold text-2xl text-white ">
          {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
        </div>
        <div className="text-white flex gap-4 items-center mr-2">
          <IoGridOutline className="text-2xl" onClick={showGridView} />
          <MdViewList className="text-3xl" onClick={showListView} />
        </div>
      </div>

      <div className=" min-h-[700px] flex mx-12 gap-4">
        <div className="flex flex-col w-[20%] gap-4">
          <div className="flex flex-col gap-8">
            <select
              className="py-3 text-white bg-slate-500 rounded-lg"
              onChange={(e) => onchange(e, "genre")}
              value={selectedGenre}
            >
              <option value="" disabled hidden>
                Select Genres
              </option>
              {genreData?.genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="py-3 rounded-lg text-white bg-slate-500"
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
            <select
              className="py-3 rounded-lg text-white bg-slate-500"
              onChange={(e) => onchange(e, "language")}
              value={selectedLanguages}
            >
              <option value="" disabled hidden>
                Selet Languages
              </option>

              {SELECT_LANGUAGES?.map((lan) => (
                <option key={lan.identifier} value={lan.identifier}>
                  {lan.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-[80%] mt-0">
          {loading && <Shimmer className="w-52 h-80 bg-stone-700 rounded-xl" />}
          {!loading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="flex flex-wrap gap-3"
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
                <span>Result not found</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
