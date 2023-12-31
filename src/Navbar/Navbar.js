import React from "react";
import logo from "../logo.png";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="nav">
      <img src={logo} alt="img"></img>
      <h2>TYPERACERX</h2>
    </div>
  );
}
