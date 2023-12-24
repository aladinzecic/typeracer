import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Timer from "../Timer/Timer";
import "./Start.css";
export default function Start() {
  const { isGameOn, setIsGameOn } = useContext(AppContext);
  const [timerOn, setTimerOn] = useState(false);

  return (
    <div className="preStart">
      {!isGameOn&&!timerOn && (
        <button
          onClick={() => {
            setTimerOn(true);
            setTimeout(() => {
              setIsGameOn(true);
            }, 3000);
          }}
        >
          Start a race
        </button>
      )}
      {timerOn && <Timer time={3} />}
    </div>
  );
}
