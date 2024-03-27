import React, { useContext, useState } from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";;
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import Button from "./Components/Button/Button";
import { faArrowLeft, faArrowRight, faEraser, faFileCsv, faPencil, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ContainerBackground, ContainerInput, ContainerTableInformation, Flex, GroupButton, NavigationBox } from "./styled.page";

const Supper = () => {
   const {prod, category} = useContext(ThemeConnectionContext);

   const [Cod, setCod] = useState("");
   const [Category, setCategory] = useState("")

   const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const headers = ['Cod', 'Produto', 'Categoria', 'Unidade'];
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
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faPlus} color='#fff' onAction={() => console.log('click 1')} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faPencil} color='#fff' onAction={() => console.log('click 2')} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faTrash} color='#fff' onAction={() => console.log('click 3')} /></div>
                        <div className="col-sm-2 col-md-3"><Button isFormRegister={true} bg='#297073' iconImage={faEraser} color='#fff' onAction={() => console.log('click 3')} /></div>
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
                                        value={Cod}
                                        onChange={(e) => handleChange(e, setCod)}
                                        required={true}
                                    />                                    
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <Select
                                        name="Status"
                                        value={Category}
                                        onChange={(e) => handleChange(e, setCategory)}
                                        options={category.data}
                                        required={true}
                                    />
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <Select
                                        name="Tabela"
                                        value={Category}
                                        onChange={(e) => handleChange(e, setCategory)}
                                        options={['Produto', 'Menu']}
                                        required={true}
                                    />
                                </div>
                                <div className="col-lg-3 col-sm-3">
                                    <Select
                                        name="Categoria"
                                        value={Category}
                                        onChange={(e) => handleChange(e, setCategory)}
                                        options={category.data}
                                        required={true}
                                    />
                                </div>
                                </div>
                            </div>
                            <NavigationBox>
                                <div className="container">
                                    <div className="row justify-content-center p-1">
                                        <div className="col-3"><Button bg='#297073' iconImage={faSearch} color='#fff' onAction={() => console.log('click 1')} /></div>
                                        <div className="col-3"><Button bg='#297073' iconImage={faEraser} color='#fff' onAction={() => console.log('click 2')} /></div>
                                        <div className="col-3"><Button bg='#297073' iconImage={faFileCsv} color='#fff' onAction={() => console.log('click 3')} /></div>
                                        <div className="col-3"><Button bg='#297073' iconImage={faPencil} color='#fff' onAction={() => console.log('click 4')} /></div>
                                    </div>
                                </div>
                            </NavigationBox>
                        </div>
                    </ContainerInput>
                    <ContainerTableInformation>
                        {prod ? <ResponsiveTable data={prod} headers={headers} /> : <h2>Não Há dados</h2>}
                    </ContainerTableInformation>
                </Flex>
            </div>
        </React.Fragment>
    );
}

export default Supper;

