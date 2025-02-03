import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const SortFilter = ({
  sortbyData,
  selectedSort,
  toggleShowOption,
  showOption,
  onchange,
}) => (
  <div className="flex-col w-full py-3 bg-slate-900 rounded-md px-3 border-b border-gray-600">
    <div
      className="flex justify-between items-center"
      onClick={() => toggleShowOption(1)}
    >
      <h1 className="text-white text-lg font-semibold">Sort</h1>
      {!showOption ? (
        <MdKeyboardArrowRight className="text-2xl text-white" />
      ) : (
        <MdKeyboardArrowDown className="text-2xl text-white" />
      )}
    </div>
    {showOption && (
      <>
        <div className="w-full h-2 border-b border-gray-600"></div>
        <div className="text-white">
          <select
            className="py-2 rounded-lg text-white bg-slate-800 w-full"
            onChange={(e) => onchange(e, "sort")}
            value={selectedSort}
          >
            <option value="" disabled hidden>
              Sort by
            </option>
            {sortbyData?.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>
      </>
    )}
  </div>
);

export default SortFilter;
