import React, { useContext, useEffect, useState } from "react";
import { ContainerTableInformation, Search } from "../../styled.page";
import { HeaderSearch, Table, TableCell, TableHead, TableHeaderCell, TableRow } from "../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faFileCsv, faPowerOff, faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import { ThemeConnectionContext } from "../../../../Theme/ThemeConnection";
import { ThemeRegisterProdContext } from "../../../../Theme/ThemeRegister";
import Button from "../../Components/Button/Button";
import { Connection } from "../../../../Util/RestApi";

/**
 * Tabela dos produtos. Aonde tenho informações da consico e posso cadastrar produtos que vem da consico.
 * @returns
 */
const connection = new Connection();

const searchProd = async (idProduct, idCategory, statusProd) => {
  try {
    const result = await connection.get(
      `${idProduct ? `&id_product=${idProduct}` : ''}`
      + `${idCategory ? `&id_category_fk=${idCategory}` : ''}`
      + `${statusProd ? `&status_prod=${statusProd}` : (!idProduct && !idCategory && !statusProd) ? '&registration=1' : ''}`,
      'EPP/Product.php'
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const TableProd = (props) => {
  const array = ['Cod', 'Descrição', 'Categoria', 'Embalagem', 'Status'];
  const { focusLine, ScreenChildren } = props;
  const { menu, setPage } = useContext(ThemeConnectionContext);

  const [dataProd, setDataProd] = useState([]);
  const [idProd, setIdProd] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [statusProd, setStatusProd] = useState('');

  const fetchData = async () => {
    const result = await searchProd(idProd, idCategory, statusProd);
    setDataProd(result || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchProd = async (e) => {
    // e.preventDefault();
    fetchData();
  };

  /** Variáveis de estado */
  const {
    Cod, setCod,
    Description, setDescription,
    Category, setCategory,
    Emb, setEmb,
    Status, setStatus,
    setRefrash,
  } = useContext(ThemeRegisterProdContext);

  return (
    <React.Fragment>
      <form onSubmit={handleSearchProd}>
        <HeaderSearch className="d-flex gap-2 pb-2">
          <div className="col-2">
            <Input
              name="Codigo"
              value={idProd}
              onChange={(e) => setIdProd(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearchProd(e); }}
            />
          </div>
          <div className="col-2">
            <Select
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearchProd(e); }}
              name="Categoria"
            >
              {menu.data.map(({ id_category, cat_description }, index) => (
                <option key={`menu_${index}`} value={id_category}>{cat_description}</option>
              ))}
            </Select>
          </div>
          <div className="col-2">
            <Select
              value={statusProd}
              onChange={(e) => setStatusProd(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearchProd(e); }}
              name="Status"
            >
              <option value="">Todos</option>
              <option value='0'>Inativo</option>
              <option value='1'>Ativo</option>
            </Select>
          </div>
          <Search className="w-100">
            <Button onAction={handleSearchProd} iconImage={faSearch} />
            <Button iconImage={faFileCsv} />
            <Button
              iconImage={faEraser}
              onAction={() => { setIdProd(''); setIdCategory(''); setStatusProd(''); fetchData(); }}
            />
            {ScreenChildren}
          </Search>
        </HeaderSearch>
      </form>
      <ContainerTableInformation>
        <Table>
          <TableHead>
            <TableRow>
              {array.map((h, index) => (
                <TableHeaderCell key={index}>{h}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <tbody>
            {dataProd.map((row, rowIndex) => (
              <TableRow
                key={`table_${rowIndex}`}
                className={focusLine === rowIndex ? 'focused' : ''}
                onClick={() => {
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
            ))}
          </tbody>
        </Table>
      </ContainerTableInformation>
    </React.Fragment>
  );
};

TableProd.propTypes = {
  data: PropTypes.node.isRequired,
  focusLine: PropTypes.bool,
  rowClick: PropTypes.func,
  ScreenChildren: PropTypes.node,
};

export default TableProd;
