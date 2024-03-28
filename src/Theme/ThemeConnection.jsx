import React, { createContext, useEffect, useState } from "react";
import { Connection } from "../Util/RestApi";

/**
 * Contexto para conexão com o tema.
 * @type {import("react").Context<{
 *   prod: Array,
 *   menu: Array,
 *   category: Array,
 *   logMenu: Array,
 *   listStore: Array
 * }>}
 */
export const ThemeConnectionContext = createContext();

/**
 * Provedor de contexto para conexão com o tema.
 * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos.
 * @returns {React.ReactNode} Componente de provedor de contexto para conexão com o tema.
 */
const ThemeContextConnectionProvider = ({ children }) => {
  const [prod, setProd] = useState([]);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [logMenu, setLogMenu] = useState([]);
  const [listStore, setListStore] = useState([]);

  const [refrashFlag, setRefrashFlag] = useState(false);
  // pesquisa

  const connection = new Connection();

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshFlag = () => {
    setRefrashFlag(pervFlag => !pervFlag);
  }

  const fetchData = async () => {
    try {
      const reqProduct = await connection.get('&registration=1', 'EPP/Product.php');
      const reqMenu = await connection.get('&registration=1', 'EPP/Menu.php');
      const reqCategory = await connection.get('&category=1', 'EPP/Product.php');
      const reqLogMenu = await connection.get(null, 'EPP/LogMenu.php');
      const reqListStore = await connection.get('&company_id=1', 'CCPP/Shop.php');

      setProd(reqProduct);
      setMenu(reqMenu);
      setCategory(reqCategory);
      setLogMenu(reqLogMenu);
      setListStore(reqListStore);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const globalConnectionValue = {
    prod,
    menu,
    category,
    logMenu,
    listStore,

    refrashFlag,
    handleRefreshFlag,
  };

  return (
    <React.Fragment>
      <ThemeConnectionContext.Provider value={globalConnectionValue}>
        {children}
      </ThemeConnectionContext.Provider>
    </React.Fragment>
  );
};

export default ThemeContextConnectionProvider;
