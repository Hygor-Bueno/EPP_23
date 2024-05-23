import React, { createContext, useEffect, useState } from "react";

export const ThemeLogMenuContext = createContext();

const ThemeLogMenuProvider = ({ children }) => {

  const [Cod, setCod] = useState('');
  const [MenuDescription, setMenuDescruiption] = useState('');
  const [MenuCod, setMenuCod] = useState('');
  const [CodRice, setCodRice] = useState('');
  const [Dessert, setDessert] = useState('');

  /**Variaveis de Controle do Menu do arquivo AddProds.jsx */
  const globalLogMenuValue = {
    Cod, setCod,
    MenuDescription, setMenuDescruiption,
    MenuCod, setMenuCod,
    CodRice, setCodRice,
    Dessert, setDessert,
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
