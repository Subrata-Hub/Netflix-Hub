import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMediaTrailer } from "../utils/mediaSlice";

import { useDispatch } from "react-redux";

const useMediaTrailer = (mediaType, id) => {
  // const mediaType = useSelector((store) => store.config.mediaType);
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
  }, [id]);
};

export default useMediaTrailer;
