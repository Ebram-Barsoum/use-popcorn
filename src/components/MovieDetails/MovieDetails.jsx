import axios from "axios";
import { useEffect, useRef, useState } from "react";
import StarRating from "../StarRating/StarRating";
import { ThreeDots } from "react-loader-spinner";
import { ErrorMessage } from "../MoviesList/MoviesList";
import { useKey } from "../../useKey";

export default function MovieDetials({
  selectedId,
  setSelectedId,
  setWatchedList,
  watchedList,
}) {
  const [loading, setLoading] = useState(false);
  const [errorMesg, setErrorMsg] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [userRating, setUserRating] = useState(null);

  const ratingChanges = useRef(0);

  // data fetching with cleaning up fetching
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setErrorMsg("");
    if (!selectedId) return;
    axios
      .get(`https://www.omdbapi.com/?apikey=21088a24&i=${selectedId}`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        //console.log(data);
        setMovieDetails(data);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [selectedId]);

  // changing app title based on the current openning movie [updating phase]
  useEffect(() => {
    if (!movieDetails) return;
    document.title = "Movie | " + movieDetails.Title;

    return () => (document.title = "usePopcorn");
  }, [movieDetails]);

  // handling Go-back with Esc key and handling removing the even on unmounting
  useKey("Escape", () => {
    setSelectedId("");
  });

  useEffect(() => {
    if (userRating) ratingChanges.current += 1;
  }, [userRating]);

  const handleGoBack = () => {
    setSelectedId("");
  };

  const handleAddToWatched = () => {
    const newMovie = {
      id: movieDetails.imdbID,
      poster: movieDetails.Poster,
      title: movieDetails.Title,
      imdbRating: Number(movieDetails.imdbRating),
      userRating,
      time: Number(movieDetails.Runtime.split(" ").at(0)),
      ratingChanges: ratingChanges.current,
    };

    setWatchedList((list) => [...list, newMovie]);
    setUserRating(null);
    setSelectedId("");
  };

  // filter returns array
  const watched = watchedList.filter((movie) => movie.id === selectedId).at(0);

  return (
    <div
      className="h-100 details d-flex flex-column gap-3 pb-4 px-0 rounded-3 list-unstyled col-11  col-md-4 overflow-y-auto position-relative text-white"
      style={{ backgroundColor: "#234" }}
    >
      {loading && (
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
      )}

      {!loading && errorMesg && <ErrorMessage>{errorMesg}</ErrorMessage>}
      {movieDetails && !loading && !errorMesg && (
        <>
          <span
            className="arrow-icon cursor-pointer rounded-circle position bg-white"
            onClick={handleGoBack}
          >
            <i className="fa-solid fa-arrow-left-long text-black-50"></i>
          </span>

          <div
            className="row m-0 p-0 gap-3 align-items-center "
            style={{ backgroundColor: "#345" }}
          >
            <div className="poster h-100 p-0 m-0 col-4">
              <img
                src={movieDetails?.Poster}
                alt={movieDetails?.Title}
                className="w-100 h-100"
              />
            </div>

            <div className="details col-7">
              <h2 className="title" style={{ color: "#CFF4FC" }}>
                {movieDetails?.Title}
              </h2>
              <p>
                {movieDetails?.Released} &bull; {movieDetails?.Runtime}
              </p>
              <div className="gener">{movieDetails?.Genre}</div>
              <div className="rate">
                🌟 {movieDetails?.imdbRating} IMDB rating
              </div>
            </div>
          </div>
          <div
            className="rating m-3 p-3 d-flex flex-wrap justify-content-center rounded-2"
            style={{ backgroundColor: "#345" }}
            height={50}
          >
            {watched ? (
              <p className="mb-0">
                You already rated this movie 🌟{watched.userRating}{" "}
              </p>
            ) : (
              <>
                <StarRating
                  maxRating={10}
                  size={19}
                  onSetRating={setUserRating}
                />

                {userRating && (
                  <button
                    className="add-to-watched mt-2 text-white fw-bold rounded-pill btn btn-info d-block w-75 m-auto"
                    onClick={handleAddToWatched}
                  >
                    + Add to watched
                  </button>
                )}
              </>
            )}
          </div>
          <div className="description px-3">
            <p className=" fst-italic ">{movieDetails?.Plot}</p>
            <div className="actors my-2 fw-bold" style={{ color: "#CFF4FC" }}>
              {movieDetails.Actors}
            </div>
            <div className="director">Directed by {movieDetails?.Director}</div>
          </div>
        </>
      )}
    </div>
  );
}
