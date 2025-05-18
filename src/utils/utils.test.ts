import {
  mockImdbDetails,
  mockMovieInfoWithRatings,
  mockMoviesResponse,
} from "@/test/mocks/movies";
import {
  getAverageRating,
  getMoviesInfo,
  getRatingPercentage,
  getSortedMovies,
} from ".";

describe("getRatingPercentage", () => {
  it("should convert IMDB rating string to percentage (x10, rounded)", () => {
    expect(getRatingPercentage("Internet Movie Database", "7.8")).toBe(78);
    expect(getRatingPercentage("Internet Movie Database", "8.2")).toBe(82);
    expect(getRatingPercentage("Internet Movie Database", "7.25")).toBe(73);
    expect(getRatingPercentage("Internet Movie Database", "0")).toBe(0);
  });

  it("should convert Rotten Tomatoes rating string to integer percentage", () => {
    expect(getRatingPercentage("Rotten Tomatoes", "95%")).toBe(95);
    expect(getRatingPercentage("Rotten Tomatoes", "100%")).toBe(100);
    expect(getRatingPercentage("Rotten Tomatoes", "0%")).toBe(0);
    expect(getRatingPercentage("Rotten Tomatoes", "85%")).toBe(85);
  });

  it("should convert Metacritic rating string to integer percentage", () => {
    expect(getRatingPercentage("Metacritic", "80/100")).toBe(80);
    expect(getRatingPercentage("Metacritic", "60/100")).toBe(60);
    expect(getRatingPercentage("Metacritic", "0/100")).toBe(0);
    expect(getRatingPercentage("Metacritic", "99/100")).toBe(99);
  });

  it("should return 0 and warn for unknown sources", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    expect(getRatingPercentage("Unknown Source", "50")).toBe(0);
    expect(warnSpy).toHaveBeenCalledWith(
      "Unknown rating source: Unknown Source"
    );
    warnSpy.mockRestore();
  });

  it("should handle malformed or invalid values gracefully", () => {
    expect(getRatingPercentage("Internet Movie Database", "")).toBeNaN();
    expect(getRatingPercentage("Rotten Tomatoes", "")).toBeNaN();
    expect(getRatingPercentage("Metacritic", "")).toBeNaN();
    expect(getRatingPercentage("Metacritic", "abc/100")).toBeNaN();
    expect(getRatingPercentage("Internet Movie Database", "abc")).toBeNaN();
    expect(getRatingPercentage("Rotten Tomatoes", "abc%")).toBeNaN();
  });
});

describe("getAverageRating", () => {
  it("should return 0 for empty ratings array", () => {
    expect(getAverageRating([])).toBe(0);
  });

  it("should calculate the average rating correctly", () => {
    const ratings = [
      { Source: "Internet Movie Database", Value: "7.8" },
      { Source: "Rotten Tomatoes", Value: "95%" },
      { Source: "Metacritic", Value: "80/100" },
    ];
    expect(getAverageRating(ratings)).toBe(84);
  });

  it("should handle different sources and values correctly", () => {
    const ratings = [
      { Source: "Internet Movie Database", Value: "8.5" },
      { Source: "Rotten Tomatoes", Value: "100%" },
      { Source: "Metacritic", Value: "90/100" },
    ];
    expect(getAverageRating(ratings)).toBe(92);
  });
});

describe("getSortedMovies", () => {
  it("should sort movies by episode ID in ascending order", () => {
    const sortedMovies = getSortedMovies(
      "episode-asc",
      mockMovieInfoWithRatings
    );
    expect(sortedMovies[0].episodeId).toBe(1);
    expect(sortedMovies[1].episodeId).toBe(2);
    expect(sortedMovies[2].episodeId).toBe(3);
    expect(sortedMovies[3].episodeId).toBe(4);
    expect(sortedMovies[4].episodeId).toBe(5);
    expect(sortedMovies[5].episodeId).toBe(6);
    expect(sortedMovies[6].episodeId).toBe(7);
  });

  it("should sort movies by episode ID in descending order", () => {
    const sortedMovies = getSortedMovies(
      "episode-desc",
      mockMovieInfoWithRatings
    );
    expect(sortedMovies[0].episodeId).toBe(7);
    expect(sortedMovies[1].episodeId).toBe(6);
    expect(sortedMovies[2].episodeId).toBe(5);
    expect(sortedMovies[3].episodeId).toBe(4);
    expect(sortedMovies[4].episodeId).toBe(3);
    expect(sortedMovies[5].episodeId).toBe(2);
    expect(sortedMovies[6].episodeId).toBe(1);
  });

  it("should sort movies by release date in ascending order", () => {
    const sortedMovies = getSortedMovies("year-asc", mockMovieInfoWithRatings);
    expect(sortedMovies[0].releaseDate).toBe("1977-05-25");
    expect(sortedMovies[1].releaseDate).toBe("1980-05-17");
    expect(sortedMovies[2].releaseDate).toBe("1983-05-25");
  });

  it("should sort movies by average rating in descending order", () => {
    const sortedMovies = getSortedMovies("rating", mockMovieInfoWithRatings);
    expect(sortedMovies[0].avgRating).toBe(90);
    expect(sortedMovies[1].avgRating).toBe(88);
    expect(sortedMovies[2].avgRating).toBe(84);
    expect(sortedMovies[3].avgRating).toBe(75);
    expect(sortedMovies[4].avgRating).toBe(74);
    expect(sortedMovies[5].avgRating).toBe(60);
    expect(sortedMovies[6].avgRating).toBe(57);
  });

  it("should return the original array if no valid sort option is provided", () => {
    const sortedMovies = getSortedMovies(
      "invalid-sort-option",
      mockMovieInfoWithRatings
    );
    expect(sortedMovies).toEqual(mockMovieInfoWithRatings);
  });
});

describe("getMoviesInfo", () => {
  it("should return an array of movies with imdb details", () => {
    const movie = [mockMoviesResponse.results[0]];
    const result = getMoviesInfo(movie, mockImdbDetails);
    expect(result).toEqual([
      {
        episodeId: 4,
        title: "A New Hope",
        avgRating: 90,
        director: "George Lucas",
        releaseDate: "1977-05-25",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg",
        openingCrawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        ratings: [
          {
            Source: "Internet Movie Database",
            Value: "8.6/10",
          },
          {
            Source: "Rotten Tomatoes",
            Value: "94%",
          },
          {
            Source: "Metacritic",
            Value: "90/100",
          },
        ],
      },
    ]);
  });
});
