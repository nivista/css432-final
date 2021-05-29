import React, { useState } from 'react'
import { State, Action } from './types'

export default function RegistrationForm(props: { dispatch: React.Dispatch<Action> }) {
  let [name, setName] = useState('')

  return <div>
    <input value={name} onChange={e => setName(e.target.value)}></input>
    <button onClick={_ => props.dispatch({ type: "register", name })}>Submit</button>
  </div>
}