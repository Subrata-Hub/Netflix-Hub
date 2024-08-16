import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ mediaVideo, videoPopup, nextVideo }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Reset video to the beginning
    }
  }, [playerRef]);

  if (!videoPopup) {
    return null;
  }

  return (
    <div className="relative w-full md:w-[900px] mt-10 aspect-video">
      {mediaVideo ? (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${mediaVideo}`}
          className="absolute top-0 left-0 bg-slate-900"
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          pip={true}
          onEnded={nextVideo}
          config={{
            youtube: {
              playerVars: { showinfo: 0, rel: 0 },
            },
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-black text-white">
          <p className="font-bold text-2xl">No trailer available</p>
        </div>
      )}
    </div>
  );
};

export default VideoPopup;
