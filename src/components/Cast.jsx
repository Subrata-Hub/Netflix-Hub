/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { IMG_CDN_URL } from "../utils/constants";
import profileFallbackImage from "../assets/default_Profile.jpg";
import { Link } from "react-router-dom";
import LeLazyLoadImage from "./shared/LeLazyLoadImage";

const Cast = ({ cast }) => {
  const handleMoreInfoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="relative md:px-10 px-4 w-full">
      <h1 className="text-white md:text-3xl text-2xl pl-2 font-semibold pb-6">
        Top Cast
      </h1>
      <div className="flex gap-6 overflow-scroll">
        {cast?.map((act, index) => (
          <Link to={`/person/${act.id}`} key={act.id}>
            <div
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
              <div className="text-pretty text-neutral-300 ml-2">
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
