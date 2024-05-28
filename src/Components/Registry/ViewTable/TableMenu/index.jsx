import React, { useContext, useEffect, useState } from 'react';
import { HeaderSearch, Table, TableCell, TableHead, TableHeaderCell, TableRow } from '../styled';
import { faCog, faEraser, faFileCsv, faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import P from 'prop-types';
import { ThemeMenuContext } from '../../../../Theme/ThemeMenu';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import { ContainerTableInformation, Search } from '../../styled.page';
import { ThemeLogMenuContext } from '../../../../Theme/ThemeLogMenu';
import { Connection } from '../../../../Util/RestApi';

/**
 * Tabela dos Menus.
 * @returns
 */

const connection = new Connection();

const searchProd = async (idCategory, status) => {
  try {
    const result = await connection.get(`&${idCategory ? `id_menu=${idCategory}` :
                                        ''}&${status ? `status=${status}` : (!idCategory && !status) ? 'registration=1' : ''}`, 'EPP/Menu.php');
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const TableMenu = (props) => {
  const { styleLine, ScreenChildren } = props;
  const { setPage, category } = useContext(ThemeConnectionContext);
  const { setIdMenu } = useContext(ThemeLogMenuContext);

  const [dataMenu, setDataMenu] = useState([]);
  const [idCategory, setIdCategory] = useState('');
  const [status, setStatus] = useState('');

  const fetchData = async () => {
    const result = await searchProd(idCategory, status);
    setDataMenu(result || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    // e.preventDefault();
    fetchData();
  };

  const {
    Cod, setCod,
    Description, setDescription,
    State, setState,
    openDetails, setOpenDetails,
  } = useContext(ThemeMenuContext);

  return (
    <React.Fragment>
      <form onSubmit={handleSearch}>
        <HeaderSearch className="d-flex gap-2 pb-2">
          <div className="col-2">
            <Input
              name="Codigo"
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(e); }}
            />
          </div>
          <div className="col-2">
            <Select
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(e); }}
              name="Tipo do Menu"
            >
              {category.data.map(({ description, idMenu }, index) => (
                <option key={`menu_${index}`} value={idMenu}>{description}</option>
              ))}
            </Select>
          </div>
          <div className="col-2">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(e); }}
              name="Status"
            >
              <option value="">Todos</option>
              <option value="0">Inativo</option>
              <option value="1">Ativo</option>
            </Select>
          </div>
          <Search className="w-100">
            <Button onAction={(e) => handleSearch(e)} iconImage={faSearch} />
            <Button iconImage={faFileCsv} />
            <Button
              iconImage={faEraser}
              onAction={() => { setIdCategory(''); setStatus(''); fetchData(); }}
            />
            {ScreenChildren}
          </Search>
        </HeaderSearch>
      </form>
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
            {dataMenu && dataMenu.map((row, rowIndex) => (
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
                  <Button onAction={() => { setOpenDetails(true); setIdMenu(row.idMenu); }} bg="#297073" animationType={true} isAnimation={true} iconImage={faCog} />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ContainerTableInformation>
    </React.Fragment>
  );
};

TableMenu.propTypes = {
  styleLine: P.node,
  ScreenChildren: P.node,
};

export default TableMenu;
