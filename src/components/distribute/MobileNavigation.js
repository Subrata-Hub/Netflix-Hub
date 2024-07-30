import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const MobileNavigation = ({
  openNavigation,
  handleClick,
  handleMovieClick,
  handleTVShowClick,
  handleGptSearchClicked,
  toggleNavigation,
}) => {
  return (
    <nav
      className={`lg:hidden fixed top-0 left-0 w-full h-full ${
        openNavigation ? "block" : "hidden"
      } bg-slate-950 z-50`}
    >
      <div className="flex flex-col items-center justify-center m-auto">
        <ul className="text-white flex flex-col gap-4 text-lg mt-16">
          <li
            className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
            onClick={handleClick}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
            onClick={handleMovieClick}
          >
            Movies
          </li>
          <li
            className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
            onClick={handleTVShowClick}
          >
            TV Shows
          </li>
          <li
            className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
            onClick={handleClick}
          >
            <Link to="/watchlist">WatchList</Link>
          </li>
          <li
            className="block relative font-code text-xl uppercase text-white transition-colors hover:text-purple-400 px-10 py-6 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-white xl:px-6"
            onClick={handleClick}
          >
            <button
              className="px-3 py-1 mx-2 my-1 mb-2 bg-violet-800 font-semibold text-white ml-0 md:ml-20 "
              onClick={handleGptSearchClicked}
            >
              GPT Search
            </button>
          </li>
        </ul>
        <IoMdClose
          className="text-white text-2xl md:hidden absolute top-5 right-5"
          onClick={toggleNavigation}
        />
      </div>
    </nav>
  );
};

export default MobileNavigation;
