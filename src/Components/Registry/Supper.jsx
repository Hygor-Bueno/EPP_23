import React, { useContext, useState } from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import Button from "./Components/Button/Button";
import { faArrowLeft, faArrowRight, faEraser, faFileCsv, faPencil, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import { ContainerBackground, ContainerInput, ContainerTableInformation, Flex, GroupButton, NavigationBox } from "./styled.page";
import { ThemeRegisterContexts } from "../../Theme/ThemeRegisterProd";
import { Connection } from "../../Util/RestApi";
import { CSVGenerator } from "./Components/class/CSV.js";

const Supper = () => {
    const {prod, category} = useContext(ThemeConnectionContext);
    const [searchData, setSearchData] = useState('');
    const [categoryData, setCategoryData] = useState("");
    const [status, setStatus] = useState('');

    const {
        setPostRegisterProd,
        setUpdateRegisterProd,
        setDeleteRegisterProd,
        setClear,
    } = useContext(ThemeRegisterContexts);

    console.log('prod', prod.data);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const [filteredData, setFilteredData] = useState(prod.data);

    const handleSearch = () => {
        if (!prod || !prod.data) {
            return;
        }
    
        let filteredData = prod.data;
    
        const filters = [
            { key: 'id_product', value: searchData },
            { key: 'id_category', value: categoryData },
            { key: 'status_prod', value: status }
        ];
    
        filters.forEach(filter => {
            if (filter.value) {
                filteredData = filteredData.filter(item => item[filter.key] === filter.value);
            }
        });
    
        // Se todos os campos de filtro estiverem vazios, retorne a lista original
        if (searchData === '' && categoryData === '' && status === '') {
            setFilteredData(prod.data);
        } else {
            setFilteredData(filteredData);
        }
    };
    
    const handleChangeSearch = (e) => {
        const inputText = e.target.value;
        const numerosApenas = inputText.replace(/\D/g, ''); 
        setSearchData(numerosApenas);
      };

    const henadleClear = () => {
        setSearchData('');
        setCategoryData('');
        setStatus('');
    }

    const connection = new Connection();
    const headers = ['Cod', 'Produto', 'Categoria', 'Emb', 'Status'];

    return (
        <React.Fragment>
            <div className="d-flex">
                <ContainerBackground>
                    <NavigationBox>
                        <div className="d-flex align-items-center justify-content-center">
                            <Button color={'transparent'} bg='#297073' iconImage={faArrowLeft} onAction={() => console.log('click 1')} />
                        </div>
                        <RegisterProd />
                        <div className="d-flex align-items-center justify-content-center">
                            <Button color={'transparent'} bg='#297073' iconImage={faArrowRight} onAction={() => console.log('click 1')} />
                        </div>
                    </NavigationBox>
                    <GroupButton>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faPlus} color='#fff' onAction={async () => await setPostRegisterProd()} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faPencil} color='#fff' onAction={async () => await setUpdateRegisterProd()} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faTrash} color='#fff' onAction={async () => await setDeleteRegisterProd()} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faEraser} color='#fff' onAction={() => setClear()} /></div>
                    </GroupButton>
                </ContainerBackground>
                <Flex>
                    <ContainerInput className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="row justify-content-around">
                                <div className="col-lg-3 col-sm-3">
                                    <Input
                                        name="Codigo"
                                        type="text"
                                        value={searchData}
                                        onChange={handleChangeSearch}
                                        required={true}
                                    />                                    
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <Select
                                        name="Categoria"
                                        value={categoryData}
                                        onChange={(e) => handleChange(e, setCategoryData)}
                                        options={category.data}
                                        valueKey="id_category"
                                        labelKey="cat_description"
                                        required={true}
                                    />
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <Select
                                        name="Status"
                                        value={status}
                                        onChange={(e) => handleChange(e, setStatus)}
                                        options={[]}
                                        required={true}
                                        includeInactive={true}
                                    />
                                </div>
                                </div>
                            </div>
                            <NavigationBox>
                                <div className="container">
                                    <div className="row justify-content-center p-1">
                                        <div className="col-3"><Button bg='#297073' iconImage={faSearch} color='#fff' onAction={handleSearch} /></div>
                                        <div className="col-3"><Button bg='#297073' iconImage={faEraser} color='#fff' onAction={henadleClear} /></div>
                                        <div className="col-3"><Button bg='#297073' iconImage={faFileCsv} color='#fff' onAction={() => {
                                            const csv = new CSVGenerator();

                                            const fileJson = prod.data.map(item => ({
                                                codigo: item.id_product,
                                                categoria: item.id_category,
                                                produto: item.description,
                                                embalagem: item.measure,
                                                status: item.status_prod, 
                                            }));

                                            csv.generateCSV(fileJson, 'documento');
                                        }} /></div>
                                    </div>
                                </div>
                            </NavigationBox>
                        </div>
                    </ContainerInput>
                    <ContainerTableInformation>
                        <ResponsiveTable data={filteredData} headers={headers} />
                    </ContainerTableInformation>
                </Flex>
            </div>
        </React.Fragment>
    );

}

export default Supper;
