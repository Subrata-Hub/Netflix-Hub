import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCardHorizontal from "./MovieCardHorizontal";
import Header from "./Header";
import { RxCross2 } from "react-icons/rx";
import { removeMovieOrTVShow } from "../utils/savedSlice";

const WatchList = () => {
  const dispatch = useDispatch();
  const savedData = useSelector((store) => store.saved.savedMovieOrTVShow);

  // Sort the savedData array by the addedAt property in descending order
  const sortedSavedData = [...savedData].sort(
    (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
  );

  const handleRemoveButton = (id) => {
    dispatch(removeMovieOrTVShow(id));
  };
  return (
    <div className="bg-slate-950">
      <Header />
      <div className="pt-20 min-h-[700px] ml-4 md:ml-10">
        <h1 className="text-lg text-white text-center mb-6">My Watchlist</h1>
        {sortedSavedData.length === 0 && (
          <div className="pb-3 pt-2 text-lg text-white text-center">
            You haven't added any movies to your watchlist
          </div>
        )}

        <div className="flex gap-5 md:mx-52 mx-1">
          <div className="w-full">
            <div className="relative">
              {sortedSavedData?.map((saved) => (
                <>
                  <div
                    className=" flex gap-2 absolute  right-0 md:right-4  mt-0 md:mt-2 items-center "
                    onClick={() => handleRemoveButton(saved.cardMovieId)}
                    key={saved.cardMovieId}
                  >
                    <div className="flex justify-center items-center w-6 md:w-9 h-6 md:h-9 rounded-full bg-white ">
                      <RxCross2 className="text-black text-xl" />
                    </div>
                    <div className="hidden md:flex text-white">Remove</div>
                  </div>

                  <MovieCardHorizontal
                    posterPath={saved.posterPath}
                    title={saved.title}
                    overView={saved.overView}
                    cardMovieId={saved.cardMovieId}
                    releaseDate={saved.releaseDate}
                    mediaType={saved.mediaType}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
