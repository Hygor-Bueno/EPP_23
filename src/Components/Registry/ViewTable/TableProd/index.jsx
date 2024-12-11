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
import { CSVGenerator } from "../../class/CSV";
import { CircleSpinner } from "../../Components/Loading/Loading";

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
  const { ScreenChildren } = props;


  const { menu, setPage } = useContext(ThemeConnectionContext);

  const [focusLine, setFocusLine] = useState();

  const [dataProd, setDataProd] = useState([]);
  const [idProd, setIdProd] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [statusProd, setStatusProd] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const result = await searchProd(idProd, idCategory, statusProd);
    setDataProd(result || []);
  };

  const handleSearchProd = async (e) => {
    e?.preventDefault();
    fetchData();
  };

  /** Variáveis de estado */
  const {
    setCod,
    setCategory,
    setEmb,
    setStatus,
    setRefrash,
    refrash,

    Cod,
    Category,
    Emb,
    Status,
  } = useContext(ThemeRegisterProdContext);

  const handleRowClick = (index) => {
    setFocusLine(index);
  };

  useEffect(() => {
    fetchData();
  }, [refrash]);

  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-around h-100">
      <form onSubmit={handleSearchProd}>
        <HeaderSearch className="d-flex gap-5">
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
          <Search className="d-flex gap-1">
            <div><Button onAction={handleSearchProd} iconImage={faSearch} /></div>
            <div><Button onAction={() => {
              const csv = new CSVGenerator();
              const fileJson = dataProd.map(item => {
                // console.log(item);
                return ({
                  "Codigo do Produto": item.id_product,
                  "Nome do Produto": item.description,
                  "Embalagem do produto": item.measure,
                  "Categoria do Produto":item.id_category_fk,
                  "Status do Produto": item.status_prod === '1' ? 'Ativo' : 'Inativo',
                })
              });

              csv.generateCSV(fileJson, 'documento');
            }}iconImage={faFileCsv} /></div>
            <div><Button iconImage={faEraser} onAction={() => { setIdProd(''); setIdCategory(''); setStatusProd(''); fetchData(); }} /></div>
            {ScreenChildren}
          </Search>
        </HeaderSearch>
      </form>
      <ContainerTableInformation>
        {loading ? (
          <CircleSpinner>
            <div className='background'>
              <div className='spinner'></div>
            </div>
          </CircleSpinner>
        ) : (
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
                    handleRowClick(rowIndex);
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
        )}
      </ContainerTableInformation>
      </div>
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
