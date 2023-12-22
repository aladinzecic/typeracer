import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Timer from "../Timer/Timer";
import "./Start.css";
export default function Start() {
  const { isGameOn, setIsGameOn } = useContext(AppContext);

  return (
    <div className="preStart">
      {!isGameOn ? (
        <button
          onClick={() => {
            setIsGameOn(true);
          }}
        >
          Start a race
        </button>
      ) : (
        <Timer time={3} />
      )}
    </div>
  );
}
