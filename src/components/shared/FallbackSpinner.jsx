import React from "react";
import Spinner from "./Spinner";

const FallbackSpinner = () => {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-slate-950">
        <Spinner show={true} position={"bottom-80"} sized={"size-16"} />
      </div>
    </>
  );
};

export default FallbackSpinner;
