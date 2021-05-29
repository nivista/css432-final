import './App.css';
import { useEffect, useReducer } from 'react';
import * as api from './networking';

const intialState = {
  screen: "connecting"
}

let socket = null

function reducer(state, action) {
  switch (state.screen) {
    case "connecting":
      if (action.type != "connected")
        throw "Unexpected action"
      return { screen: "registration" }
    case "registration":
      if (action.type != "register")
        throw "Unexpected action"
      api.register(action.data.name)
      
  }
}



function App() {
  const [state, dispatch] = useReducer(intialState, reducer)
  useEffect(function () {
    api.registerDispatch(dispatch)
    socket = new WebSocket("ws://127.0.0.1:8080")
    api.registerWS(socket)
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
