import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from './styled';
import { Connection } from '../../../../Util/RestApi';

const ResponsiveTable = ({ data, headers, isConsinco }) => {
  const [focusedRow, setFocusedRow] = useState(null);
  const [listSales, setListSales] = useState([]);
  const [productId, setProductId] = useState(null || '63167');
  
  const connection = new Connection();

  useEffect(() => {
    const fetchSales = async () => {
      if (productId) {
        try {
          const reqListSale = await connection.get(`&id_shop=${localStorage.num_store || 0}&id_product=${productId}&fullStore=1`, 'EPP/Product.php');
          console.log(productId)
          // const reqListSale = await connection.get(`&id_shop=${localStorage.num_store || 0}&id_product=5000&fullStore=1`, 'EPP/Product.php');
          setListSales(reqListSale);
        } catch (error) {
          console.error('Erro ao buscar vendas:', error);
        }
      }
    };
    fetchSales();
  }, [productId]);
  const handleRowClick = (index) => {
    setFocusedRow(index);
    
  };

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
        {isConsinco && (
          listSales.map((item, index) => (
            <TableRow key={`table_${index}`}>
              <TableCell>{item.EMPRESA}</TableCell>
              <TableCell>{item.DESCCOMPLETA}</TableCell>
              <TableCell>{item.PRECO}</TableCell>
            </TableRow>
          ))
        )}
        {!data.error &&
          data.data?.map((row, rowIndex) => (
            <TableRow
              key={`table_${rowIndex}`}
              className={focusedRow === rowIndex ? 'focused' : ''}
              onClick={() => {
                handleRowClick(rowIndex);
                setProductId(row.id_product);
              }}
            >
              <TableCell>{row.id_product}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.measure}</TableCell>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;
