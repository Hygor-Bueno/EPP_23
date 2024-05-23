import React, { createContext, useEffect, useState } from "react";

export const ThemeMenuContext = createContext();

const ThemeMenuProvider = ({ children }) => {

  const [Cod, setCod] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [State, setState] = React.useState('');

  /**Variaveis de controle do Register do arquivo RegisterMenu.jsx*/
  const globalMenuValue = {
    Cod, setCod,
    Description, setDescription,
    State, setState,
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
