/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";

import useMediaTrailer from "../hooks/useMediaTrailer";

const VideoBackground = forwardRef(
  ({ movieId, mediaType, mute, nextVideo }, ref) => {
    const mediaTrailerVideo = useSelector((store) => store.media?.mediaTrailer);

    useMediaTrailer(mediaType, movieId);

    // if (!mediaTrailerVideo || !mediaTrailerVideo.key) return;

    return (
      <div className="w-screen relative pb-[56.25%] md:-mt-10 mt-14 z-0">
        {mediaTrailerVideo && mediaTrailerVideo.key && (
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
        )}
      </div>
    );
  }
);

export default VideoBackground;
