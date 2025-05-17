import SortBy from "./components/sortby";
import { SearchBox } from "./components/search-box";
import { StyledHeader } from "./styled";

type HeaderProps = {
  onSearchInputChange: (input: string) => void;
  onSortChange: (sortOption: string) => void;
};
const Header = ({ onSearchInputChange, onSortChange }: HeaderProps) => {
  return (
    <StyledHeader>
      <SortBy onSortChange={onSortChange} />
      <SearchBox onChange={onSearchInputChange} />
    </StyledHeader>
  );
};

export default Header;
