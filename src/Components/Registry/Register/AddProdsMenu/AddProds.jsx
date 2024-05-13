import React, { useContext, useEffect, useState } from "react";
import { Card } from "../RegisterProd/styled";
import Input from "../../Components/Input/Input";
import styled from "styled-components";
import { Title } from "../../Components/Title/index";
import { ThemeRegisterContexts } from "../../../../Theme/ThemeRegisterProd";
import Select from "../../Components/Select/Select";
import { ThemeConnectionContext } from "../../../../Theme/ThemeConnection";

const AddProds = () => {
  const {

    // codProdMenu,
    TypeCategory,
    dessert,
    CodAddProd,
    setCodeAddProd,
    rice,

    // function
    setTypeCategory,
    setDessert,
    setRice,
    setMenu,
    menu,
    setClear,
  } = useContext(ThemeRegisterContexts);

  const { category } = useContext(ThemeConnectionContext);

  const [updateLogMenu, setUpdateLogMenu] = useState({
    rice: {
      codLog: CodAddProd || "",
      typeCategory: TypeCategory || "",
      codMenu: menu || "",
      codRice: rice || "",
      update: false,
    },
    dessert: {
      codLog: CodAddProd || "",
      typeCategory: TypeCategory || "",
      codMenu: menu || "",
      codDessert: dessert || "",
      update: false,
    },
  });

  const changeLogMenu = (value, key, input) => {
    let newLogMenu = updateLogMenu;
    newLogMenu[key][input] = value;
    newLogMenu[key]["update"] = true;
    setUpdateLogMenu({ ...newLogMenu });
  };

  useEffect(() => {
    console.log(updateLogMenu);
  }, [updateLogMenu]);

  return (
    <React.Fragment>
      <CardMenu>
        <Title>Adicionar produtos ao menu</Title>
        <Row>
          <StyledInput
            isReq={true}
            isDisabled={true}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codLog");
              setCodeAddProd(e.target.value);
            }}
            name="Cod.Prod"
            placeholder="Código"
            value={CodAddProd}
          />
          <StyledSelect
            isReq={true}
            options={category.data}
            valueKey="idMenu"
            labelKey="description"
            name="Tipo Categoria"
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "typeCategory");
              setTypeCategory(e.target.value);
            }}
            value={TypeCategory}
          />
        </Row>
        <Row>
          <StyledInput
            isReq={true}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codRice");
              setRice(e.target.value);
            }}
            name="Arroz"
            isDisabled={false}
            placeholder="Arroz"
            value={rice}
          />
          <StyledInput
            isReq={true}
            onChange={(e) => {
              changeLogMenu(e.target.value, "dessert", "codDessert");
              setDessert(e.target.value);
            }}
            name="Sobremesa"
            isDisabled={false}
            placeholder="Sobremesa"
            value={dessert}
          />
          <StyledInput
            isReq={true}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codMenu");
              setMenu(e.target.value);
            }}
            name="Menu"
            isDisabled={false}
            value={menu}
          />
          <button
            onClick={() => {
              Object.keys(updateLogMenu).forEach((key) => {
                if (updateLogMenu[key]["update"]) {
                  console.log({
                    epp_categoryFk: updateLogMenu[key]["typeCategory"],
                    epp_rice: updateLogMenu[key]["codRice"],
                    epp_dessert: updateLogMenu[key]["codDessert"],
                    epp_menu: updateLogMenu[key]["codMenu"],
                    epp_log: updateLogMenu[key]["codLog"],
                  })
                }
              });
              setUpdateLogMenu({
                rice: { cod: "", update: false },
                dessert: { cod: "", update: false },
              });
              setClear();
            }}
          >
            kakaka
          </button>
        </Row>
      </CardMenu>
    </React.Fragment>
  );
};

const CardMenu = styled(Card)`
  padding-left: var(--spaceDefaultLL);
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
  gap: 1rem;
`;

const StyledInput = styled(Input)`
  border-radius: var(--borderRadius);
  font-size: 16px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #aaa;
  }
`;

const StyledSelect = styled(Select)``;

export default AddProds;
