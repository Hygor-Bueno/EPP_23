import React, { useEffect } from "react";
import { FixedSize, Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { formatToPtBr } from "../../../../Util/mockUtil";
import P from 'prop-types';
import { Connection } from "../../../../Util/RestApi";

/**
 * Esse componente é a tabela da Consinco aonde vejo as informações de cada loja com seus produtos e determinados preços.
 * @returns
 */
const ConsincoTable = (props) => {
  const [listSales, setListSales] = React.useState('');

  const connection = new Connection();

  const getListConsincoTable = async () => {
    try {
      const req = await connection.get(`&id_shop=${localStorage.num_store || 0}&id_product=${props.idProd || 0}&fullStore=1`, 'EPP/Product.php');
      setListSales(req);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {getListConsincoTable()}, [props.refrashList || false]);

  return (
    <React.Fragment>
      <FixedSize>
        <Table >
          <TableHead>
            <TableRow>
              <TableHeaderCell>Loja</TableHeaderCell>
              <TableHeaderCell>Produto</TableHeaderCell>
              <TableHeaderCell>Preço</TableHeaderCell>
            </TableRow>
          </TableHead>
          {listSales.length > 0 && [...listSales].map((item, index) => {
            props.setDescription && props.setDescription(item.DESCCOMPLETA);
            return (
              <TableRow key={`table_${index}`}>
                <TableCell>{item.EMPRESA}</TableCell>
                <TableCell>{item.DESCCOMPLETA}</TableCell>
                <TableCell>{formatToPtBr(item.PRECO)}</TableCell>
              </TableRow>
            )
          })}
        </Table>
      </FixedSize>
    </React.Fragment>
  )
}

ConsincoTable.propTypes ={
  setDescription: P.func.isRequired,
  idProd: P.string.isRequired,
  refrashList: P.func.isRequired,
}

export default ConsincoTable;
