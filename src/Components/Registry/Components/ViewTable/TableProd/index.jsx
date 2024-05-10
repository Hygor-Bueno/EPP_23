import React, { useContext } from "react";
import { ContainerTableInformation } from "../../../styled.page";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { ThemeRegisterContexts } from "../../../../../Theme/ThemeRegisterProd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const TableProd = ({data, focusLine, rowClick}) => {
  const {
    setCodigo,
    setCategoryFk,
    setEmbalagem,
    setStatus,
    setPage,
    setRefrashList,
  } = useContext(ThemeRegisterContexts);

  return (
    <React.Fragment>
      <ContainerTableInformation>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Cod</TableHeaderCell>
              <TableHeaderCell>Descrição</TableHeaderCell>
              <TableHeaderCell>Categoria</TableHeaderCell>
              <TableHeaderCell>Embalagem</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {!data || !data.error &&
                data.map((row, rowIndex) => {
                return (
                  <TableRow
                    key={`table_${rowIndex}`}
                    className={focusLine === rowIndex ? 'focused' : ''}
                    onClick={() => {
                      rowClick(rowIndex, row);
                      setCodigo(row.id_product);
                      setCategoryFk(row.id_category_fk);
                      setEmbalagem(row.measure);
                      setStatus(row.status_prod);
                      setPage(1);
                      setRefrashList(prev => !prev);
                    }}
                  >
                    <TableCell>{row.id_product}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.measure}</TableCell>
                    <TableCell>{row.status_prod === '1' ? <FontAwesomeIcon color="#00b318" icon={faPowerOff} /> : <FontAwesomeIcon color="#ff0000" icon={faPowerOff} />}</TableCell>
                  </TableRow>
                )
              })}
          </tbody>
        </Table>
      </ContainerTableInformation>
    </React.Fragment>
  )
}

export default TableProd;
