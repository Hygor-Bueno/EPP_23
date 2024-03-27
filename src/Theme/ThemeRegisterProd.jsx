import React, { createContext, useState } from "react";

/**
* Description placeholder
* @date 3/26/2024 - 8:49:39 AM
*
* @type {{codigo:number;setCodigo:()=>number;descricao:string;setDescricao:()=>string;embalagem:string;setEmbalagem:()=>string;categoria:string;setCategoria:()=>string;status:string;setStatus:()=>string;}}
*/
export const ThemeRegisterContexts = createContext();

const ThemeContextRegisterProvider = ({ children }) => {

  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [embalagem, setEmbalagem] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');

  const globalConnectionValue = {
    codigo,
    setCodigo,

    descricao,
    setDescricao,

    embalagem,
    setEmbalagem,

    categoria,
    setCategoria,

    status,
    setStatus,
  }

  return (
    <React.Fragment>
      <ThemeRegisterContexts.Provider value={globalConnectionValue}>
        {children}
      </ThemeRegisterContexts.Provider>
    </React.Fragment>
  );
};

export default ThemeContextRegisterProvider;