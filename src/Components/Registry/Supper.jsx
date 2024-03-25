import React, { useContext, useState } from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";;
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import Button from "./Components/Button/Button";
import { faEraser, faFileCsv, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Container, ContainerBackground, ContainerInput, Flex } from "./styled.page";

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
                <RegisterProd />
            </ContainerBackground>
            <Flex>
                <ContainerInput className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="row justify-content-around">
                            <div className="col-lg-3">
                                <Input
                                    width={'100%'}
                                    name="Cod"
                                    value={Cod}
                                    onChange={(e) => handleChange(e, setCod)}
                                    required={true}
                                />
                            </div>
                            <div className="col-lg-5">
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
                        <div className="col-lg-6  col-md-6">
                            <div className="container">
                                <div className="row justify-content-center p-1">
                                    <div className="col-3"><Button bg='#297073' iconImage={faSearch} color='#fff' onAction={() => console.log('click 1')} /></div>
                                    <div className="col-3"><Button bg='#297073' iconImage={faEraser} color='#fff' onAction={() => console.log('click 2')} /></div>
                                    <div className="col-3"><Button bg='#297073' iconImage={faFileCsv} color='#fff' onAction={() => console.log('click 3')} /></div>
                                    <div className="col-3"><Button bg='#297073' iconImage={faPencil} color='#fff' onAction={() => console.log('click 4')} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerInput>
                <Container>
                    {prod ? <ResponsiveTable data={prod} headers={headers} /> : <h2>Não Há dados</h2>}
                </Container>
            </Flex>
        </div>
        </React.Fragment>
    );
}

export default Supper;

