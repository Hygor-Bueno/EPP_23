import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Table = styled.table`
  width: var(--widthInput);
  font-size: var(--textSize);

  border-collapse: collapse;
  border-spacing: 0;
  border-radius: var(--borderRadius);
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const TableHeaderCell = styled.th`
  padding: var(--spaceDefault);
  border: var(--borderSize) solid #ddd;
  text-align: left;
`;

const TableCell = styled.td`
  padding: var(--textSize);
  
  border: 1px solid #ddd;
`;

const ResponsiveTable = ({ data, headers }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeaderCell key={index}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;
