import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #000;
  cursor: pointer;
  position: relative;
`;

export const SortIndicator = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

export const TableCell = styled.td`
  padding: 10px;
`;

export const SearchInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;