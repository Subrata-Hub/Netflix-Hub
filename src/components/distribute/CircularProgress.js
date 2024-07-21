import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "../../style.css";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ rating, size }) => {
  return (
    <div className={`circleRating ${size}`}>
      <CircularProgressbar
        value={rating}
        text={rating}
        maxValue={10}
        styles={buildStyles({
          pathColor:
            rating < 5
              ? "rgb(157, 8, 8)"
              : rating < 7
              ? "orange"
              : "rgb(25, 154, 13)",
          textSize: "30px",
          textColor: "white",
          trailColor: "rgb(181, 176, 176)",
        })}
      />
    </div>
  );
};

export default CircularProgress;
