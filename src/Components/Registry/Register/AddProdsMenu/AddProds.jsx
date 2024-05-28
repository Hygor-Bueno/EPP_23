import React, { useContext, useEffect, useState } from "react";
import { ThemeConnectionContext } from "../../../../Theme/ThemeConnection";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import { Flex } from "../../styled.page";
import { Title } from "../../Components/Title";
import { faEraser, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Button/Button";
import { ThemeLogMenuContext } from "../../../../Theme/ThemeLogMenu";

const AddProds = () => {
  /**Data Connection*/
  const {logMenu, category} = useContext(ThemeConnectionContext);

  /**Variaveis de estados */
  const {
    Cod, setCod,
    MenuDescription, setMenuDescruiption,
    MenuCod, setMenuCod,
    CodRice, setCodRice,
    Dessert, setDessert,
    typeBase, dataLog
  } = useContext(ThemeLogMenuContext);

  console.log(dataLog);

  const post = () => {
    try {
      console.log({
        id: dataLog.logId[0],
        description: MenuDescription,
        menu: MenuCod,
        rice: CodRice,
        dessert: Dessert,
        type_base: typeBase,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const update = () => {
    try {
      console.log({
        id: Cod,
        description: MenuDescription,
        menu: MenuCod,
        rice: CodRice,
        dessert: Dessert,
        type_base: typeBase,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const remove = () => {
    try {
      console.log({
        id: Cod
      });
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    try {
      console.log('Limpando produto');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Title>Adicionar produtos ao menu</Title>
        <Flex>
          <div className="col-3"><Input isDisabled={true} value={Cod} onChange={(e) => setCod(e.target.value)} name="Codigo" /></div>
          <div className="col-8"><Select children={(
            <React.Fragment>
              {category.data?.map(({idMenu, description}, index) => {
                return <option key={`index_${index}`} value={idMenu}>{description}</option>
              })}
            </React.Fragment>
          )} value={MenuDescription} onChange={(e) => setMenuDescruiption(e.target.value)} name="Tipo do Menu" /></div>
        </Flex>
        <Flex className="pt-4">
          <div className="col-3"><Input value={MenuCod} onChange={(e) => setMenuCod(e.target.value)} name="N° Menu" /></div>
          <div className="col-3"><Input value={CodRice} onChange={(e) => setCodRice(e.target.value)} name="N° Arroz" /></div>
          <div className="col-3"><Input value={Dessert} onChange={(e) => setDessert(e.target.value)} name="N° Sobremessa" /></div>
        </Flex>
      </div>
      <div className="w-100 d-flex gap-1 pb-3">
        <Button onAction={() => post()} isAnimation={false} iconImage={faPlus} />
        <Button onAction={() => update()} isAnimation={false} iconImage={faPencil} />
        <Button onAction={() => remove()} isAnimation={false} iconImage={faTrash} />
        <Button onAction={() => clear()} isAnimation={false} iconImage={faEraser} />
      </div>
    </React.Fragment>
  );
};

export default AddProds;
