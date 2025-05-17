import { mockMoviesResponse } from "@/test/mocks/movies";
import { getAverageRating, getRatingPercentage, getSortedMovies } from ".";

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
      mockMoviesResponse.results
    );
    expect(sortedMovies[0].episode_id).toBe(1);
    expect(sortedMovies[1].episode_id).toBe(2);
    expect(sortedMovies[2].episode_id).toBe(3);
    expect(sortedMovies[3].episode_id).toBe(4);
    expect(sortedMovies[4].episode_id).toBe(5);
    expect(sortedMovies[5].episode_id).toBe(6);
    expect(sortedMovies[6].episode_id).toBe(7);
  });

  it("should sort movies by episode ID in descending order", () => {
    const sortedMovies = getSortedMovies(
      "episode-desc",
      mockMoviesResponse.results
    );
    expect(sortedMovies[0].episode_id).toBe(7);
    expect(sortedMovies[1].episode_id).toBe(6);
    expect(sortedMovies[2].episode_id).toBe(5);
    expect(sortedMovies[3].episode_id).toBe(4);
    expect(sortedMovies[4].episode_id).toBe(3);
    expect(sortedMovies[5].episode_id).toBe(2);
    expect(sortedMovies[6].episode_id).toBe(1);
  });

  it("should sort movies by release date in ascending order", () => {
    const sortedMovies = getSortedMovies(
      "year-asc",
      mockMoviesResponse.results
    );
    expect(sortedMovies[0].release_date).toBe("1977-05-25");
    expect(sortedMovies[1].release_date).toBe("1980-05-17");
    expect(sortedMovies[2].release_date).toBe("1983-05-25");
  });

  it("should return the original array if no valid sort option is provided", () => {
    const sortedMovies = getSortedMovies(
      "invalid-sort-option",
      mockMoviesResponse.results
    );
    expect(sortedMovies).toEqual(mockMoviesResponse.results);
  });
});
