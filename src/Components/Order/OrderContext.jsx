import React, { createContext, useContext, useEffect, useState } from "react";
import { Connection } from "../../Util/RestApi";


const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const connection = new Connection();
        let reqOrderList =
          (await connection.get(`&controllerEPP=1&delivered=0`, 'EPP/LogSale.php')) ||
          { error: false, message: '', data: [] };

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

  return (
    <OrderContext.Provider value={{ listOrder, updateListOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
