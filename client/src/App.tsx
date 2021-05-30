import { useEffect, useReducer } from 'react';
import './App.css';
import * as api from './networking'
import {State, Action} from './types'
import reducer from './reducer'
import RegistrationForm from './RegistrationForm'
import GamesList from './GamesList'
import Game from './Game'

const initialState: State = { type: "connecting" };

function App() {
  let [state, dispatch] = useReducer(reducer, initialState)
  useEffect(function () {
    api.init(dispatch)
  }, [])
  return (
    <div className="App">
      <div className="header">Draw With Friends</div>
      {function (): React.ReactElement {
        switch (state.type) {
          case "connecting":
            return <p>Connecting...</p>
          case "registration":
            return <RegistrationForm dispatch={dispatch} />
          case "loadingGamesList":
            return <p>Loading Games List...</p>
          case "gamesList":
            return <GamesList dispatch={dispatch} games={state.games} />
          case "loadingGame":
            return <p>Loading Game</p>
          case "inGame":
            return <Game dispatch={dispatch} board={state.board} name={state.name} />
          case "done":
            return <p>Done</p>
        }
      }()
      }
    </div>
  );
}

export default App;
