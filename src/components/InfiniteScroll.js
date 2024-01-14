import React, { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";

const InfiniteScroll = ({ fetchData, mediaType }) => {
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
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
    [isLoading, hasMore]
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
  }, [pageNumber, fetchData, isLoading]);

  return (
    <div className="">
      <div className="flex flex-wrap gap-3 mx-16">
        {items.map((item, index) => (
          <div className="py-4">
            <MovieCard
              posterPath={item?.poster_path}
              key={`${item.id}-${index}`}
              title={item?.original_title || item.original_name}
              backImg={item?.backdrop_path}
              genreIds={item?.genre_ids}
              cardMovieId={item?.id}
              overView={item?.overview}
              releaseDate={item?.release_date || item?.first_air_date}
              rating={item?.vote_average?.toFixed(1)}
              // Set the ref only for the last item
              ref={index === items.length - 1 ? lastItemRef : null}
            />
          </div>
        ))}
      </div>

      {isLoading && <li>Loading...</li>}
      {!isLoading && hasMore && <li ref={lastItemRef}>Load more</li>}
    </div>
  );
};

export default InfiniteScroll;
