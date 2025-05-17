import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "./index";

describe("Header", () => {
  it("renders SortBy and SearchBox", () => {
    render(<Header onSearchInputChange={jest.fn()} onSortChange={jest.fn()} />);
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should show sort by options when soty by dropdpwn is clicked", () => {
    render(<Header onSearchInputChange={jest.fn()} onSortChange={jest.fn()} />);
    screen.getByText("Select an option").click();
    expect(screen.getByText("Episode ascending")).toBeInTheDocument();
    expect(screen.getByText("Episode descending")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
  });

  it("should call onSortChange when SortBy year option is clicked", async () => {
    const onSortChange = jest.fn();
    render(
      <Header onSearchInputChange={jest.fn()} onSortChange={onSortChange} />
    );
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "year-asc");

    expect(onSortChange).toHaveBeenCalledWith("year-asc");
  });

  it("should call onSearchInputChange when SearchBox input changes", async () => {
    const onSearchInputChange = jest.fn();
    render(
      <Header
        onSearchInputChange={onSearchInputChange}
        onSortChange={jest.fn()}
      />
    );
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "star");
    expect(onSearchInputChange).toHaveBeenCalledWith("star");
  });
});
