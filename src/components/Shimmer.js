import React from "react";

const Shimmer = () => {
  return (
    <div className="py-24 px-4">
      <div className="flex flex-wrap gap-3">
        {Array(18)
          .fill("")
          .map((e, index) => (
            <div
              key={index}
              className="w-52 h-80  bg-stone-700 rounded-xl"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
