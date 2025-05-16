import React from "react";
import type { Film } from "../../types";

type MovieListProps = {
  movies: ReadonlyArray<Film>;
};

const MovieList = ({ movies }: MovieListProps) => (
  <div style={{ padding: "1rem" }}>
    {movies.map((movie) => (
      <div
        key={movie.episode_id}
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        <h2>{movie.title}</h2>
        <p>Episode: {movie.episode_id}</p>
        <p>Director: {movie.director}</p>
        <p>Release Date: {movie.release_date}</p>
      </div>
    ))}
  </div>
);

export default MovieList;
