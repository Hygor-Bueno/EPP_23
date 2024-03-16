import React, { createContext, useState } from "react";
export const ThemeConnectionContext = createContext();

const ThemeContextConnectionProvider = ({ children }) => {

  const [data, setData] = useState("");
  
  const globalConnectionValue = {
    data
  }

  return (
    <React.Fragment>
      <ThemeConnectionContext.Provider value={globalConnectionValue}>
        {children}
      </ThemeConnectionContext.Provider>
    </React.Fragment>
  );
};

export default ThemeContextConnectionProvider;
