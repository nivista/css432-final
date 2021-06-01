import React, { useState } from 'react'
import { Action } from './types'

export default function GamesList(props: { dispatch: React.Dispatch<Action>, games: string[] }) {
  let [name, setName] = useState('')
  return <div>
    <div>Current Available Games</div>
    <nav>
      <ul>
      {props.games.map(game => <div onClick={e => { props.dispatch({ type: "joinGame", name: game }); return false; }}>
        {game}
      </div>
      )}
      </ul>
    </nav>
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder='New Game Name'></input>
      <button onClick={_ => props.dispatch({ type: "createGame", name: name })}>Create Game</button>
    </div>
    <button style={{ position: "relative", top: 200 }} onClick={_ => props.dispatch({ type: "unregister" })}>Unregister</button>
  </div>
}
