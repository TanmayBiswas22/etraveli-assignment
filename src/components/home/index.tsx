import React from "react";
import Header from "../header";
import MovieList from "../movie-list";
import MovieDescription from "../movie-description";
import { useGetFilms } from "../../hooks/useGetFilms";

const Home = () => {
  const { data, isLoading, error } = useGetFilms();
  console.log("data", data);
  return (
    <div>
      <Header />
      <div style={{ display: "flex", width: "100%", minHeight: "80vh" }}>
        <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
          <MovieList movies={data?.results ?? []} />
        </div>
        <div style={{ flex: 1 }}>
          <MovieDescription />
        </div>
      </div>
    </div>
  );
};

export default Home;
