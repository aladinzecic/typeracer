import React, { createContext, useState } from "react";
const AppContext = createContext();

function ContextProvider({ children }) {
  const [isGameOn, setIsGameOn] = useState(false);
  const [gameTime, setGameTime] = useState(30);
  const [startTime, setStartTime] = useState(30);
  const [loadTimerOn, setLoadTimerOn] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(-1);
  const [isGameOver, setIsGameOver] = useState(false);

  const values = {
    isGameOn,
    setIsGameOn,
    gameTime,
    setGameTime,
    loadTimerOn,
    setLoadTimerOn,
    startTime,
    setStartTime,
    secondsRemaining,
    setSecondsRemaining,
    isGameOver,
    setIsGameOver,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export { AppContext, ContextProvider };
