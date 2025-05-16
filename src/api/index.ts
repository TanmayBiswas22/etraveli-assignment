export const getFilms = async () => {
  const response = await fetch("https://swapi.py4e.com/api/films/?format=json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
