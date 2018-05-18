const path = require("path");
// http use behind the scene for express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected");

  socket.on('disconnect', () => {
    console.log("User disconnected to server");
  })
});

// === createServer()
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
