import React, { useEffect, useState, useRef } from "react";
import "./Timer.css";
export default function Timer({ time }) {
  const [secondsRemaining, setSecondsRemaining] = useState(time);
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

  return <div className="timer">{secondsRemaining}</div>;
}
