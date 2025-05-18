export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};
export type MovieResponse = {
  count: number;
  next: number | null;
  previous: number | null;
  results: Movie[];
};

type Rating = {
  Source: string;
  Value: string;
};

export type MovieImdbDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieInfoWithRating = {
  avgRating: number;
  title: string;
  episodeId: number;
  releaseDate: string;
  openingCrawl: string;
  director: string;
  poster: string;
  ratings: Rating[];
};
