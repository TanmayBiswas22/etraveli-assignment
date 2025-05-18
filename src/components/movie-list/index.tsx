import React from "react";
import type { Movie, MovieInfoWithRating } from "../../types";
import {
  StyledTable,
  StyledTableCell,
  StyledTableCellRightAlign,
  StyledTableHead,
  StyledTableHeaderLeftAlign,
  StyledTableHeaderRightAlign,
  StyledTableRow,
} from "./styled";
import { StarRating } from "../star-rating";

type MovieListProps = {
  selectedMovie: Movie | null;
  moviesInfoWithRating: MovieInfoWithRating[];
  onClick: (episdoeId: number) => void;
};

const MovieList = ({
  selectedMovie,
  moviesInfoWithRating,
  onClick,
}: MovieListProps) => {
  if (moviesInfoWithRating.length === 0) {
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
        {moviesInfoWithRating.map((movie) => {
          const { episodeId, title, avgRating, releaseDate } = movie;
          return (
            <StyledTableRow
              key={movie.episodeId}
              isSelectedMovie={selectedMovie?.episode_id === movie.episodeId}
              onClick={() => onClick(episodeId)}
            >
              <StyledTableCell>{`${episodeId}`}</StyledTableCell>
              <StyledTableCell>{title}</StyledTableCell>
              <StyledTableCell>
                <StarRating percentage={avgRating} />
              </StyledTableCell>
              <StyledTableCellRightAlign>
                {releaseDate}
              </StyledTableCellRightAlign>
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default MovieList;
