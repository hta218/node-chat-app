// init request, create connection
var socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

socket.emit('createEmail', {
  to: 'me@techkids.vn',
  text: "me too"
})

// socket.emit("createMessage", {
//   to: 'server@side.com',
//   text: "Use nodejs, it's awesome"
// });

socket.on('disconnect', () => {
  console.log("Disconnected from server");
});

socket.on('newEmail', (email) => {
  // console.log("New email", email);
});

socket.on("newMessage", (msg) => {
  console.log("New message", msg);
});