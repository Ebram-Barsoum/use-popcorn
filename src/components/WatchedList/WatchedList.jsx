import React, { useEffect, useState } from "react";
import ToggleIcon from "../ToggleIcon/ToggleIcon";

export default function WatchedList({ watchedList, setWatchedList }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleDeleteMovie = (id) => {
    setWatchedList((list) => [...list.filter((movie) => movie.id !== id)]);
  };

  return (
    <div className="watched-list p-0  d-flex flex-column gap-3 rounded-2 list-unstyled col-11 col-sm-8 col-md-4 overflow-y-auto position-relative ">
      <ToggleIcon isOpen={isOpen} toggleList={toggleList}></ToggleIcon>

      {isOpen && (
        <>
          <WatchedStat watchedList={watchedList} />

          <div className="watched-list">
            {watchedList?.map((movie) => (
              <WatchedMovie
                movie={movie}
                key={movie.id}
                handleDeleteMovie={handleDeleteMovie}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function WatchedStat({ watchedList }) {
  return (
    <div
      className="stat text-white p-3 rounded-3"
      style={{ backgroundColor: "#456" }}
    >
      <h2 className=" text-uppercase fs-5 " style={{ color: "#CFF4FC" }}>
        Movies you watched
      </h2>
      <div className="d-flex justify-content-between ">
        <div className="number">↗ {watchedList.length} movies</div>
        <div className="average-MDB-rating">
          ⭐
          {watchedList.length &&
            (
              watchedList.reduce((total, movie) => {
                return (total += movie.imdbRating);
              }, 0) / watchedList.length
            ).toFixed(1)}
        </div>
        <div className="average-user-rating">
          🌟
          {watchedList.length &&
            (
              watchedList.reduce((total, movie) => {
                return (total += movie.userRating);
              }, 0) / watchedList.length
            ).toFixed(1)}
        </div>
        <div className="average-time">
          🕓
          {watchedList.length &&
            (
              watchedList.reduce((total, movie) => {
                return (total += movie.time);
              }, 0) / watchedList.length
            ).toFixed(1)}{" "}
          min
        </div>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, handleDeleteMovie }) {
  return (
    <div className="d-flex align-items-center gap-3  p-2 border-bottom">
      <div className="poster">
        <img src={movie.poster} alt={movie.title} className="w-100" />
      </div>
      <div className="details text-white">
        <h3 className="fs-6">{movie.title}</h3>

        <div className="ratings d-flex gap-3 ">
          <div className="imdbRating">⭐{movie.imdbRating}</div>
          <div className="userRating">🌟{movie.userRating}</div>
          <div className="time">🕓 {movie.time} min</div>
        </div>
      </div>

      <button
        className="btn text-danger p-0 border-0 ms-auto me-2"
        onClick={() => handleDeleteMovie(movie.id)}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
  );
}
