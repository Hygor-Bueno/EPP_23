import React, { createContext, useEffect, useState } from "react";

export const ThemeLogMenuContext = createContext();

const ThemeLogMenuProvider = ({ children }) => {

  const [Cod, setCod] = useState('');
  const [MenuDescription, setMenuDescruiption] = useState('');
  const [MenuCod, setMenuCod] = useState('');
  const [CodRice, setCodRice] = useState('');
  const [Dessert, setDessert] = useState('');
  const [typeBase, setTypeBase] = useState('');

  const [dataLog, setDataLog] = useState([]);

  // Codigo da indentificação do Menu
  const [idMenu, setIdMenu] = useState('');

  useEffect(() => {console.log('mudou!')},[dataLog]);

  console.log(MenuCod, CodRice, Dessert, typeBase);

  /**Variaveis de Controle do Menu do arquivo AddProds.jsx */
  const globalLogMenuValue = {
    Cod, setCod,
    MenuDescription, setMenuDescruiption,
    MenuCod, setMenuCod,
    CodRice, setCodRice,
    Dessert, setDessert,
    idMenu, setIdMenu,
    typeBase, setTypeBase,

    // Esse DataLog vai trazer todo o json que foi clicado pondo até mudar!
    dataLog, setDataLog
  };

  return (
    <React.Fragment>
        <ThemeLogMenuContext.Provider value={globalLogMenuValue}>
          {children}
        </ThemeLogMenuContext.Provider>
    </React.Fragment>
  );
};

export default ThemeLogMenuProvider;
