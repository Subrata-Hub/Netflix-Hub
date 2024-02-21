import React from "react";

const LodingSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-col pt-52 w-full h-full pb-10">
        <div className="w-full h-full absolute top-0 left-0 overflow-hidden bg-slate-900 -z-20"></div>
        <div className="flex gap-12 pl-52">
          <div className="w-[25rem] h-[440px] bg-slate-700 ">
            <div className="w-full rounded-2xl"></div>
          </div>
          <div className="w-full">
            <div className="w-[90%] h-8 mb-5 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[50%] h-8 mb-6 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[60%] h-10 mb-5 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[90%] h-20 mb-10 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
          </div>
        </div>
      </div>
      <div className="relative px-20 w-full">
        <div className="flex flex-wrap gap-6">
          {Array(7)
            .fill("")
            .map((e, index) => (
              <div className="flex flex-col" key={index}>
                <div className="w-44 h-44  bg-stone-700 rounded-full"></div>
                <div className="w-36 h-4 mt-2 bg-stone-700 "></div>
                <div className="w-32 h-4 mt-2 bg-stone-700 "></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LodingSkeleton;
