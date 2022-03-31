import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const APIurl = 'http://www.omdbapi.com?apikey=9d97560b';

// const movie1 = {

//   "Title": "Spiderman",
//   "Year": "2010",
//   "imdbID": "tt1785572",
//   "Type": "movie",
//   "Poster": "N/A"

// }

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${APIurl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Kayujovu</h1>

      <div className="search">

        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)} />

        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)} />

      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }


    </div>
  );
}

export default App;
