import React from 'react'
import logo from '../logo.png'
import "./Navbar.css"
export default function Navbar() {
  return (
    <div className='nav'>
      <img src={logo}></img>
      <h2>TYPERACER</h2>
    </div>
  )
}
