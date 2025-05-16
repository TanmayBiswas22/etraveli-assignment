import React, { useState } from "react";
import Header from "../header";
import MovieList from "../movie-list";
import MovieDescription from "../movie-description";
import { useGetFilms } from "../../hooks/useGetFilms";
import type { Movie } from "../../types";

const Home = () => {
  const { data, isLoading, error } = useGetFilms();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (episodeId: number) => {
    const movie = data?.results.find((movie) => movie.episode_id === episodeId);
    if (movie) {
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }
  };

  const movieListData =
    data?.results.map((movie) => ({
      title: movie.title,
      episode_id: movie.episode_id,
      release_date: movie.release_date,
    })) ?? [];
  return (
    <div>
      <Header />
      <div style={{ display: "flex", width: "100%", minHeight: "80vh" }}>
        <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
          <MovieList movies={movieListData} onClick={handleMovieClick} />
        </div>
        <div style={{ flex: 1 }}>
          <MovieDescription movie={selectedMovie} />
        </div>
      </div>
    </div>
  );
};

export default Home;
