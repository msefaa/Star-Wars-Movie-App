import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchMovieHandler();
  }, []);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-moive-app-45222-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-moive-app-45222-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  let content = <p>There is no Movie</p>;

  if (error) {
    content = <p>Someting went wrong</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
