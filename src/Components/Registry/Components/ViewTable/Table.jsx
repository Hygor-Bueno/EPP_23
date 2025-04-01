import React, { useState, useEffect, useContext} from 'react';
import { ThemeRegisterContexts } from '../../../../Theme/ThemeRegisterProd';
import { ContainerInput} from '../../styled.page';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import Button from '../Button/Button';
import { faEdit, faEraser, faFileCsv, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CSVGenerator } from '../class/CSV.js';
import ConsincoTable from './Consinco/index.jsx';
import TableProd from './TableProd/index.jsx';
// import TableMenu from './TableMenu/index.jsx';
import { GroupButton, NavigationSearch } from './styled.jsx';

const ResponsiveTable = ({ data, headers, isConsinco, isConsicoSecondary, isMenu }) => {
  const { menu, category } = useContext(ThemeConnectionContext);
  const {
    listSales,
    setIsMutipleCheck,
    view,
    setView,
    getSearchFunction,
  } = useContext(ThemeRegisterContexts);

  const [focusedRow, setFocusedRow] = useState();
  const [SearchData, setSearchData] = useState('');
  const [CategoryData, setCategoryData] = useState('');
  const [StatusSearch, setStatusSearch] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const [filterdData, setData] = useState([]);

  useEffect(() => {
    if (SearchData || CategoryData || StatusSearch) {
      fetchSearch();
    }
  }, []);

  const fetchSearch = async () => {
    try {
      await getSearchFunction(SearchData, CategoryData, StatusSearch, setData);
    } catch (error) {
      console.error(error);
    }
  }

  const clearSearch = () => {
    setSearchData('');
    setCategoryData('');
    setStatusSearch('');
    setRefreshData("");
  }

  const selectMenu = () => {
    if (view === 'produto') return <Select valueKey="id_category" labelKey="cat_description" options={menu.data} name="Categoria" onChange={(e) => setCategoryData(e.target.value)} value={CategoryData} />;
    if (view === 'menu') return <Select options={category.data} valueKey="idMenu" labelKey="description" name="Tipo Categoria" onChange={(e) => setCategoryData(e.target.value)} value={CategoryData} />
  }

  const handleRowClick = (index) => {
    setFocusedRow(index);
  };

  const handleSearchData = () => {
    fetchSearch();
  }

  return (
    <React.Fragment>
      {(isMenu || isConsicoSecondary) && (
        <ContainerInput>
          <NavigationSearch>
            <div className='d-flex'>
              <div>
                <Input name="Codigo" onChange={(e) => setSearchData(e.target.value)} value={SearchData} />
              </div>
              <div>
                {selectMenu()}
              </div>
              <div>
                <Select includeInactive={true} options={[]} name="Status" onChange={(e) => setStatusSearch(e.target.value)} value={StatusSearch} />
              </div>
              <div>
                <Select includeView={true} options={[]} name="Exibição" onChange={(e) => setView(e.target.value)} value={view}/>
              </div>
              <GroupButton>
                <div>
                  <Button bg='#297073' iconImage={faSearch} color='#fff' onAction={handleSearchData} />
                </div>
                <div>
                  <Button bg='#297073' iconImage={faEraser} color='#fff' onAction={() => clearSearch()} />
                </div>
                <div>
                  <Button bg='#297073' iconImage={faEdit} color='#fff' onAction={() => setIsMutipleCheck(a => !a)} />
                </div>
                <div>
                  <Button bg='#297073' iconImage={faFileCsv} color='#fff' onAction={() => {
                    const csv = new CSVGenerator();
                    const fileJson = data.map(item => ({
                      "Codigo do produto": item.id_product,
                      "Categoria do produto": item.category,
                      "Nome do produto": item.description,
                      "Embalagem do produto": item.measure,
                      "Status do produto": item.status_prod === '1' ? 'Ativo' : 'Inativo',
                    }));

                    csv.generateCSV(fileJson, 'documento');
                  }} />
                </div>
              </GroupButton>
            </div>
          </NavigationSearch>
        </ContainerInput>
      )}
      {isConsinco && (
        <ConsincoTable headers={headers} listSales={listSales} />
      )}
      {isConsicoSecondary && (
        <TableProd focusLine={focusedRow} rowClick={handleRowClick} data={data} />
      )}

      {isMenu && (
        <TableMenu data={category.data} rowStyleFunction={handleRowClick} styleLine={focusedRow} />
      )}
    </React.Fragment>
  );
}

export default ResponsiveTable;
