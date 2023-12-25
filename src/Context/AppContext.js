import React, { createContext, useState } from "react";
const AppContext = createContext();

function ContextProvider({ children }) {
  const [isGameOn, setIsGameOn] = useState(false);
  const [gameTime, setGameTime] = useState(30);
  const [loadTimerOn, setLoadTimerOn] = useState(false);

  const values = {
    isGameOn,
    setIsGameOn,
    gameTime,
    setGameTime,
    loadTimerOn,
    setLoadTimerOn,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export { AppContext, ContextProvider };
