import React, { useContext, useEffect, useState } from "react";
import { ThemeConnectionContext } from "../../../../Theme/ThemeConnection";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import { Flex } from "../../styled.page";
import { Title } from "../../Components/Title";
import { faEraser, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Button/Button";
import { ThemeLogMenuContext } from "../../../../Theme/ThemeLogMenu";
import { Connection } from "../../../../Util/RestApi";

const AddProds = () => {
  /**Data Connection*/
  const connection = new Connection();
  const {logMenu, category, setRefreshFlag} = useContext(ThemeConnectionContext);

  /**Variaveis de estados */
  const {
    // variables
    Cod,
    MenuDescription,
    MenuCod,
    CodRice,
    Dessert,
    typeBase,

    // aqui vem todos os dados.
    dataMenu,

    // states
    setCod,
    setMenuDescruiption,
    setMenuCod,
    setCodRice,
    setDessert,
    dataLog
  } = useContext(ThemeLogMenuContext);

  const post = async () => {
    const payloadOne = {
      epp_log_id: Cod.split('-')[0],
      epp_id_menu: MenuDescription,
      epp_id_product: CodRice,
      plu_menu: MenuCod,
      type_base: "Rice"
    };

    const payloadTwo = {
      epp_log_id: Cod.split('-')[1],
      epp_id_menu: MenuDescription,
      epp_id_product: Dessert,
      plu_menu: MenuCod,
      type_base: "Dessert"
    };

    try {
      const array = new Array(payloadOne, payloadTwo);
      for await (const value of array) {
        connection.post(value, "EPP/LogMenu.php");
      };
      alert("Enviado");
      setRefreshFlag(prev => !prev);
      clear();
    } catch (error) {
      console.log(error);
    }
  };
  const update = async () => {
    const payloadOne = {
      epp_log_id: Cod.split('-')[0],
      epp_id_menu: MenuDescription,
      epp_id_product: CodRice,
      plu_menu: MenuCod,
    };

    const payloadTwo = {
      epp_log_id: Cod.split('-')[1],
      epp_id_menu: MenuDescription,
      epp_id_product: Dessert,
      plu_menu: MenuCod,
    };

    try {
      const array = new Array(payloadOne, payloadTwo);
      for await (const value of array) {
        connection.put(value, "EPP/LogMenu.php");
      };
      alert("Atualizado!");
      setRefreshFlag(prev => !prev);
      clear();
    } catch (error) {
      console.log(error);
    }
  };
  const remove = async () => {
    try {
      const payloadOne = {
        epp_log_id: Cod.split('-')[0],
        epp_id_menu: MenuDescription,
        epp_id_product: CodRice,
        status_log_menu: "0",
        plu_menu: MenuCod,
      };

      const payloadTwo = {
        epp_log_id: Cod.split('-')[1],
        epp_id_menu: MenuDescription,
        epp_id_product: Dessert,
        status_log_menu: "0",
        plu_menu: MenuCod,
      };

      const array = new Array(payloadOne, payloadTwo);
      for await (const value of array) {
        connection.put(value, "EPP/LogMenu.php");
      };
      alert("Produto desativado!");
      setRefreshFlag(prev => !prev);
      clear();

    } catch (error) {
      console.log(error);
    }
  };

  function clear() {
    try {
      setCod('');
      setMenuDescruiption('');
      setMenuCod('');
      setCodRice('');
      setDessert('');
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
