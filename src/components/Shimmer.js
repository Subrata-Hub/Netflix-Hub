import React from "react";

const Shimmer = ({ className }) => {
  return (
    <div className="px-4">
      <div className="flex flex-wrap gap-3">
        {Array(18)
          .fill("")
          .map((e, index) => (
            <div key={index} className={className}></div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
