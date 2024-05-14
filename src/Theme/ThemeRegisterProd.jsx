import React, { createContext } from "react";
import { Connection } from "../Util/RestApi";

export const ThemeRegisterContexts = createContext();

const ThemeContextRegisterProvider = ({ children }) => {
  const connection = new Connection();


  const globalConnectionValue = {

  };


  return (
    <React.Fragment>
      <ThemeRegisterContexts.Provider value={globalConnectionValue}>
        {children}
      </ThemeRegisterContexts.Provider>
    </React.Fragment>
  );
};

export default ThemeContextRegisterProvider;
