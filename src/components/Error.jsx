import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="h-screen flex justify-center items-center bg-slate-950 text-white">
      <div className="flex-col gap-10">
        <h1 className="text-3xl">Something went wrong</h1>
        <h2 className="text-2xl">{err.status + " : " + err.statusText}</h2>
      </div>
    </div>
  );
};

export default Error;
