import React, { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";

const InfiniteScroll = ({ fetchData, pageNumber, setPageNumber, key }) => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPageNumber]
  );

  useEffect(() => {
    const fetchDataAndAppend = async () => {
      try {
        const response = await fetchData(pageNumber);
        const newItems = response.results;

        if (!Array.isArray(newItems) || newItems.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...newItems]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger fetching when pageNumber changes
    fetchDataAndAppend();
  }, [pageNumber, fetchData, isLoading, setPageNumber, key]);

  if (items.length === 0) return <Shimmer />;

  return (
    <div className="">
      <div className="flex flex-wrap gap-3 mx-16">
        {items?.map((item, index) => (
          <div className="py-4" key={index}>
            <MovieCard
              posterPath={item.poster_path}
              title={item.original_title || item.original_name}
              backImg={item.backdrop_path}
              genreIds={item.genre_ids}
              cardMovieId={item.id}
              overView={item.overview}
              releaseDate={item.release_date || item.first_air_date}
              rating={item.vote_average.toFixed(1)}
            />
          </div>
        ))}
      </div>

      {isLoading && <Shimmer />}
      {!isLoading && hasMore && <div ref={lastItemRef}>load more</div>}
    </div>
  );
};
export default InfiniteScroll;
