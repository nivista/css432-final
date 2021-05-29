
document.onload = (function () {

  let socket = new WebSocket("ws://127.0.0.1:8080")
  socket.onmessage = (msg) => {
    console.log("message from server: " + msg)
  }

  socket.onopen = _ => {
    socket.send("hello server");
  }
})

