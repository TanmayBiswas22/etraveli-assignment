import { useEffect, useState } from "react";
import Header from "../header";
import MovieList from "../movie-list";
import MovieDescription from "../movie-description";
import { useGetMovies } from "../../hooks/useGetMovies";
import type { Movie } from "../../types";
import {
  StyledMovieDescriptionContainer,
  StyledMovieListContainer,
  StyledMoviesContainer,
} from "./styled";
import { getSortedMovies } from "../../utils/index";
import { useGetRatings } from "../../hooks/useGetRatings";

const Home = () => {
  const { data, isLoading, error } = useGetMovies();

  const {
    imdbDetails,
    isLoading: isLoadingImddbDetails,
    movieRatings,
  } = useGetRatings(data?.results ?? []);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [movieList, setMovieList] = useState<Movie[]>();

  useEffect(() => {
    if (!isLoading) {
      setMovieList(data?.results ?? []);
    }
  }, [isLoading, data]);

  const handleMovieClick = (episodeId: number) => {
    const movie = data?.results.find((movie) => movie.episode_id === episodeId);
    if (movie) {
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSelectedMovie(null);
    const filteredMovies = data?.results.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMovieList(filteredMovies ?? []);
  };

  const handleSortChange = (sortBy: string) => {
    const sortedMovies = getSortedMovies(sortBy, movieList ?? []);
    setMovieList(sortedMovies);
  };

  const movieData =
    movieList?.map((movie) => ({
      title: movie.title,
      episode_id: movie.episode_id,
      release_date: movie.release_date,
    })) ?? [];

  if (isLoading || isLoadingImddbDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header
        onSearchInputChange={handleSearch}
        onSortChange={handleSortChange}
      />
      <StyledMoviesContainer>
        <StyledMovieListContainer>
          <MovieList
            movies={movieData}
            selectedMovie={selectedMovie}
            imdbDetails={imdbDetails}
            onClick={handleMovieClick}
          />
        </StyledMovieListContainer>
        <StyledMovieDescriptionContainer>
          <MovieDescription movie={selectedMovie} />
        </StyledMovieDescriptionContainer>
      </StyledMoviesContainer>
    </>
  );
};

export default Home;
