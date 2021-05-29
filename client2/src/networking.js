let ws = null
let dispatch = null

export function registerWS(_ws) {
  ws.onmessage = processMessage
  ws = _ws
}
export function registerDispatch(_dispatch) 
  dispatch = _dispatch

function processMessage(msg) {

}

export function register(name) {
  ws.sendmessage({type: "register", data: {name}})
}

export function listGames() {
  ws.sendmessage({type: "listGames"})
}

export function createGame(name) {
  ws.sendmessage({type: "createGame", data: {name}})
}

export function joinGame(name) {
  ws.sendmessage({type: "joinGame", data: {name}})
}

export function exitGame() {
  ws.sendmessage({type: "exitGame"})
}

export function unregister() {
  ws.sendmessage({type: "unregister"})
}