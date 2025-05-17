import { useGetImdbDetails } from "../../hooks/useGetImdbDetails";
import type { Movie } from "../../types";
import { getAverageRating } from "../../utils";
import { Ratings } from "../ratings";
import { StarRating } from "../star-rating";
import {
  StyledAvgRatingContainer,
  StyledImage,
  StyledMovieDescription,
  StyledMovieDescriptionContainer,
} from "./styled";

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

  const { data: imdbData } = useGetImdbDetails(movie);
  const avgRating = getAverageRating(imdbData?.Ratings ?? []);
  return (
    <StyledMovieDescriptionContainer>
      <h3>{`Episode ${movie.episode_id} - ${movie.title}`}</h3>

      <StyledMovieDescription>
        <StyledImage src={imdbData?.Poster}></StyledImage>
        <p>{movie.opening_crawl}</p>
      </StyledMovieDescription>

      <p>
        <strong>Directed by:</strong> {movie.director}
      </p>
      <StyledAvgRatingContainer>
        Average Rating: <StarRating percentage={avgRating} />
      </StyledAvgRatingContainer>

      <Ratings ratings={imdbData?.Ratings ?? []} />
    </StyledMovieDescriptionContainer>
  );
};
export default MovieDescription;
