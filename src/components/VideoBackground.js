/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";

import useMediaTrailer from "../hooks/useMediaTrailer";

const VideoBackground = ({ movieId, mediaType, mute, nextVideo }) => {
  const ref = useRef(null);
  const mediaTrailerVideo = useSelector((store) => store.media?.mediaTrailer);
  useMediaTrailer(mediaType, movieId);

  useEffect(() => {
    const player = ref.current;

    return () => {
      // Ensure the video is stopped when component unmounts
      if (player && player.getInternalPlayer) {
        const internalPlayer = player.getInternalPlayer();
        if (internalPlayer && internalPlayer.stopVideo) {
          internalPlayer.stopVideo();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.seekTo) {
      ref.current.seekTo(0); // Reset video to the start
    }
  }, [movieId]); // Reset video position when movie changes

  return (
    <div className="relative w-full h-0 pb-[56.25%] mt-14 md:-mt-10 z-10">
      {mediaTrailerVideo?.key && (
        <ReactPlayer
          ref={ref}
          url={`https://www.youtube.com/watch?v=${mediaTrailerVideo?.key}`}
          playing={true}
          muted={mute}
          controls={false}
          onEnded={nextVideo}
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};

export default VideoBackground;
