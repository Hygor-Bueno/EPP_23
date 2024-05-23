import React, { useContext } from "react";
import { ContainerTableInformation, Search } from "../../styled.page";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEraser, faFileCsv, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import { ThemeConnectionContext } from "../../../../Theme/ThemeConnection";
import { ThemeRegisterProdContext } from "../../../../Theme/ThemeRegister";
import Button from "../../Components/Button/Button";

/**
 * Tabela dos produtos. Aonde tenho informações da consico e posso cadastrar produtos que vem da consico.
 * @returns
 */
const TableProd = (props) => {
  const array = ['Cod', 'Descrição', 'Categoria', 'Embalagem', 'Status'];
  const {data, focusLine, ScreenChildren } = props;
  const {
    menu,

    // variables
    setPage
  } = useContext(ThemeConnectionContext);

  /**Variaveis de estados */
  const {
    Cod, setCod,
    Description, setDescription,
    Category, setCategory,
    Emb, setEmb,
    Status, setStatus,
    setRefrash,
  } = useContext(ThemeRegisterProdContext);

  // Vamos separar cada contexto por responsavilidade unica.

  return (
    <React.Fragment>
        <div className="d-flex gap-2 pb-2">
          <div className="col-2">
            <Input name="Codigo" />
          </div>
          <div className="col-2">
            <Select children={(
              <>
                {menu.data.map(({id_category, cat_description}, index) => (
                  <option key={`menu_${index}`} value={id_category}>{cat_description}</option>
                ))}
              </>
            )} name="Categoria" />
          </div>
          <div className="col-2">
            <Select children={(
              <>
                <option value='0'>Inativo</option>
                <option value='1'>Ativo</option>
              </>
              )} name="Status" />
          </div>
          <Search className="w-100">
            <Button iconImage={faSearch}/>
            <Button iconImage={faFileCsv}/>
            <Button iconImage={faEdit}/>
            <Button iconImage={faEraser}/>
            {ScreenChildren}
          </Search>
        </div>
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
                      console.log(rowIndex, row)
                      setCod(row.id_product);
                      setEmb(row.measure);
                      setCategory(row.id_category_fk);
                      setStatus(row.status_prod);
                      setRefrash(prev => prev + 1);
                      setPage(1);
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

TableProd.propTypes = {
  data: PropTypes.node.isRequired,
  focusLine: PropTypes.bool,
  rowClick: PropTypes.func,
  ScreenChildren: PropTypes.node,
}

export default TableProd;
