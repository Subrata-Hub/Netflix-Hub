<<<<<<< HEAD
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMediaVideo } from "../utils/mediaSlice";

const useMediaVideos = (mediaType, id) => {
  const dispatch = useDispatch();
  const getVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addMediaVideo(json?.results));
  };
  useEffect(() => {
    getVideos();
  }, [id]);
};

export default useMediaVideos;
=======
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMediaVideo } from "../utils/mediaSlice";

const useMediaVideos = (mediaType, id) => {
  const dispatch = useDispatch();
  const getVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addMediaVideo(json?.results));
  };
  useEffect(() => {
    getVideos();
  }, [id]);
};

export default useMediaVideos;
>>>>>>> merge-mobinfo
