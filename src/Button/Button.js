import React, { useContext } from 'react'
import "./Button.css"
import { AppContext } from '../Context/AppContext'
export default function Button({time}) {
    const {gameTime,setGameTime,isGameOn}=useContext(AppContext);
  return (<>
    {!isGameOn && (
  <div className={time === gameTime ? 'selected' : 'button'} onClick={() => setGameTime(time)}>
    {time} s
  </div>
)}

      
</>
  )
}
