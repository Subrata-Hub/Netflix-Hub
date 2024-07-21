import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Select from "react-select";

const LanguageFilter = ({
  languages,
  selectedOption,
  toggleShowOption,
  showOption,
  onchanges,
}) => (
  <div className="flex-col w-full py-3 bg-slate-900 rounded-md px-3 border-b border-gray-600">
    <div
      className="flex justify-between items-center"
      onClick={() => toggleShowOption(2)}
    >
      <h1 className="text-white text-lg font-semibold">Languages</h1>
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
          <Select
            options={languages.slice(1)}
            defaultValue={selectedOption}
            placeholder={"Select languages"}
            getOptionLabel={(option) => option.english_name}
            getOptionValue={(option) => option.iso_639_1}
            onChange={(selectedOption) => onchanges(selectedOption, "language")}
            isSearchable
            isClearable
            noOptionsMessage={() => "No Option Found"}
            styles={{
              menuList: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#0b131c",
                color: "white",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#0b131c",
                ":hover": {
                  backgroundColor: "#2a2d3b",
                },
              }),
            }}
          />
        </div>
      </>
    )}
  </div>
);

export default LanguageFilter;
