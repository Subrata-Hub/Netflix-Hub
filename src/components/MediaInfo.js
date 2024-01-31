import React, { useState } from "react";
import useMediaInfo from "../hooks/useMediaInfo";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PosterFallImage from "../assets/no-poster2.jpeg";
import CircularProgress from "./CircularProgress";
import Shimmer from "./Shimmer";
import { AiOutlinePlayCircle } from "react-icons/ai";
import useDate from "../hooks/useDate";
import { convertHoursAndMinutes } from "../utils/constants";
import Cast from "./Cast";
import useMediaTrailer from "../hooks/useMediaTrailer";
import VideoPopup from "./VideoPopup";
// import { setShowPopup } from "../utils/configSlice";

const MediaInfo = ({ mediaType, id }) => {
  const [videoPopup, setVideoPopup] = useState(false);
  const mediaInfoData = useSelector((store) => store.media?.mediaInfo);
  const mediaTrailerVideo = useSelector((store) => store.media?.mediaTrailer);

  useMediaInfo(mediaType, id);

  useMediaTrailer(mediaType, id);

  const formattedDate = useDate(
    mediaInfoData?.release_date || mediaInfoData?.first_air_date
  );

  const convertHourAndMinute = convertHoursAndMinutes(mediaInfoData?.runtime);

  const genreNames = mediaInfoData?.genres?.map((genre) => genre.name);
  const director = mediaInfoData?.credits?.crew?.filter(
    (d) => d.job === "Director"
  );

  const directorNames = director?.map((dname) => dname.name);

  const writer = mediaInfoData?.credits?.crew?.filter(
    (w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
  );

  const writerNames = writer?.map((wname) => wname.name);
  const creatorNames = mediaInfoData?.created_by?.map((c) => c.name);

  const handleShowPopup = () => {
    setVideoPopup(true);
  };

  const handleHidePopup = () => {
    setVideoPopup(false);
  };

  if (!mediaInfoData) return <Shimmer />;
  return (
    <>
      <div className="pt-52 w-full pb-10">
        <div className="w-full h-full absolute top-0 left-0 overflow-hidden bg-black opacity-30">
          <LazyLoadImage
            className="w-full h-full object-center object-cover"
            src={`${IMG_CDN_URL}${mediaInfoData?.backdrop_path}`}
            alt="media-banar"
            effect="blur"
          />
        </div>

        {/* <div className="absolute w-full bottom-0 left-0 bg-current h-full opacity-80"></div> */}
        <div className="absolute w-full bottom-0 left-0 bg-gradient-to-t from-black h-[500px] opacity-100"></div>
        <div className="relative flex gap-12 pl-52">
          <div className="block w-[20rem]">
            <LazyLoadImage
              className="w-full rounded-2xl "
              src={
                mediaInfoData?.poster_path
                  ? `${IMG_CDN_URL}${mediaInfoData?.poster_path}`
                  : PosterFallImage
              }
              alt="poster"
              effect="blur"
            />
          </div>

          <div className="">
            <p className="text-white text-[42px] font-sans font-semibold">
              {mediaInfoData?.original_title || mediaInfoData?.original_name}{" "}
              <span className="text-[38px]">
                (
                {new Date(
                  mediaInfoData?.release_date || mediaInfoData?.first_air_date
                ).getFullYear()}
                )
              </span>
            </p>
            <p className="text-gray-400 text-[18px] -mt-1">
              {mediaInfoData?.tagline}
            </p>
            <div className="text-white py-4">
              {" "}
              {genreNames?.map((genreName, index) => (
                <button
                  className="bg-orange-700 text-[12px] px-1.5 py-0.5 text-center rounded-md mr-1.5"
                  key={index}
                >
                  {genreName}
                </button>
              ))}
            </div>
            <div className="flex gap-6 align-middle">
              <div className="mt-1.5">
                <CircularProgress
                  rating={mediaInfoData?.vote_average?.toFixed(1)}
                  size={"w-20 h-20"}
                />
              </div>
              <div
                className="text-white flex items-center gap-2 text-xl"
                onClick={handleShowPopup}
              >
                <AiOutlinePlayCircle className="text-yellow-500 text-[88px]" />{" "}
                Watch Trailer
              </div>
            </div>

            {videoPopup && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <VideoPopup
                  mediaVideo={mediaTrailerVideo?.key}
                  videoPopup={videoPopup}
                />
                <button
                  className="absolute top-36 right-[356px] text-white text-2xl cursor-pointer"
                  onClick={handleHidePopup}
                >
                  Close
                </button>
              </div>
            )}

            <div className="text-white text-2xl mt-3">Overview</div>
            <div className="text-white max-w-[45rem] mt-2">
              {mediaInfoData.overview}
            </div>
            <div className="flex gap-5 text-white mt-6 items-center">
              <div className="font-semibold text-lg">
                Status:{" "}
                <span className="text-slate-300 text-base font-normal ml-1">
                  {mediaInfoData.status ? mediaInfoData.status : ""}
                </span>
              </div>
              {mediaType === "movie" ? (
                <>
                  <div className="font-semibold text-lg">
                    Release Date:{" "}
                    <span className="text-slate-300 text-base font-normal ml-1">
                      {formattedDate ? formattedDate : ""}
                    </span>
                  </div>
                  <div className="font-semibold text-lg">
                    Runtime:{" "}
                    <span className="text-slate-300 text-base font-normal ml-1">
                      {convertHourAndMinute ? convertHourAndMinute : ""}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-semibold text-[17px]">
                    Number Of Episodes:{" "}
                    <span className="text-slate-300 text-[14px] font-normal ml-1">
                      {mediaInfoData?.number_of_episodes
                        ? mediaInfoData?.number_of_episodes
                        : ""}
                    </span>
                  </div>
                  <div className="font-semibold text-[17px]">
                    Number Of Seasons:{" "}
                    <span className="text-slate-300 text-[14px] font-normal ml-1">
                      {mediaInfoData?.number_of_seasons
                        ? mediaInfoData?.number_of_seasons
                        : ""}
                    </span>
                  </div>
                </>
              )}
            </div>

            {directorNames.length > 0 ? (
              <div className="font-semibold text-[17px] text-white mt-4">
                Director:{" "}
                <span className="text-slate-300 text-[16px] font-normal ml-1">
                  {directorNames.join(" ,")}
                </span>
              </div>
            ) : (
              ""
            )}

            {writerNames.length > 0 ? (
              <div className="font-semibold text-[17px] text-white mt-4 mr-2">
                Writer:{"  "}
                <span className="text-slate-300 text-[16px] font-normal ml-1">
                  {writerNames.join(" ,  ")}
                </span>
              </div>
            ) : (
              ""
            )}

            {creatorNames && creatorNames.length > 0 ? (
              <div className="font-semibold text-[17px] text-white mt-4 mr-2">
                Creator:{"  "}
                <span className="text-slate-300 text-[16px] font-normal ml-1">
                  {creatorNames.join(" ,  ")}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="">
        <Cast cast={mediaInfoData?.credits?.cast} />
      </div>
    </>
  );
};

export default MediaInfo;
