import React, { useContext } from 'react';
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from '../styled';
import { faCog, faEdit, faEraser, faFileCsv, faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import P from 'prop-types';
import { ThemeMenuContext } from '../../../../Theme/ThemeMenu';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import { ContainerTableInformation, Search } from '../../styled.page';
import { ThemeLogMenuContext } from '../../../../Theme/ThemeLogMenu';

/**
 * Tabela dos Menus.
 * @returns
 */
const TableMenu = (props) => {
  const { data, styleLine, ScreenChildren, rowStyleFunction } = props;
  const {setPage, category} = useContext(ThemeConnectionContext);
  const {setIdMenu} = useContext(ThemeLogMenuContext);
  console.log(category);

  const {
    Cod, setCod,
    Description, setDescription,
    State, setState,
    openDetails, setOpenDetails,
  } = useContext(ThemeMenuContext);

  return (
    <React.Fragment>
      <>
        <div className="d-flex gap-2 pb-2">
          <div className="col-2">
            <Input name="Codigo" />
          </div>
          <div className="col-2">
            <Select children={(
              <>
                {category.data.map(({description, idMenu, status}, index) => (
                  <option key={`menu_${index}`} value={idMenu}>{description}</option>
                ))}
              </>
            )} name="Tipo do Menu" />
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
                <TableHeaderCell>Cod</TableHeaderCell>
                <TableHeaderCell>Descrição</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {!data.error &&
                data.map((row, rowIndex) => {
                  console.log(row);
                  return (
                    <TableRow
                      key={`table_${rowIndex}`}
                      className={styleLine === rowIndex ? 'focused' : ''}
                      onClick={() => {
                        setCod(row.idMenu);
                        setDescription(row.description);
                        setState(row.status);
                        setPage(2);
                      }}
                    >
                      <TableCell>{row.idMenu}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.status === '1' ? <FontAwesomeIcon color="#00b318" icon={faPowerOff} /> : <FontAwesomeIcon color="#ff0000" icon={faPowerOff} />}</TableCell>
                      <TableCell>
                        <Button onAction={() => {setOpenDetails(true); setIdMenu(row.idMenu);}} bg="#297073" animationType={true} isAnimation={true} iconImage={faCog} />
                      </TableCell>
                    </TableRow>
                  )
                })}
            </tbody>
          </Table>
        </ContainerTableInformation>
      </>
    </React.Fragment>
  )
}

TableMenu.propTypes = {
  data: P.node,
  styleLine: P.node,
  rowStyleFunction: P.node,
  ScreenChildren: P.node,
}

export default TableMenu;
