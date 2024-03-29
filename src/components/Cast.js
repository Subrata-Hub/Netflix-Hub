import React from "react";

import { IMG_CDN_URL } from "../utils/constants";
import profileFallbackImage from "../assets/default_Profile.jpg";
import LeLazyLoadImage from "./LeLazyLoadImage";
import { Link } from "react-router-dom";

const Cast = ({ cast }) => {
  console.log(cast);
  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <div className="relative px-20 w-full">
      <h1 className="text-white text-3xl font-semibold pb-6">Top Cast</h1>
      <div className="flex gap-6 overflow-scroll">
        {cast?.map((act, index) => (
          <Link to={`/person/${act.id}`}>
            <div
              key={index}
              className="flex flex-col items-center text-center "
              onClick={handleMoreInfoClick}
            >
              <div className="w-40 h-40 overflow-y-hidden">
                <div className="rounded-full overflow-hidden bg-slate-900">
                  <LeLazyLoadImage
                    src={
                      act?.profile_path
                        ? `${IMG_CDN_URL}${act?.profile_path}`
                        : profileFallbackImage
                    }
                    alt={act?.original_name}
                    height={160}
                    width={160}
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className=" text-white font-bold text-lg mt-2 ">
                {act?.original_name}
              </div>
              <div className="text-pretty text-neutral-300">
                {act?.character}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cast;
