import React from "react";
import type { Movie } from "../../types";

type MovieListProps = {
  movies: ReadonlyArray<Pick<Movie, "title" | "episode_id" | "release_date">>;
  onClick: (episdoeId: number) => void;
};

const MovieList = ({ movies, onClick }: MovieListProps) => (
  <div style={{ padding: "1rem" }}>
    <table>
      <thead>
        <tr>
          <th>Episode</th>
          <th>Title</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.episode_id} onClick={() => onClick(movie.episode_id)}>
            <td>{`Episode ${movie.episode_id}`}</td>
            <td>{movie.title}</td>
            <td>{movie.release_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MovieList;
