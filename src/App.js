import { useState } from "react";
import MoviesList from "./components/MoviesList/MoviesList";
import Navbar from "./components/NavBar/Navbar";
import WatchedList from "./components/WatchedList/WatchedList";
import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import MovieDetials from "./components/MovieDetails/MovieDetails";
import { useLocalStorageState } from "./useLocalStorageState";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [watchedList, setWatchedList] = useLocalStorageState([], 'watchedList');

  return (
    <div className='app vh-100'>
      <Navbar>
        <Search search={search} setSearch={setSearch} />
        <Results movies={movies} />
      </Navbar>

      <div className="w-100 py-5 height-90  mb-5">
        <div className="row h-100 m-0 justify-content-center gap-4 ">
          <MoviesList movies={movies} setMovies={setMovies} search={search} setSelectedId={setSelectedId} />
          {selectedId ? <MovieDetials selectedId={selectedId} setSelectedId={setSelectedId} setWatchedList={setWatchedList} watchedList={watchedList} /> : <WatchedList watchedList={watchedList} setWatchedList={setWatchedList} />}
        </div>
      </div>
    </div>
  );
}

export default App;
