import SortBy from "./components/sortby";
import { SearchBox } from "./components/search-box";
import { StyledHeader } from "./styled";

type HeaderProps = {
  onChange: (input: string) => void;
  onSortChange: (sortOption: string) => void;
};
const Header = ({ onChange, onSortChange }: HeaderProps) => (
  <StyledHeader>
    <SortBy onSortChange={onSortChange} />
    <SearchBox onChange={onChange} />
  </StyledHeader>
);

export default Header;
