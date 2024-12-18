import styled from 'styled-components';

export const HeaderSearch = styled.div`
  padding-left: 1vw;
`;

export const FixedSize = styled.div`
  height: 200px !important;
  width: 100%;
  overflow-y: scroll;
  overflow-x: scroll;

  font-size: var(--textSize) !important;
`;

export const Table = styled.table`
  width: 100%;
  font-size: var(--textSize);

  margin-top: 1rem;

  border-collapse: collapse;
  border-spacing: 0;
  border-radius: var(--border);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);

  text-align: center;

  th {
    font-size: var(--textSizeM);
    color: #297073;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
`;

export const TableHead = styled.thead`
  background-color: #297073;

  th {
    color: #fff;
  }

  tr {
      &:hover,
      &.focused,
      &:focus {
        background-color: inherit;
      }
  }
`;

export const TableRow = styled.tr`
  transition: all ease 0.5s;
  text-align: center;

  &.focused,
  &:focus {
    background-color: #e0e0e09d;
    color: #297073;
    font-weight: bold;
  }
`;

export const TableHeaderCell = styled.th`
  padding: var(--spaceDefault);
  border: var(--borderSize) solid #ddd;
  overflow: auto;
  color: ${({ $txtColor }) => $txtColor ? `#297073` : '#000'};
  text-align: left;
`;

export const TableCell = styled.td`
  cursor: pointer;
  padding: var(--spaceDefault);
  border: var(--borderSize) solid #ddd;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const NavigationSearch = styled.div`
  width: 100%;

  div {
    margin-right: var(--spaceDefault);
  }
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: end;
  gap: var(--spaceDefault);
`;
