import React, { useContext } from "react";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { ThemeRegisterContexts } from "../../../../Theme/ThemeRegisterProd";
import { formatToPtBr } from "../../../../Util/mockUtil";
import P from 'prop-types';

/**
 * Esse componente é a tabela da Consinco aonde vejo as informações de cada loja com seus produtos e determinados preços.
 * @returns
 */
const ConsincoTable = (props) => {

  const {setDescricao} = useContext(ThemeRegisterContexts);
  const {headers, listSales} = props;

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

ConsincoTable.propTypes = {
  headers: P.node,
  listSales: P.node
}

export default ConsincoTable;
