import React, { useContext, useState } from 'react';
import { SearchInput, SortIndicator, Table, TableCell, TableHeader, TableRow, TableWrapper } from './styled';
import { ThemeRegisterContexts } from '../../../../Theme/ThemeRegisterProd';

const SmartTable = ({ data, dataHead }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = column => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const {
    codigo,
    setCodigo,
    setDescricao,
    setEmbalagem,
    setCategoria,
    setStatus,

    setRefrashList,
  } = useContext(ThemeRegisterContexts);

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      console.log(sortColumn);
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue && bValue) {
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      {/*<SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      /> */}

      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              {dataHead.map((column, index) => {
                {console.log(column)}
                return (
                  <TableHeader key={index} onClick={() => handleSort(column.key)}>
                    {column.title}
                    {sortColumn === column.key && (
                      <SortIndicator>{sortDirection === 'asc' ? '▲' : '▼'}</SortIndicator>
                    )}
                  </TableHeader>
                )
              })}
            </TableRow>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <TableRow key={index} 
                onClick={() => {
                  // handleRowClick(rowIndex);
                  // setProductId(row.id_product);
                  // setCodigo(row.id_product);
                  // setCategoria(row.id_category);
                  // setEmbalagem(row.measure);
                  // setStatus(row.status_prod);
                  // setRefrashList(prev => !prev);
                }}
              >
                {Object.values(row).map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
};

export default SmartTable;
