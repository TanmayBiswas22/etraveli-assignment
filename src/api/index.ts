export const getMovies = async () => {
  const response = await fetch("https://swapi.py4e.com/api/films/?format=json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const getMovieDetailFromImdb = async (title: string, year: string) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=b9a5e69d&t=${title}&y=${year}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
