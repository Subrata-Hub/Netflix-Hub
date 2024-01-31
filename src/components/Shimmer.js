import React from "react";

const Shimmer = () => {
  return (
    <div className="bg-black px-4 pt-16">
      <div className="flex flex-wrap gap-3">
        {Array(20)
          .fill("")
          .map((e, index) => (
            <div
              key={index}
              className="w-52 h-80 bg-stone-700 rounded-xl"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
