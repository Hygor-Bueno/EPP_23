import React, { createContext, useEffect, useState } from "react";

export const ThemeMenuContext = createContext();

const ThemeMenuProvider = ({ children }) => {

  const [Cod, setCod] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [State, setState] = React.useState('');

  const [openDetails, setOpenDetails] = React.useState(false);

  /**Variaveis de controle do Register do arquivo RegisterMenu.jsx*/
  const globalMenuValue = {
    // Variaveis de ambiente
    Cod, setCod,
    Description, setDescription,
    State, setState,

    // fecha e abre o modal de detalhes do arquivo de DisplayOrders
    openDetails, setOpenDetails,
  };

  return (
    <React.Fragment>
        <ThemeMenuContext.Provider value={globalMenuValue}>
          {children}
        </ThemeMenuContext.Provider>
    </React.Fragment>
  );
};

export default ThemeMenuProvider;
