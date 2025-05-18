import React, { useState } from "react";

type SortByProps = {
  onSortChange: (sortBy: string) => void;
};
const SortBy = ({ onSortChange }: SortByProps) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div>
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={sortOption}
        style={{
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        onChange={handleSortChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="episode-asc">Episode ascending</option>
        <option value="episode-desc">Episode descending</option>
        <option value="year-asc">Year</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortBy;
