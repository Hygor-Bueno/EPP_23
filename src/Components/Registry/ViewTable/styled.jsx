import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const HeaderSearch = styled.div`
  padding-left: 1vw;
`;

export const FixedSize = styled.div`
  height: 200px !important;
  width: 565px;
  overflow-y: scroll;
  overflow-x: scroll;
`;

export const Table = styled.table`
  width: 100%;
  font-size: var(--textSize);

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
  animation: ${fadeIn} 0.5s ease-in-out;
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
