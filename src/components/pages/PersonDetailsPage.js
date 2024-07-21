/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../../utils/constants";
import { IMG_CDN_URL } from "../../utils/constants";
import PosterFallImage from "../../assets/no-poster2.jpeg";
import MovieCard from "../distribute/MovieCard";
import useDate from "../../hooks/useDate";
import MovieCardHorizontal from "../MovieCardHorizontal";
import LeLazyLoadImage from "../distribute/LeLazyLoadImage";
import LodingSkeleton from "../distribute/LodingSkeleton";

const PersonDetailsPage = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const { mediaType, id } = useParams();

  console.log(mediaType, id);

  const formatedDate = useDate(data?.birthday);

  const handleShowMore = () => {
    setShowFullBiography(true);
  };

  const getPersonalDetais = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=combined_credits`,
      API_OPTIONS
    );
    const responce = await data.json();
    setLoading(false);
    setData(responce);
  };

  useEffect(() => {
    getPersonalDetais();
  }, []);

  console.log(data);

  return (
    <>
      {loading ? (
        <LodingSkeleton />
      ) : (
        <div className="pt-20 md:pt-24 min-h-[700px] text-white ml-4 md:mx-24">
          <div className="block md:flex md:gap-8">
            <div className="w-full md:w-3/12">
              <LeLazyLoadImage
                src={
                  data?.profile_path
                    ? `${IMG_CDN_URL}${data?.profile_path}`
                    : PosterFallImage
                }
                alt="poster"
                width={320}
                height={470}
              />
              <div className="md:hidden text-white text-[35px] md:text-[42px] font-sans font-semibold mt-3 md:mt-0">
                {data?.name}
              </div>
              <h1 className="text-2xl md:mt-6 mt-4 font-semibold">
                Personal Info
              </h1>
              <div className="flex flex-col gap-4 mt-4">
                <div className="">
                  <h1 className="text-xl font-semibold">Known For</h1>
                  <h1 className="">{data?.known_for_department}</h1>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">Gender</h1>
                  <h1 className="">{data?.gender === 1 ? "Female" : "Male"}</h1>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">Brithday</h1>
                  <h1 className="">{formatedDate}</h1>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">Place of Birth</h1>
                  <h1 className="">{data?.place_of_birth}</h1>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-xl font-semibold">Also Known As</h1>
                  <div className="">
                    {data?.also_known_as?.map((name) => (
                      <ul className="">
                        <li className="mb-2">{name}</li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-9/12">
              <div className="hidden md:flex text-white text-[42px] font-sans font-semibold">
                {data?.name}
              </div>
              <h1 className="text-xl pt-6">Biography</h1>

              <p className="pt-4 w-full md:max-w-[90%] ">
                {
                  data?.biography &&
                  (showFullBiography || data.biography.length > 500)
                    ? showFullBiography
                      ? data?.biography
                      : `${data?.biography.substring(0, 500)} .....`
                    : data?.biography // Render full biography if it's less than 600 characters
                }
                {!showFullBiography &&
                  data?.biography &&
                  data.biography.length > 500 && (
                    <button
                      className="text-indigo-700"
                      onClick={handleShowMore}
                    >
                      Show more
                    </button>
                  )}
              </p>

              <h1 className="text-2xl py-4 ">Known For</h1>
              <div className="flex  gap-3 overflow-scroll">
                {data?.combined_credits?.cast
                  .sort((a, b) => {
                    // You can change the sorting criteria here
                    // For example, sorting by vote_average in descending order
                    return b.vote_count - a.vote_count;
                  })
                  .slice(0, 8)
                  .map((credit, index) => (
                    <div className="" key={index}>
                      <MovieCard
                        posterPath={credit?.poster_path}
                        title={credit?.title || credit.name}
                        backImg={credit?.backdrop_path}
                        genreIds={credit?.genre_ids}
                        cardMovieId={credit?.id}
                        // character={credit?.character}
                        releaseDate={
                          credit.release_date
                            ? credit?.release_date
                            : credit?.first_air_date
                        }
                        rating={credit?.vote_average?.toFixed(1)}
                        mediaType={credit?.media_type}
                      />
                    </div>
                  ))}
              </div>

              <h1 className="text-2xl py-4">Acting</h1>
              <div className="">
                {(() => {
                  // Group movies by release year
                  const moviesByYear = {};

                  data?.combined_credits?.cast.forEach((credit) => {
                    const releaseYear = new Date(
                      credit?.release_date || credit?.first_air_date
                    ).getFullYear();

                    if (!moviesByYear[releaseYear]) {
                      moviesByYear[releaseYear] = [];
                    }

                    moviesByYear[releaseYear].push(credit);
                  });

                  // Get the sorted years
                  const sortedYears = Object.keys(moviesByYear).sort(
                    (a, b) => b - a
                  );

                  // Render movie cards for each year
                  return sortedYears.map((year, index) => (
                    <div key={index}>
                      <h2 className="text-lg font-semibold mb-2">{year}</h2>
                      <div className="flex flex-wrap gap-1">
                        {moviesByYear[year].map((credit, creditIndex) => (
                          <div className="w-full" key={creditIndex}>
                            <MovieCardHorizontal
                              posterPath={credit?.poster_path}
                              title={credit?.title || credit.name}
                              backImg={credit?.backdrop_path}
                              genreIds={credit?.genre_ids}
                              cardMovieId={credit?.id}
                              character={credit?.character}
                              releaseDate={
                                credit?.release_date
                                  ? new Date(credit?.release_date)
                                  : new Date(credit?.first_air_date)
                              }
                              rating={credit?.vote_average?.toFixed(1)}
                              mediaType={credit?.media_type}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonDetailsPage;
