import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import type { MovieResponse } from "../types";

export const useGetMovies = () => {
  const { data, isLoading, error } = useQuery<MovieResponse>({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  return { data, isLoading, error };
};
