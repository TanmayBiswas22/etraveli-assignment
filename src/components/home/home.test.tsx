import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from ".";
import { renderWithClient } from "@/test/test-utils";
import { mockMoviesResponse } from "@/mocks/movies";

describe("Header", () => {
  it("should render SortBy and SearchBox", async () => {
    renderWithClient(<Home />);

    const sortBy = await screen.findByText(/sort by:/i);
    const searchBox = await screen.findByPlaceholderText(/search/i);
    expect(sortBy).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
  });

  it("should render loading initially", async () => {
    renderWithClient(<Home />);

    const loading = await screen.findByText(/loading.../i);
    expect(loading).toBeInTheDocument();
  });

  it("should render default message when no movie is selected", async () => {
    renderWithClient(<Home />);

    const loading = await screen.findByText(
      /Select a movie to see the description/i
    );
    expect(loading).toBeInTheDocument();
  });

  it("should render all movies", async () => {
    renderWithClient(<Home />);

    const movieNames = mockMoviesResponse.results.map((movie) => movie.title);

    for (const name of movieNames) {
      const movie = await screen.findByText(name);
      expect(movie).toBeInTheDocument();
    }
  });

  it("should sort all movies by ascending episode number when sort by epsiode asc option is selected", async () => {
    renderWithClient(<Home />);

    const select = await screen.findByRole("combobox");
    await userEvent.selectOptions(select, "episode-asc");

    const rowgroups = await screen.findAllByRole("rowgroup");
    const tbody = rowgroups.find((rg) => rg.tagName.toLowerCase() === "tbody");

    if (!tbody) throw new Error("No tbody found");

    const rows = within(tbody).getAllByRole("row");

    const sortedMovieEpisodeNumbers = ["1", "2", "3", "4", "5", "6", "7"];

    expect(rows.length).toBe(sortedMovieEpisodeNumbers.length);
    rows.forEach((row, index) => {
      const cells = within(row).getAllByRole("cell");
      expect(cells[0]).toHaveTextContent(
        `Episode ${sortedMovieEpisodeNumbers[index]}`
      );
    });
  });

  it("should show only movies with title that matches the search keyword", async () => {
    const searchKey = "the";
    renderWithClient(<Home />);

    const searchBox = await screen.findByPlaceholderText(/search/i);
    await userEvent.type(searchBox, searchKey);

    const rowgroups = await screen.findAllByRole("rowgroup");
    const tbody = rowgroups.find((rg) => rg.tagName.toLowerCase() === "tbody");

    if (!tbody) throw new Error("No tbody found");

    const rows = within(tbody).getAllByRole("row");

    const matchingMovieNames = mockMoviesResponse.results.filter((movie) =>
      movie.title.toLowerCase().includes(searchKey)
    );

    const nonMatchingMovieNames = mockMoviesResponse.results.filter(
      (movie) => !movie.title.toLowerCase().includes(searchKey)
    );

    expect(rows.length).toBe(matchingMovieNames.length);

    matchingMovieNames.forEach(async (movie) => {
      const movieElement = await screen.findByText(movie.title);
      expect(movieElement).toBeInTheDocument();
    });

    nonMatchingMovieNames.forEach((movie) => {
      const movieElement = screen.queryByText(movie.title);
      expect(movieElement).not.toBeInTheDocument();
    });
  });
});
