import React from "react";

const LodingSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-col pt-52 w-full h-full pb-10">
        <div className="w-full h-full absolute top-0 left-0 overflow-hidden bg-slate-900 -z-20"></div>
        <div className="md:flex gap-6 md:gap-12 pl-10 md:pl-52">
          <div className="w-[260px] md:w-[25rem] h-[370px] md:h-[440px] bg-slate-700 mb-10 md:mb-0 ">
            <div className="w-full rounded-2xl"></div>
          </div>
          <div className="w-full">
            <div className="w-[90%] h-8 mb-5 md:mb-5 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[50%] h-8 mb-6 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[60%] h-10 mb-5 rounded-[1rem]  bg-slate-700"></div>
            <div className="w-[90%] h-20 mb-10 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
            <div className="w-[60%] h-6 mb-3 rounded-[1rem] bg-slate-700"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LodingSkeleton;
