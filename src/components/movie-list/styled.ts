import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 4px;
`;
export const StyledTableHead = styled.thead`
  background-color: #e0e0e0;
`;

export const StyledTableHeaderLeftAlign = styled.th`
  padding: 4px 8px;
  text-align: left;
  border: none;
`;

export const StyledTableHeaderRightAlign = styled.th`
  padding: 4px 8px;
  text-align: right;
  border: none;
`;

export const StyledTableCell = styled.td`
  padding: 4px 8px;
  border: none;
`;
export const StyledTableCellRightAlign = styled.td`
  padding: 4px 8px;
  border: none;
  text-align: right;
`;

export const StyledTableRow = styled.tr<{ isSelectedMovie?: boolean }>`
  height: 50px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: ${({ isSelectedMovie }) =>
      isSelectedMovie ? "#d0e0f0" : "#f2f2f2"};
  }
  background-color: ${({ isSelectedMovie }) =>
    isSelectedMovie ? "#d0e0f0" : "transparent"};
`;
