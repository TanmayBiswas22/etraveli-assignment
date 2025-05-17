import React from "react";
import type { Movie } from "../../types";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
} from "./styled";
import { useGetImdbDetails } from "../../hooks/useGetImdbDetails";

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
  // const { data: imdbData, isLoading: isImdbLoading } = useGetImdbDetails(movie);

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow>
          <StyledTableHeader>Episode</StyledTableHeader>
          <StyledTableHeader>Title</StyledTableHeader>
          <StyledTableHeader>Release Date</StyledTableHeader>
        </StyledTableRow>
      </StyledTableHead>
      <tbody>
        {movies.map((movie) => (
          <StyledTableRow
            key={movie.episode_id}
            isSelectedMovie={selectedMovie?.episode_id === movie.episode_id}
            onClick={() => onClick(movie.episode_id)}
          >
            <StyledTableCell>{`Episode ${movie.episode_id}`}</StyledTableCell>
            <StyledTableCell>{movie.title}</StyledTableCell>
            <StyledTableCell>{movie.release_date}</StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default MovieList;
