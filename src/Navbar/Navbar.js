import React, { useContext } from "react";
import logo from "../logo.png";
import "./Navbar.css";
import { AppContext } from "../Context/AppContext";
export default function Navbar() {
  const {setAreStatsOpen}=useContext(AppContext)
  return (
    <div className="nav">
      <img src={logo} alt="img"></img>
      <h2>TYPERACERX</h2>
      <h3 onClick={()=>{setAreStatsOpen(true)}}>STATS</h3>
    </div>
  );
}
