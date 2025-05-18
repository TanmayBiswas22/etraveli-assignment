import type { MovieInfoWithRating } from "../../types";
import { Ratings } from "../ratings";
import { StarRating } from "../star-rating";
import {
  StyledAvgRatingContainer,
  StyledImage,
  StyledMovieDescription,
  StyledMovieDescriptionContainer,
} from "./styled";

type MovieDescriptionPropsType = {
  selectedMovieDetails: MovieInfoWithRating;
};
const MovieDescription = ({
  selectedMovieDetails,
}: MovieDescriptionPropsType) => {
  if (!selectedMovieDetails) {
    return (
      <div style={{ padding: "1rem" }}>
        Select a movie to see the description
      </div>
    );
  }

  const {
    episodeId,
    title,
    director,
    openingCrawl,
    avgRating,
    poster,
    ratings,
  } = selectedMovieDetails;
  return (
    <StyledMovieDescriptionContainer>
      <h3>{`Episode ${episodeId} - ${title}`}</h3>

      <StyledMovieDescription>
        <StyledImage src={poster}></StyledImage>
        <p>{openingCrawl}</p>
      </StyledMovieDescription>

      <p>
        <strong>Directed by:</strong> {director}
      </p>
      <StyledAvgRatingContainer>
        Average Rating: <StarRating percentage={avgRating} />
      </StyledAvgRatingContainer>

      <Ratings ratings={ratings ?? []} />
    </StyledMovieDescriptionContainer>
  );
};
export default MovieDescription;
