import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_CDN_URL } from "../utils/constants";
import profileFallbackImage from "../assets/default_Profile.jpg";

const Cast = ({ cast }) => {
  return (
    <div className="relative px-20 w-full bg-black ">
      <h1 className="text-white text-3xl font-semibold pb-6">Top Cast</h1>
      <div className="flex gap-6 overflow-scroll">
        {cast?.map((act, index) => (
          <div key={index} className="flex flex-col items-center text-center ">
            <div className="w-40 h-40 overflow-y-hidden">
              <LazyLoadImage
                className="w-full h-full object-cover object-top rounded-full overflow-hidden"
                src={
                  act?.profile_path
                    ? `${IMG_CDN_URL}${act?.profile_path}`
                    : profileFallbackImage
                }
                alt={act?.original_name}
                effect="blur"
              />
            </div>
            <div className=" text-white font-bold text-lg mt-2 ">
              {act?.original_name}
            </div>
            <div className="text-pretty text-neutral-300">{act?.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
