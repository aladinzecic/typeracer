import React, { useContext} from "react";
import { AppContext } from "../Context/AppContext";
import Timer from "../Timer/Timer";
import "./Start.css";
export default function Start() {
  const { isGameOn, setIsGameOn,loadTimerOn,setLoadTimerOn } = useContext(AppContext);

  return (
    <div className="preStart">
      {!isGameOn&&!loadTimerOn && (
        <button
          onClick={() => {
            setLoadTimerOn(true);
            setTimeout(() => {
              setIsGameOn(true);
            }, 3000);
          }}
        >
          Start a race
        </button>
      )}
      {loadTimerOn && <Timer time={3} />}
    </div>
  );
}
