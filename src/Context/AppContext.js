import React, { createContext, useState } from "react";
const AppContext = createContext();

function ContextProvider({ children }) {
  const [isGameOn, setIsGameOn] = useState(false);

  const values = {
    isGameOn,
    setIsGameOn,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export { AppContext, ContextProvider };
