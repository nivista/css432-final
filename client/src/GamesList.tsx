import React, { useState } from 'react'
import { State, Action } from './types'
import * as api from './networking'

export default function GamesList(props: { dispatch: React.Dispatch<Action>, games: string[] }) {
  let [name, setName] = useState('')
  return <div>
    {props.games.map(game => <div onClick={e => { props.dispatch({ type: "joinGame", name: game }); return false; }}>
      {game}
    </div>
    )}
    <button onClick={_ => props.dispatch({ type: "unregister" })}>Unregister</button>
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder='New Game Name'></input>
      <button onClick={_ => props.dispatch({ type: "createGame", name: name })}>Create Game</button>
    </div>
  </div>
}
