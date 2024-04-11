import React from "react";

const Shimmer = ({ className }) => {
  return (
    <div className="md:px-4 px-0">
      <div className="flex flex-wrap md:gap-3 gap-1">
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
