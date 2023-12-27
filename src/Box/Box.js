import React from "react";
import "./Box.css";
export default function Box({text,num}) {
  return (
    <div className="box">
      <h2>{text}</h2>
      <br />
      <h2>{num}</h2>
    </div>
  );
}
