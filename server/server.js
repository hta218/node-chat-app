const path = require("path");
// http use behind the scene for express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const { generateMessage } = require("./utils/message");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected");

  socket.emit("newEmail", {
    from: "anhht@example.com",
    text: "Hey, i'm learning socketio",
    createAt: 123
  });

  socket.broadcast.emit("newMessage", generateMessage('Admin', "New user joined"));

  socket.emit("newMessage", generateMessage('Admin', "Welcome to the chat room"));

  socket.on("createEmail", (newEmail) => {
    // console.log('createEmail', newEmail);
  });

  socket.on("createMessage", (msg, callback) => {
    console.log("createMessage", msg);

    // socket.emit : emit to single connection (the current)
    // io.emit : emit to all connections to the server (the current)

    io.emit('newMessage', generateMessage(msg.from, msg.text));
    // socket.broadcast.emit("newMessage", {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });

    callback("This is from the server");
  });

  socket.on('disconnect', () => {
    console.log("User disconnected to server");
  })
});

// === createServer()
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
