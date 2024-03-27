import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Table = styled.table`
  width: 100%;
  font-size: var(--textSize);
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: var(--border);
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: all ease 0.5s;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #e0e0e0;
  }
  &.focused,
  &:focus {
    background-color: #297073;
    color: #f9f9f9;
  }
`;

export const TableHeaderCell = styled.th`
  padding: var(--spaceDefault);
  border: var(--borderSize) solid #ddd;
  text-align: left;
`;

export const TableCell = styled.td`
  cursor: pointer;
  padding: var(--spaceDefault);
  border: var(--borderSize) solid #ddd;
`;
