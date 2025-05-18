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
import { getMoviesInfo, getSortedMovies } from "../../utils/index";
import { useGetImdbDetails } from "../../hooks/useGetRatings";

const Home = () => {
  const { data, isLoading, error } = useGetMovies();

  /*Assuming here that the omdb api cannot accept list of movies. So fetching details for each movie one by one */
  const {
    imdbDetails,
    isLoading: isLoadingImddbDetails,
    isError: isErrorFetchingImdbDetails,
  } = useGetImdbDetails(data?.results ?? []);

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

  if (isLoading || isLoadingImddbDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isErrorFetchingImdbDetails) {
    return <div>Error fetching IMDB details</div>;
  }

  const moviesInfoWithRatings = getMoviesInfo(movieList ?? [], imdbDetails);

  const selectedMovieDetails = moviesInfoWithRatings.find(
    (movie) => movie.episodeId === selectedMovie?.episode_id
  );

  return (
    <>
      <Header
        onSearchInputChange={handleSearch}
        onSortChange={handleSortChange}
      />
      <StyledMoviesContainer>
        <StyledMovieListContainer>
          <MovieList
            selectedMovie={selectedMovie}
            moviesInfoWithRating={moviesInfoWithRatings}
            onClick={handleMovieClick}
          />
        </StyledMovieListContainer>
        <StyledMovieDescriptionContainer>
          {selectedMovieDetails ? (
            <MovieDescription selectedMovieDetails={selectedMovieDetails} />
          ) : (
            <p style={{ padding: "1rem" }}>
              Select a movie to see the description
            </p>
          )}
        </StyledMovieDescriptionContainer>
      </StyledMoviesContainer>
    </>
  );
};

export default Home;
