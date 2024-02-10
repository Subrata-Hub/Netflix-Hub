// import { useDispatch } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { useEffect } from "react";
// import { addMediaInfo } from "../utils/mediaSlice";

// const useMediaInfo = (mediaType, id) => {
//   const dispatch = useDispatch();
//   const getMediaInfo = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits`,
//       API_OPTIONS
//     );
//     const json = await data.json();

//     dispatch(addMediaInfo(json));
//   };

//   useEffect(() => {
//     getMediaInfo();
//   }, [id]);
// };

// export default useMediaInfo;

// import { useDispatch } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { useEffect } from "react";
// import { addMediaInfo } from "../utils/mediaSlice";

// const useMediaInfo = (mediaType, id) => {
//   const dispatch = useDispatch();

//   useEffect(() => {

//     const getMediaInfo = async () => {
//       try {
//         const data = await fetch(
//           `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits`,
//           API_OPTIONS
//         );
//         const json = await data.json();

//         dispatch(addMediaInfo(json));
//       } catch (error) {
//         console.error("Error fetching media info:", error);
//       }
//     };

//     getMediaInfo();
//   }, [dispatch, mediaType, id]);
// };

// export default useMediaInfo;
