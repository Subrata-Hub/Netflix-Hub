import React from "react";
import { IMG_CDN_URL3 } from "../utils/constants";
import { IoIosSearch, IoMdClose } from "react-icons/io";

const SearchSuggestion = ({
  searchBarContainerRef,
  showSuggestion,
  suggestion,
  handleSearchClicked,
  handleSearchSeggestion,
}) => {
  return (
    <div
      className="bg-slate-950 absolute top-20 min-w-[380px] md:min-w-[500px] ml-1.5 lg:ml-56 lg:top-14 z-50"
      ref={searchBarContainerRef}
    >
      {showSuggestion && (
        <div className="bg-slate-950 text-left px-4 text-sm text-white">
          <ul>
            {suggestion?.results?.slice(0, 12).map((s) => (
              <li
                className="py-1 shadow-xs hover:bg-slate-900 cursor-pointer"
                key={s.id}
                onClick={() => handleSearchClicked(s.title || s.name)}
              >
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 ">
                    {s.poster_path || s.profile_path ? (
                      <img
                        className="w-full h-full object-cover object-center rounded-lg"
                        src={`${IMG_CDN_URL3}${
                          s.poster_path || s.profile_path
                        }`}
                        alt="search-img"
                      />
                    ) : (
                      <IoIosSearch className="text-lg mt-3 ml-3" />
                    )}
                  </div>
                  <div>{s.name || s.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSuggestion && suggestion?.results?.length > 0 && (
        <IoMdClose
          className="text-white text-2xl hidden md:absolute top-5 right-5"
          onClick={handleSearchSeggestion}
        />
      )}
    </div>
  );
};

export default SearchSuggestion;
