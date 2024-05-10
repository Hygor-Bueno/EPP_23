import React, { useContext } from "react";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { ThemeRegisterContexts } from "../../../../../Theme/ThemeRegisterProd";

const ConsincoTable = ({headers, listSales}) => {

  const {setDescricao, formatToPtBr} = useContext(ThemeRegisterContexts);

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeaderCell $txtColor key={index}>{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        {listSales.length > 0 && [...listSales].map((item, index) => {
          setDescricao(item.DESCCOMPLETA);
          return (
            <TableRow key={`table_${index}`}>
              <TableCell>{item.EMPRESA}</TableCell>
              <TableCell>{item.DESCCOMPLETA}</TableCell>
              <TableCell>{formatToPtBr(item.PRECO)}</TableCell>
            </TableRow>
          )
        })}
      </Table>
    </React.Fragment>
  )
}

export default ConsincoTable;
