import React, { useContext, useEffect } from "react";
import { Title } from "../../Title/index";
import { ThemeRegisterContexts } from "../../../../../Theme/ThemeRegisterProd";
import { ThemeConnectionContext } from "../../../../../Theme/ThemeConnection";
import { CardMenu, StyledInput, Row, StyledSelect } from "./style";

const AddProds = () => {
  const {
    codInputRef,
    arrozInputRef,
    typeBase,
    sobremesaInputRef,
    updateLogMenu, setUpdateLogMenu,

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
  } = useContext(ThemeRegisterContexts);

  const { category } = useContext(ThemeConnectionContext);

  const changeLogMenu = (value, key, input) => {
    let newLogMenu = updateLogMenu;
    newLogMenu[key][input] = value;
    newLogMenu[key]["update"] = true;
    newLogMenu[key]["typeBase"] = typeBase;
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
            innerRef={codInputRef}
            isDisabled={false}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codLog");
              changeLogMenu(e.target.value, "dessert", "codLog");
              setCodeAddProd(e.target.value);
            }}
            name="Cod"
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
              changeLogMenu(e.target.value, "dessert", "typeCategory");
              setTypeCategory(e.target.value);
            }}
            value={TypeCategory}
          />
        </Row>
        <Row>
          <StyledInput
            isReq={true}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codMenu");
              changeLogMenu(e.target.value, "dessert", "codMenu");
              setMenu(e.target.value);
            }}
            name="Menu"
            isDisabled={false}
            value={menu}
          />
          <StyledInput
            isReq={true}
            innerRef={arrozInputRef}
            onChange={(e) => {
              changeLogMenu(e.target.value, "rice", "codRice");
              setRice(e.target.value);
            }}
            name="Arroz"// Arroz
            isDisabled={false}
            placeholder="Arroz"
            value={rice}
          />
          <StyledInput
            isReq={true}
            innerRef={sobremesaInputRef}
            onChange={(e) => {
              changeLogMenu(e.target.value, "dessert", "codDessert");
              setDessert(e.target.value);
            }}
            name="Sobremesa" // Sobremesa
            isDisabled={false}
            placeholder="Sobremesa"
            value={dessert}
          />

        </Row>
      </CardMenu>
    </React.Fragment>
  );
};



export default AddProds;
