const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080,
})

let games = []
let players = []

wss.on('error', console.error)
wss.on('connection', ws => {
  let name = ''
  ws.on('message', msg => {
    try {
      msg = JSON.parse(msg)
      switch (msg.type) {
        case 'register':
          {
            if (players.some(player => player.name == msg.data.name))
              throw 'Name in use'

            if (name != '')
              throw 'You\'ve already registered'

            if (msg.data.name == '' || msg.data.name == null)
              throw 'Invalid name'

            name = msg.data.name
            players.push({ name, game: null, ws: ws })
          }
          break;
        case 'listGames':
          {
            if (name == '')
              throw 'You haven\'t registered yet'

            ws.send(JSON.stringify({ type: 'listGames', data: { 'games': games.map(game => game.name) } }))
          }
          break;
        case 'createGame':
          {
            if (name == '')
              throw 'You haven\'t registered yet'

            if (msg.data.name == null || msg.data.name == '')
              throw 'Invalid game name'

            if (games.some(game => game.name == msg.data.name))
              throw 'Game name in use'

            if (players.some(player => player.name == name && player.game != null))
              throw 'You\'re already in a game'

            for (let i = 0; i < players.length; i++) {
              if (players[i].name == name) {
                players[i].game = msg.data.name
              }
            }
            let board = newBoard()
            games.push({ name: msg.data.name, board: newBoard() })
            ws.send(JSON.stringify({ type: 'loadGame', data: { board } }))
          }
          break;
        case 'joinGame':
          {
            if (name == '')
              throw 'You haven\'t registered yet'

            if (players.some(player => player.name == name && player.game == msg.data.name)) // hack to solve 'double join' bug on frontend
              break;

            if (players.some(player => player.name == name && player.game != null))
              throw 'You\'re already in a game'

            if (!games.some(game => game.name == msg.data.name))
              throw 'Game not found'

            players.find(player => player.name == name).game = msg.data.name
            let game = games.find(game => game.name == msg.data.name)
            let board = game.board

            ws.send(JSON.stringify({ type: 'loadGame', data: { board } }))
          }
          break;
        case 'exitGame':
          if (name == '')
            throw 'You haven\'t registered yet'

          players.find(player => player.name == name).game = null;

          break;
        case 'unregister':
          throw 'You unregistered'
        case 'paintSquare':
          let player = players.find(player => player.name == name)

          if (!player.game)
            throw 'You\'re not in a game'

          let x = msg.data.x
          let y = msg.data.y
          let color = msg.data.color

          if (typeof x != 'number' || typeof y != 'number' || typeof color != 'boolean')
            throw 'invalid input'

          if (x < 0 || x > 9 || y < 0 || y > 10)
            throw 'out of bounds'

          let game = games.find(game => game.name == player.game)
          game.board[x][y] = color

          let participants = players.filter(player => player.game == game.name)
          participants.forEach(player => { player.ws.send(JSON.stringify({ type: 'loadGame', data: { board: game.board } })) }) // edge case, what if they already left?

          break;
        default:
          throw 'Unknown type'
      }
    } catch (e) {
      players = players.filter(player => player.name != name)
      ws.close(1000, e)
      return
    }
  })
})

function newBoard() {
  let board = []
  for (let r = 0; r < 10; r++) {
    board[r] = []
    for (let c = 0; c < 10; c++) {
      board[r][c] = false
    }
  }
  return board
}
