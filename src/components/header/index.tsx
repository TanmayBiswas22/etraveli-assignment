import SortBy from "./components/sortby";
import { SearchBox } from "./components/search-box";
import { StyledHeader } from "./styled";

type HeaderProps = {
  onSearchInputChange: (input: string) => void;
  onSortChange: (sortOption: string) => void;
};
const Header = ({ onSearchInputChange, onSortChange }: HeaderProps) => {
  const handleSortChange = (sortOption: string) => {
    console.log("Selected sort option:", sortOption);
    onSortChange(sortOption);
  };
  return (
    <StyledHeader>
      <SortBy onSortChange={handleSortChange} />
      <SearchBox onChange={onSearchInputChange} />
    </StyledHeader>
  );
};

export default Header;
