import React, { useEffect, useState, useRef, useContext } from "react";
import "./Timer.css";
import { AppContext } from "../Context/AppContext";
export default function Timer({ time }) {
  const [secondsRemaining, setSecondsRemaining] = useState(time);
  const {loadTimerOn}=useContext(AppContext)
  const intervalIdRef = useRef(null);
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalIdRef.current);
          return 0; // Ensure that the state is set to 0 when reaching 0 seconds
        }
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalIdRef.current);
  }, []);

  return <div className={loadTimerOn?'load-timer':'timer'}>{secondsRemaining}</div>;
}
