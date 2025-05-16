import { useQuery } from "@tanstack/react-query";
import { getFilms } from "../api";
import type { MovieResponse } from "../types";

export const useGetFilms = () => {
  const { data, isLoading, error } = useQuery<MovieResponse>({
    queryKey: ["films"],
    queryFn: getFilms,
  });
  return { data, isLoading, error };
};
