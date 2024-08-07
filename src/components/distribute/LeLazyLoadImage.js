import React from "react";
import LazyLoad from "react-lazy-load";
import { useState } from "react";

const LeLazyLoadImage = ({
  src,
  alt,
  height,
  width,
  threshold = 0.1,
  offset = 100,
  handleImageVisible,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <LazyLoad
      height={height}
      width={width}
      threshold={threshold}
      offset={offset}
      onContentVisible={handleImageVisible}
    >
      <img
        className={`w-full h-full object-center object-cover object-top rounded-xl blur-effect ${
          imageLoaded ? "is-visible" : ""
        }`}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
      />
    </LazyLoad>
  );
};

export default LeLazyLoadImage;
