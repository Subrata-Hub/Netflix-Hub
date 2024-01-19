import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-3 mx-16">
      {Array(12)
        .fill("")
        .map((e, index) => (
          <div key={index} className="w-52 h-80 bg-stone-700 rounded-xl"></div>
        ))}
    </div>
  );
};

export default Shimmer;
