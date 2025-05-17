import { useEffect, useState } from "react";
import Header from "../header";
import MovieList from "../movie-list";
import MovieDescription from "../movie-description";
import { useGetFilms } from "../../hooks/useGetMovies";
import type { Movie } from "../../types";

const Home = () => {
  const { data, isLoading, error } = useGetFilms();

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

  const handleSortChange = (sortOption: string) => {
    let sortedMovies;
    if (sortOption === "episode-asc") {
      sortedMovies =
        movieList && [...movieList].sort((a, b) => a.episode_id - b.episode_id);
    } else if (sortOption === "episode-desc") {
      sortedMovies =
        movieList && [...movieList].sort((a, b) => b.episode_id - a.episode_id);
    } else if (sortOption === "year-asc") {
      sortedMovies =
        movieList &&
        [...movieList].sort(
          (a, b) =>
            new Date(a.release_date).getFullYear() -
            new Date(b.release_date).getFullYear()
        );
    }
    setMovieList(sortedMovies);
  };

  const movieListData =
    movieList?.map((movie) => ({
      title: movie.title,
      episode_id: movie.episode_id,
      release_date: movie.release_date,
    })) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Header
        onSearchInputChange={handleSearch}
        onSortChange={handleSortChange}
      />
      <div style={{ display: "flex", minHeight: "80vh", width: "100%" }}>
        <div style={{ borderRight: "1px solid #ccc", width: "100%" }}>
          <MovieList
            movies={movieListData}
            selectedMovie={selectedMovie}
            onClick={handleMovieClick}
          />
        </div>
        <div style={{ width: "100%" }}>
          <MovieDescription movie={selectedMovie} />
        </div>
      </div>
    </div>
  );
};

export default Home;
