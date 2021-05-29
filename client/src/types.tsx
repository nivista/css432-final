export type Connecting = { type: "connecting" }
export type Registration = { type: "registration" }
export type LoadingGamesList = { type: "loadingGamesList" }
export type GamesList = { type: "gamesList", games: string[] }
export type LoadingGame = { type: "loadingGame", name: string }
export type InGame = { type: "inGame", board: boolean[][], name: string }
export type Done = { type: "done" }

export type State = Connecting | Registration | LoadingGamesList | GamesList | LoadingGame | InGame | Done



export type Connect = { type: "connect" }
export type Register = { type: "register", name: string }
export type LoadGamesList = { type: "loadGamesList", games: string[] }
export type CreateGame = { type: "createGame", name: string }
export type JoinGame = { type: "joinGame", name: string }
export type LoadGame = { type: "loadGame", board: boolean[][] }
export type ExitGame = { type: "exitGame" }
export type Unregister = { type: "unregister" }

export type Action = Connect | Register | LoadGamesList | CreateGame | JoinGame | LoadGame | ExitGame | Unregister
