import { getMovieDetailFromImdb } from "../api";
import { Movie } from "@/types";
import { useQueries } from "@tanstack/react-query";

export const useGetRatings = (movies: Movie[]) => {
  const movieRatings = useQueries({
    queries: movies.map((movie) => ({
      queryKey: ["address", movie.title, movie.release_date],
      queryFn: () =>
        getMovieDetailFromImdb(movie.title, movie.release_date.split("-")[0]),
      enabled: !!movie.title && !!movie.release_date,
    })),
  });

  const imdbDetails = movieRatings.map((query) => query.data);
  const isLoading = movieRatings.some((query) => query.isLoading);
  const isError = movieRatings.some((query) => query.isError);

  return { imdbDetails, isLoading, isError, movieRatings };
};
