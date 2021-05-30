import React from 'react'
import { State, Action } from './types'
import config from './config'

let ws: WebSocket
let dispatch: React.Dispatch<Action>

export function init(_dispatch: React.Dispatch<Action>) {
  dispatch = _dispatch

  ws = new WebSocket("ws://" + config.url)
  ws.onopen = (_) => { dispatch({ type: "connect" }); return {}; }
  ws.onmessage = processMessage
  ws.onclose = console.error
  ws.onerror = console.error
}
export function registerDispatch(_dispatch: React.Dispatch<Action>) { dispatch = _dispatch }

export function registerWS(_ws: WebSocket) {
  ws = _ws
  ws.onopen = (_) => { dispatch({ type: "connect" }); return {}; }
  ws.onmessage = processMessage
  ws.onclose = console.error
  ws.onerror = console.error
}

function processMessage(msg: MessageEvent) {
  let json = JSON.parse(msg.data)
  switch (json.type) {
    case 'listGames':
      dispatch({ type: "loadGamesList", games: json.data.games })
      break
    case 'loadGame':
      dispatch({ type: 'loadGame', board: json.data.board })
      break
  }
}

export function register(name: string) {
  ws.send(JSON.stringify({ type: "register", data: { name } }))
}

export function listGames() {
  ws.send(JSON.stringify({ type: "listGames" }))
}

export function createGame(name: string) {
  ws.send(JSON.stringify({ type: "createGame", data: { name } }))
}

export function joinGame(name: string) {
  console.log("here")
  ws.send(JSON.stringify({ type: "joinGame", data: { name }, bob: "weave" }))
}

export function exitGame() {
  ws.send(JSON.stringify({ type: "exitGame" }))
}

export function unregister() {
  ws.send(JSON.stringify({ type: "unregister" }))
}

export function paintSquare(x: number, y: number, color: boolean) {
  ws.send(JSON.stringify({ type: "paintSquare", data: { x, y, color } }))
}