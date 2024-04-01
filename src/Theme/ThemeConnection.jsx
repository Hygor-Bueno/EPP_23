import React, { createContext, useEffect, useState } from "react";
import { Connection } from "../Util/RestApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Box, Loader } from "../Components/Registry/Components/Loading/Loading";

export const ThemeConnectionContext = createContext();

const ThemeContextConnectionProvider = ({ children }) => {
  const [prod, setProd] = useState([]);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [logMenu, setLogMenu] = useState([]);
  const [listStore, setListStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refrashFlag, setRefrashFlag] = useState(false);

  const connection = new Connection();

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefreshFlag = () => {
    setRefrashFlag(prevFlag => !prevFlag);
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
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
      {loading ? (
        <Loader>
          <Box> 
            <FontAwesomeIcon icon={faBoxOpen} color="white"/>
          </Box>
        </Loader>
      ) : (
        <ThemeConnectionContext.Provider value={globalConnectionValue}>
          {children}
        </ThemeConnectionContext.Provider>
      )}
    </React.Fragment>
  );
};

export default ThemeContextConnectionProvider;
