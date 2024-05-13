import React, { createContext, useState } from "react";

/**
* Description placeholder
* @date 3/26/2024 - 8:49:39 AM
*
* @type {{codigo:number;setCodigo:()=>number;descricao:string;setDescricao:()=>string;embalagem:string;setEmbalagem:()=>string;categoria:string;setCategoria:()=>string;status:string;setStatus:()=>string;}}
*/
export const ThemeTableProdContexts = createContext();

const ThemeTableProdContextsProvider = ({ children }) => {
  const globalConnectionValue = {}

  return (
    <React.Fragment>
      <ThemeTableProdContexts.Provider value={globalConnectionValue}>
        {children}
      </ThemeTableProdContexts.Provider>
    </React.Fragment>
  );
};

export default ThemeTableProdContextsProvider;
