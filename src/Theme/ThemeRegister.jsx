import React, { createContext, useEffect, useState } from "react";

export const ThemeRegisterProdContext = createContext();

const ThemeRegisterProvider = ({ children }) => {

  const [Cod, setCod] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState('');
  const [Emb, setEmb] = useState('');
  const [Status, setStatus] = useState('');

  // refrash
  const [refrash, setRefrash] = useState(0);

  /** Variaveis de controle do componente de janela do arquivo RegisterProd.jsx **/
  const globalRegisterProdValue = {
    Cod, setCod,
    Description, setDescription,
    Category, setCategory,
    Emb, setEmb,
    Status, setStatus,
    refrash, setRefrash,
  };

  return (
    <React.Fragment>
        <ThemeRegisterProdContext.Provider value={globalRegisterProdValue}>
          {children}
        </ThemeRegisterProdContext.Provider>
    </React.Fragment>
  );
};

export default ThemeRegisterProvider;
