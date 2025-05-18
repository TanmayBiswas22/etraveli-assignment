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
import { getAverageRating } from "../../utils";
import { StyledAvgRatingContainer } from "../movie-description/styled";
import { StarRating } from "../star-rating";

type MovieListProps = {
  movies: ReadonlyArray<Pick<Movie, "title" | "episode_id" | "release_date">>;
  selectedMovie: Movie | null;
  imdbDetails: any;
  onClick: (episdoeId: number) => void;
};

const MovieList = ({
  movies,
  selectedMovie,
  imdbDetails,
  onClick,
}: MovieListProps) => {
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
          <StyledTableHeaderLeftAlign>Rating</StyledTableHeaderLeftAlign>
          <StyledTableHeaderRightAlign>
            Release Date
          </StyledTableHeaderRightAlign>
        </StyledTableRow>
      </StyledTableHead>
      <tbody>
        {movies.length === 0 && <p>No movies found</p>}
        {movies.map((movie) => {
          const movieDetails = imdbDetails.find((detail: any) =>
            detail?.Title?.includes(movie.title)
          );

          const avgRating = getAverageRating(movieDetails?.Ratings ?? []);
          return (
            <StyledTableRow
              key={movie.episode_id}
              isSelectedMovie={selectedMovie?.episode_id === movie.episode_id}
              onClick={() => onClick(movie.episode_id)}
            >
              <StyledTableCell>{`${movie.episode_id}`}</StyledTableCell>
              <StyledTableCell>{movie.title}</StyledTableCell>
              <StyledTableCell>
                <StarRating percentage={avgRating} />
              </StyledTableCell>
              <StyledTableCellRightAlign>
                {movie.release_date}
              </StyledTableCellRightAlign>
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default MovieList;
