import { useQuery } from "@tanstack/react-query";
import { getMovieDetailFromImdb } from "../api";
import type { Movie } from "../types";

export const useGetImdbDetails = (movie: Movie) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["imdb", movie.episode_id],
    queryFn: () =>
      getMovieDetailFromImdb(movie.title, movie.release_date.split("-")[0]),
    enabled: !!movie,
  });
  return { data, isLoading, error };
};
