import { useQuery } from "@tanstack/react-query";
import { getFilms } from "../api";
import type { FilmsResponse } from "../types";

export const useGetFilms = () => {
  const { data, isLoading, error } = useQuery<FilmsResponse>({
    queryKey: ["films"],
    queryFn: getFilms,
  });
  return { data, isLoading, error };
};
