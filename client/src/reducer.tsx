import * as api from './networking'
import { State, Action } from './types'

export default function reducer(state: State, action: Action): State {
  switch (state.type) {
    case "connecting":
      if (action.type != "connect")
        throw "Unexpect action"

      return { type: "registration" }
    case "registration":
      if (action.type != "register")
        throw "Unexpected action"

      api.register(action.name)
      api.listGames()
      return { type: "loadingGamesList" }
    case "loadingGamesList":
      if (action.type != "loadGamesList")
        throw "Unexpected action"

      return { type: "gamesList", games: action.games }
    case "gamesList":
      switch (action.type) {
        case "createGame":
          api.createGame(action.name)
          return { type: "loadingGame", name: action.name }
        case "joinGame":
          api.joinGame(action.name)
          return { type: "loadingGame", name: action.name }
        case "unregister":
          api.unregister()
          return { type: "done" }
        default:
          throw "Unexpected action"
      }

    case "loadingGame":
      if (action.type != "loadGame")
        throw "Unexpected action"

      return { type: "inGame", board: action.board, name: state.name } // taking data from both state and action
    case "inGame":
      switch (action.type) {
        case "exitGame":
          api.exitGame()
          api.listGames()
          return { type: "loadingGamesList" }
        case "loadGame":
          return { type: "inGame", board: action.board, name: state.name }
        default:
          throw "Unexpected action"
      }
    case "done":
      throw "Unexpected action"
  }
}
