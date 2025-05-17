import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import type { MovieResponse } from "../types";

export const useGetFilms = () => {
  const { data, isLoading, error } = useQuery<MovieResponse>({
    queryKey: ["films"],
    queryFn: getMovies,
  });
  return { data, isLoading, error };
};
