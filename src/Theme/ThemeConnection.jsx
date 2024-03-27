import React, { createContext, useEffect, useState } from "react";
import { Connection } from "../Util/RestApi";

export const ThemeConnectionContext = createContext();

const ThemeContextConnectionProvider = ({ children }) => {

  const [prod, setProd] = useState([]);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [logMenu, setlogMenu] = useState([]);
  const [listStore, setListStore] = useState([]);

  const connection = new Connection();

  useEffect(() => {
    const response = async () => {
      let reqProduct = await connection.get('&registration=1', 'EPP/Product.php');
      let reqMenu = await connection.get('&registration=1', 'EPP/Menu.php');
      let reqCategory = await connection.get('&category=1', 'EPP/Product.php');
      let reqLogMenu = await connection.get(null, 'EPP/LogMenu.php');
      let reqListStore = await connection.get('&company_id=1', 'CCPP/Shop.php');

      setProd(reqProduct);
      setMenu(reqMenu);
      setCategory(reqCategory);
      setlogMenu(reqLogMenu);
      setListStore(reqListStore);
    }

    response();
  },[])

  const globalConnectionValue = {
    prod,
    menu,
    category,
    logMenu,
    listStore
  }

  return (
    <React.Fragment>
      <ThemeConnectionContext.Provider value={globalConnectionValue}>
        {children}
      </ThemeConnectionContext.Provider>
    </React.Fragment>
  );
};

export default ThemeContextConnectionProvider;