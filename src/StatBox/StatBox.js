import React from 'react'
import "./StatBox.css"
export default function StatBox({wpm,time,numOfGames}) {
  return (
    <div className={numOfGames%2===0?'whitee':'stat-box'}>
      <h2>{numOfGames}</h2>
      <h2>{wpm}</h2>
      <h2>{time}</h2>
    </div>
  )
}
