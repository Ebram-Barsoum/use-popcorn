import React, { useEffect, useState } from "react";
import ToggleIcon from "../ToggleIcon/ToggleIcon";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const API_KEY = "21088a24";

export default function MoviesList({
  movies,
  setMovies,
  search,
  setSelectedId,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleList = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const controller = new AbortController();

    if (search.length < 3) {
      setError("");
      setMovies([]);
      return;
    }

    setSelectedId("");
    setLoading(true);
    setError("");

    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        //console.log(data);
        setError("");
        if (data.Search) {
          setMovies(data?.Search);
        } else {
          setError("Movie Not Found");
          setMovies([]);
        }
      })
      .catch((error) => {
        if (error.name !== "CanceledError") setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [search, setLoading, setError, setSelectedId, setMovies]);

  return (
    <ul className="movies-list d-flex flex-column gap-3 px-0 py-2 rounded-3 list-unstyled col-11 col-sm-8 col-md-4 overflow-y-auto position-relative">
      <ToggleIcon isOpen={isOpen} toggleList={toggleList}></ToggleIcon>

      {isOpen && (
        <>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
              <ThreeDots
                visible={true}
                height="60"
                width="60"
                color="#CFF4FC"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            movies?.map((movie) => {
              return (
                <Movie
                  movie={movie}
                  setSelectedId={setSelectedId}
                  key={movie.id}
                />
              );
            })
          )}
        </>
      )}
    </ul>
  );
}

function Movie({ movie, setSelectedId }) {
  const handleSelection = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? "" : id));
  };

  return (
    <li
      className="movie px-2 py-1 d-flex cursor-pointer align-items-center gap-4 text-white pb-2 border-bottom transition-5"
      onClick={() => {
        handleSelection(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={movie.Title} />
      <div className="info">
        <div className="name">{movie.Title}</div>
        <div className="year"> 🗓 {movie.Year}</div>
      </div>
    </li>
  );
}

export function ErrorMessage({ children }) {
  return (
    <p className="h-100 w-100 d-flex justify-content-center align-items-center text-white-50">
      <span>⛔</span> {children}
    </p>
  );
}
