import React, { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 16,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const settings = {
    color,
    fontSize: `${size}px`,
  };
  return (
    <div
      className=" d-flex gap-1 align-items-center cursor-pointer"
      style={{ color: color, height: "30px" }}
    >
      <div className="stars d-flex gap-1">
        {Array.from({ length: maxRating }).map((_, i) => {
          return (
            <i
              style={settings}
              className={`fa-${
                tempRating
                  ? i + 1 <= tempRating
                    ? "solid"
                    : "regular"
                  : i + 1 <= rating
                  ? "solid"
                  : "regular"
              } fa-star transition-5`}
              onClick={() => {
                setRating(i + 1);
                onSetRating(i + 1);
              }}
              onMouseEnter={() => setTempRating(i + 1)}
              onMouseLeave={() => setTempRating(0)}
              key={i}
            ></i>
          );
        })}
      </div>

      <p className="my-0 ms-1 p-0" style={{ width: "0px" }}>
        {(rating !== 0 || tempRating !== 0) && !messages.length && (
          <span className="p-0 m-0 fw-bold fs-5">{tempRating || rating}</span>
        )}

        {(rating !== 0 || tempRating !== 0) && messages.length
          ? messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : ""
          : ""}
      </p>
    </div>
  );
}
