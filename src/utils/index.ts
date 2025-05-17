import { Movie } from "@/types";

export const getRatingPercentage = (source: string, value: string) => {
  switch (source) {
    case "Internet Movie Database": {
      return Math.round(parseFloat(value) * 10);
    }

    case "Rotten Tomatoes": {
      return parseInt(value.replace("%", ""), 10);
    }

    case "Metacritic": {
      const [score] = value.split("/");
      return parseInt(score, 10);
    }

    default:
      console.warn(`Unknown rating source: ${source}`);
      return 0;
  }
};

export const getAverageRating = (
  ratings: Array<{ Source: string; Value: string }>
) => {
  const totalRatings = ratings.length;
  if (totalRatings === 0) return 0;

  let totalPercentage = 0;
  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    const ratingPercentage = getRatingPercentage(rating.Source, rating.Value);
    totalPercentage += ratingPercentage;
  }

  return Math.round(totalPercentage / totalRatings);
};

export const getSortedMovies = (sortBy: string, movies: Movie[]) => {
  switch (sortBy) {
    case "episode-asc":
      return [...movies].sort((a, b) => a.episode_id - b.episode_id);
    case "episode-desc":
      return [...movies].sort((a, b) => b.episode_id - a.episode_id);
    case "year-asc":
      return [...movies].sort(
        (a, b) =>
          new Date(a.release_date).getFullYear() -
          new Date(b.release_date).getFullYear()
      );
    default:
      return movies;
  }
};
