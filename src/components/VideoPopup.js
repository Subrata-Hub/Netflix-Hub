import React from "react";

const VideoPopup = ({ mediaVideo, videoPopup }) => {
  console.log(mediaVideo);
  if (!videoPopup) {
    return null;
  }
  return (
    <div>
      <iframe
        className="w-[700px] aspect-video"
        src={`https://www.youtube.com/embed/${mediaVideo}?&autoplay=1&mute=0&showinfo=0&controls=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe>
    </div>
  );
};

export default VideoPopup;

// autoplay=1
