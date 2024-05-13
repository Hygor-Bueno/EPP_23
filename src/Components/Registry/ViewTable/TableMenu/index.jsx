import React, { useContext } from 'react';
import { ContainerTableInformation } from '../../../styled.page';
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from '../styled';
import { faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button';
import { ThemeRegisterContexts } from '../../../../Theme/ThemeRegisterProd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/**
 * Tabela dos Menus.
 * @returns
 */
const TableMenu = ({ data, styleLine, rowStyleFunction }) => {

  const {
    setCodeMenu,
    setStatusMenu,
    setDescriptionMenu,
    useCodeProdMenu,
    setIsDisplayOrder,
    setPage,
    setIdMenu,
  } = useContext(ThemeRegisterContexts);

  return (
    <React.Fragment>
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
                return (
                  <TableRow
                    key={`table_${rowIndex}`}
                    className={styleLine === rowIndex ? 'focused' : ''}
                    onClick={() => {
                      rowStyleFunction(rowIndex, row);
                      setCodeMenu(row.idMenu);
                      setStatusMenu(row.status);
                      setDescriptionMenu(row.description);
                      setPage(2);
                      useCodeProdMenu('');
                    }}
                  >
                    <TableCell>{row.idMenu}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.status === '1' ? <FontAwesomeIcon color="#00b318" icon={faPowerOff} /> : <FontAwesomeIcon color="#ff0000" icon={faPowerOff} />}</TableCell>
                    <TableCell>
                      <Button onAction={() => { setIsDisplayOrder(true); setIdMenu(row.idMenu); }} bg="#297073" animationType={true} isAnimation={true} iconImage={faCog} />
                    </TableCell>
                  </TableRow>
                )
              })}
          </tbody>
        </Table>
      </ContainerTableInformation>
    </React.Fragment>
  )
}

export default TableMenu;
