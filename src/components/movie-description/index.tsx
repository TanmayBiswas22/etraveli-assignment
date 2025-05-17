import { useGetImdbDetails } from "../../hooks/useGetImdbDetails";
import type { Movie } from "../../types";
import { getAverageRating } from "../../utils";
import { Ratings } from "../ratings";
import { StarRating } from "../star-rating";

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
    <div style={{ padding: "0.5rem" }}>
      <div>
        <h2>{`Episode ${movie.episode_id} - ${movie.title}`}</h2>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <img
          style={{ height: "200px", width: "200px" }}
          src={imdbData?.Poster}
        ></img>
        <p>{movie.opening_crawl}</p>
      </div>

      <p>
        <strong>Directed by:</strong> {movie.director}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        Average Rating: <StarRating percentage={avgRating} />
      </div>

      <Ratings ratings={imdbData?.Ratings ?? []} />
    </div>
  );
};
export default MovieDescription;
