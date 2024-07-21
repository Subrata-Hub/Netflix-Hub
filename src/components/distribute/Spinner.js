import React from "react";

const Spinner = ({ show, position, sized }) => {
  return (
    <div
      className={`fixed left-1/2 ${position} transform -translate-x-1/2 ${
        show ? "visible" : "invisible"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-t-4 border-zinc-200 border-solid border-l-4 border-r-4 ${sized}`}
      ></div>
    </div>
  );
};

export default Spinner;
