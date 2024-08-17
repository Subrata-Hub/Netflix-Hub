/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMediaTrailer } from "../utils/mediaSlice";

import { useDispatch } from "react-redux";

const useMediaTrailer = (mediaType, id) => {
  const dispatch = useDispatch();

  const getTrailerVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    if (!filterData) return;
    const trailer = filterData?.length ? filterData[0] : json.results[0];

    dispatch(addMediaTrailer(trailer));
  };

  useEffect(() => {
    getTrailerVideos();
  }, [id, mediaType]);
};

export default useMediaTrailer;

// import { useEffect, useState } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { addMediaTrailer } from "../utils/mediaSlice";

// import { useDispatch } from "react-redux";

// const useMediaTrailer = (mediaType, id) => {
//   const dispatch = useDispatch();
//   const [mediaTrailer, setMediaTrailer] = useState(null); // Store trailer data in state

//   const getTrailerVideos = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
//       API_OPTIONS
//     );
//     const json = await data.json();

//     const filterData = json.results?.filter(
//       (video) => video.type === "Trailer"
//     );
//     if (!filterData) return;
//     const trailer = filterData?.length ? filterData[0] : json.results[0];

//     setMediaTrailer(trailer); // Update state with fetched trailer
//     dispatch(addMediaTrailer(trailer)); // Dispatch action for Redux store
//   };

//   useEffect(() => {
//     getTrailerVideos();

//     // Cleanup function to clear cached trailer on unmount
//     return () => {
//       setMediaTrailer(null); // Reset state to clear cache
//     };
//   }, [mediaType, id]); // Dependency array ensures effect runs on mediaType or id change

//   return mediaTrailer; // Return the fetched trailer data
// };

// export default useMediaTrailer;
