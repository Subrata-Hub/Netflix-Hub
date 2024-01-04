import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "../style.css";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ rating }) => {
  return (
    <div className="circleRating w-12 h-12">
      <CircularProgressbar
        value={rating}
        text={rating}
        maxValue={10}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          textSize: "28px",
        })}
      />
    </div>
  );
};

export default CircularProgress;
