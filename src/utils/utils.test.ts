import { getAverageRating, getRatingPercentage } from ".";

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
