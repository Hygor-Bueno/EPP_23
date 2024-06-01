import React, { createContext, useEffect, useState } from "react";
import { Connection } from "../Util/RestApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Box, Loader } from "../Components/Registry/Components/Loading/Loading";

export const ThemeConnectionContext = createContext();

const ThemeContextConnectionProvider = ({ children }) => {
  const [prod, setProd] = useState([]);
  const [menu, setMenu] = useState([]);
  const [logMenu, setLogMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  const [refreshFlag, setRefreshFlag] = useState(false);


  const connection = new Connection();

  const [listCheckAll, setListCheckAll] = useState();

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  const fetchData = async () => {
    try {
      const reqProductData = await connection.get('&registration=1', 'EPP/Product.php');
      const reqMenuData = await connection.get('&category=1', 'EPP/Product.php');
      const reqCategoryData = await connection.get('&registration=1', 'EPP/Menu.php');
      const reqLogMenuData = await connection.get(null, 'EPP/LogMenu.php');

      setProd(reqProductData);
      setMenu(reqMenuData);
      setCategory(reqCategoryData);
      setLogMenu(reqLogMenuData);

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
    refreshFlag,
    logMenu,

    page, setPage,
    setRefreshFlag,

    // isso aqui vai abrir de checks
    listCheckAll, setListCheckAll
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader>
          <Box>
            <FontAwesomeIcon icon={faBoxOpen} color="white" />
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
