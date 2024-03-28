import React, { useState, useEffect, useContext, useRef } from 'react';
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from './styled';
import { Connection } from '../../../../Util/RestApi';
import { ThemeRegisterContexts } from '../../../../Theme/ThemeRegisterProd';

const ResponsiveTable = ({ data, headers, isConsinco, refrashTable }) => {
  const [focusedRow, setFocusedRow] = useState(null);
  const [listSales, setListSales] = useState([]);
  const [productId, setProductId] = useState(null || '63167');
  
  const connection = new Connection();

  const {
    codigo,
    setCodigo,
    setDescricao,
    setEmbalagem,
    setCategoria,
    setStatus,

    setRefrashList,
  } = useContext(ThemeRegisterContexts);

  useEffect(() => {
    const fetchSales = async () => {
      if (codigo) {
        try {
          const reqListSale = await connection.get(`&id_shop=${localStorage.num_store || 0}&id_product=${codigo}&fullStore=1`, 'EPP/Product.php');
          console.log(productId);
          setListSales(reqListSale);
        } catch (error) {
          console.error('Erro ao buscar vendas:', error);
        }
      }
    };
    fetchSales();
  }, [refrashTable]);

  const tableRef = useRef(null);

  const handleRowClick = (index) => {
    setFocusedRow(index);
  };

  return (
    <Table ref={tableRef}>
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
          data.map((row, rowIndex) => (
            <TableRow
              key={`table_${rowIndex}`}
              className={focusedRow === rowIndex ? 'focused' : ''}
              onClick={() => {
                handleRowClick(rowIndex);
                setProductId(row.id_product);
                setCodigo(row.id_product);
                setDescricao(row.description);
                setCategoria(row.id_category);
                setEmbalagem(row.measure);
                setStatus(row.status_prod);
                setRefrashList(prev => !prev);
              }}
            >
              {/* {console.log(row)} */}
              <TableCell>{row.id_product}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.measure}</TableCell>
              <TableCell>{row.status_prod == 1 ? 'Ativo' : 'inativo'}</TableCell>
            </TableRow>
          ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;
