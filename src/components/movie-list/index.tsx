import React from "react";
import type { Movie } from "../../types";
import {
  StyledTable,
  StyledTableCell,
  StyledTableCellRightAlign,
  StyledTableHead,
  StyledTableHeaderLeftAlign,
  StyledTableHeaderRightAlign,
  StyledTableRow,
} from "./styled";

type MovieListProps = {
  movies: ReadonlyArray<Pick<Movie, "title" | "episode_id" | "release_date">>;
  selectedMovie: Movie | null;
  onClick: (episdoeId: number) => void;
};

const MovieList = ({ movies, selectedMovie, onClick }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow>
          <StyledTableHeaderLeftAlign>Episode</StyledTableHeaderLeftAlign>
          <StyledTableHeaderLeftAlign>Title</StyledTableHeaderLeftAlign>
          <StyledTableHeaderRightAlign>
            Release Date
          </StyledTableHeaderRightAlign>
        </StyledTableRow>
      </StyledTableHead>
      <tbody>
        {movies.length === 0 && <p>No movies found</p>}
        {movies.map((movie) => (
          <StyledTableRow
            key={movie.episode_id}
            isSelectedMovie={selectedMovie?.episode_id === movie.episode_id}
            onClick={() => onClick(movie.episode_id)}
          >
            <StyledTableCell>{`Episode ${movie.episode_id}`}</StyledTableCell>
            <StyledTableCell>{movie.title}</StyledTableCell>
            <StyledTableCellRightAlign>
              {movie.release_date}
            </StyledTableCellRightAlign>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default MovieList;
