import React from "react";
import type { Movie } from "../../types";

type MovieDescriptionPropsType = {
  movie: Movie | null;
};
const MovieDescription = ({ movie }: MovieDescriptionPropsType) => {
  if (!movie) {
    return (
      <div style={{ padding: "1rem" }}>
        Select a movie to see the description
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <p>{movie.opening_crawl}</p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
    </div>
  );
};
export default MovieDescription;
