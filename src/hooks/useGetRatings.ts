import { getMovieDetailFromImdb } from "../api";
import { Movie, MovieImdbDetails } from "@/types";
import { useQueries } from "@tanstack/react-query";

/*Assuming here that movie title and release year is unique */
export const useGetImdbDetails = (movies: Movie[]) => {
  const movieRatings = useQueries({
    queries: movies.map((movie) => ({
      queryKey: ["address", movie.title, movie.release_date],
      queryFn: () =>
        getMovieDetailFromImdb(movie.title, movie.release_date.split("-")[0]),
      enabled: !!movie.title && !!movie.release_date,
    })),
  });

  const imdbDetails: MovieImdbDetails[] = movieRatings.map(
    (query) => query.data
  );
  const isLoading = movieRatings.some((query) => query.isLoading);
  const isError = movieRatings.some((query) => query.error);

  return { imdbDetails, isLoading, isError, movieRatings };
};
