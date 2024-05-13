import React, { useContext } from "react";
import { ContainerTableInformation } from "../../../styled.page";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { ThemeRegisterContexts } from "../../../../Theme/ThemeRegisterProd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

/**
 * Tabela dos produtos. Aonde tenho informações da consico e posso cadastrar produtos que vem da consico.
 * @returns
 */
const TableProd = ({data, focusLine, rowClick}) => {
  const {} = useContext(ThemeRegisterContexts);
  const array = ['Cod', 'Descrição', 'Categoria', 'Embalagem', 'Status'];

  return (
    <React.Fragment>
      <ContainerTableInformation>
        <Table>
          <TableHead>
            <TableRow>
              {array.map(h => (
                <TableHeaderCell>{h}</TableHeaderCell>
              ))}
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
                      console.log(rowIndex, row, row.id_product, row.id_category_fk, row.measure, row.status_prod)
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
