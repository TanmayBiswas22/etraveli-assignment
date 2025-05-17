type SearchBoxProps = {
  onChange: (input: string) => void;
};

export const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
      style={{
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
      }}
    />
  );
};
