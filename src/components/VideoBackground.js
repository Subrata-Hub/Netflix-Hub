/* eslint-disable react-hooks/exhaustive-deps */

import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";
// import useMovieTrailer from "../hooks/useMovieTrailer";
import useMediaTrailer from "../hooks/useMediaTrailer";

const VideoBackground = forwardRef(
  ({ movieId, mediaType, mute, nextVideo }, ref) => {
    const mediaTrailerVideo = useSelector((store) => store.media?.mediaTrailer);
    // useMovieTrailer(movieId);
    useMediaTrailer(mediaType, movieId);

    if (!mediaTrailerVideo || !mediaTrailerVideo.key) return null;

    return (
      <div className="w-screen relative pb-[56.25%]">
        <ReactPlayer
          ref={ref}
          url={`https://www.youtube.com/watch?v=${mediaTrailerVideo?.key}`}
          className="video"
          playing={true}
          muted={mute}
          controls={false}
          pip={true}
          onEnded={nextVideo}
        />
      </div>
    );
  }
);

export default VideoBackground;
