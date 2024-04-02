import React from "react";

export default function Results({ movies }) {
  return (
    <div className="result">
      Found{" "}
      <span className="fw-bold">{movies.length ? movies.length : "0"}</span>{" "}
      results
    </div>
  );
}
