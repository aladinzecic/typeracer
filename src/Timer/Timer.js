import React, { useEffect, useRef, useContext } from "react";
import "./Timer.css";
import { AppContext } from "../Context/AppContext";
export default function Timer({ time }) {
  const {
    loadTimerOn,
    secondsRemaining,
    setSecondsRemaining,
    setIsGameOver,
    isGameOver,
  } = useContext(AppContext);
  const intervalIdRef = useRef(null);
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalIdRef.current);
          setIsGameOver(true);
          console.log(isGameOver);
          return 0; // Ensure that the state is set to 0 when reaching 0 seconds
        }
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalIdRef.current);// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setSecondsRemaining(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={loadTimerOn ? "load-timer" : "timer"}>
      {secondsRemaining}
    </div>
  );
}
