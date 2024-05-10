import React, { createContext, useContext, useEffect, useState } from "react";
import { Connection } from "../../Util/RestApi";
import ModalDefault from "../Modal/ModalDefault";
import Loading from "../loading/Loading";


const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [listOrder, setListOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paramsModal, setParamsModal] = useState(
    {
      type: "",
      message: "",
      title: "",
      isConfirmation: false,
      onConfirm: () => null
    }
  );

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const connection = new Connection();
        let reqOrderList = (await connection.get(`&controllerEPP=1&delivered=0`, 'EPP/LogSale.php')) || { error: false, message: '', data: [] };
        if (reqOrderList.error) throw new Error(reqOrderList.message);
        setListOrder(reqOrderList.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrderData();
  }, []);

  const updateListOrder = (newListOrder) => {
    setListOrder(newListOrder);
  };

  async function restartListOrder() {
    setLoading(true);
    try {
      const connection = new Connection();
      let reqOrderList = await connection.get(`&controllerEPP=1&delivered=0`, 'EPP/LogSale.php');
      if (reqOrderList.error) throw new Error(reqOrderList.message);
      setListOrder(reqOrderList.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  return (
    <OrderContext.Provider value={{ listOrder, updateListOrder, restartListOrder, isOpenModal, setIsOpenModal, paramsModal, setParamsModal, setLoading }}>
      <Loading
        isOpen={loading}
      />
      <ModalDefault
        isOpen={isOpenModal}
        {...paramsModal}
        onCancel={setIsOpenModal}
        onClose={setIsOpenModal}
      />
      {children}
    </OrderContext.Provider>
  );
}
