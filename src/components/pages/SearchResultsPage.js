/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../distribute/Header";
import { API_OPTIONS } from "../../utils/constants";
// import Shimmer from "../Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../distribute/Spinner";
import MovieCardHorizontal from "../MovieCardHorizontal";
import Shimmer from "../distribute/Shimmer";

const SearchResultsPage = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const { query } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}`,
      API_OPTIONS
    );
    const responce = await data.json();
    setData(responce);
    setPageNumber(2);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const nextPageData = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNumber}`,
      API_OPTIONS
    );

    const responce = await nextPageData.json();
    setData((prevData) => ({
      ...prevData,
      results: [...prevData.results, ...responce.results],
    }));
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    setPageNumber(1);
    fetchData();
  }, [query]);

  console.log(data);

  return (
    <div className="bg-slate-950">
      <Header />
      <div className="pt-16 min-h-[700px] ml-4 md:ml-10">
        <div className="pb-3 pt-2 text-lg text-white text-center">
          Search results for "{query}"
        </div>

        <div className="flex gap-5 md:mx-52 mx-1">
          <div className="w-full">
            <div className="">
              {loading && (
                <Shimmer className="w-full h-44 bg-stone-700 rounded-xl" />
              )}
              {!loading && (
                <>
                  {data.results.length === 0 && (
                    <div>
                      <h1 className="text-white text-3xl">
                        There are no movies that matched your query
                      </h1>
                    </div>
                  )}
                  {data?.results?.length > 0 ? (
                    <InfiniteScroll
                      className=""
                      dataLength={data?.results?.length}
                      next={fetchNextPageData}
                      hasMore={pageNumber < data?.total_pages}
                      loader={<Spinner show={true} />}
                    >
                      {data?.results?.map((item, index) => {
                        return (
                          <div className="" key={item.id}>
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
                              mediaType={item?.media_type}
                            />
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
      </div>
    </div>
  );
};

export default SearchResultsPage;
