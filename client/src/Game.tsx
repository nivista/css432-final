import React from 'react'
import { Action } from './types'
import * as api from './networking'
import './Game.css'
export default function Game(props: { dispatch: React.Dispatch<Action>, board: boolean[][], name: string }) {
  return <div>
    <div>{props.name}</div>
    <div className="board">
      {props.board.flatMap((row, x) => row.map((cell, y) => <div className={cell ? 'square colored' : 'square'} onClick={getHandleClickSquare(x, y, !cell)} />))}
    </div>
    <button onClick={_ => props.dispatch({ type: "exitGame" })}>Exit Game</button>
  </div>
}

function getHandleClickSquare(x: number, y: number, color: boolean) {
  return function handleClickSquare(_: any) {
    api.paintSquare(x, y, color)
  }
}
