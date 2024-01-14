// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";

// import { addTrailerVideo } from "../utils/movieSlice";

// const useMovieTrailer = (movieId) => {
//   const mediaType = useSelector((store) => store.config.mediaType);
//   const dispatch = useDispatch();

//   const getMovieVideos = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos`,
//       API_OPTIONS
//     );
//     const json = await data.json();

//     const filterData = json.results?.filter(
//       (video) => video.type === "Trailer"
//     );
//     if (!filterData) return;
//     const trailer = filterData.length ? filterData[0] : json.results[0];
//     if (mediaType === "movie") {
//       dispatch(addTrailerVideo(trailer));
//     } else {
//       dispatch(addTVShowTrailer(trailer));
//     }
//   };

//   useEffect(() => {
//     getMovieVideos();
//   }, []);
// };

// export default useMovieTrailer;
