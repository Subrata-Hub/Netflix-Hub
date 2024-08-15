import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const GenreFilter = ({
  genres,
  selectedGenre,
  toggleShowOption,
  showOption,
  onchange,
}) => (
  <div className="flex-col w-full py-3 bg-slate-900 rounded-md px-3 border border-gray-600">
    <div
      className="flex justify-between items-center"
      onClick={() => toggleShowOption(0)}
    >
      <h1 className="text-white text-lg font-semibold">Genres</h1>
      {!showOption ? (
        <MdKeyboardArrowRight className="text-2xl text-white" />
      ) : (
        <MdKeyboardArrowDown className="text-2xl text-white" />
      )}
    </div>
    {showOption && (
      <>
        <div className="w-full h-2 border-b border-gray-600"></div>
        <div className="text-white flex flex-wrap py-2">
          {genres?.map((genre) => (
            <button
              className={`px-3.5 py-1 m-1 rounded-2xl border border-gray-400 ${
                selectedGenre.includes(genre.id.toString())
                  ? "bg-violet-700"
                  : "bg-slate-800"
              }`}
              key={genre.id}
              value={genre.id}
              onClick={(e) => onchange(e, "genre")}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

export default GenreFilter;
