// init request, create connection
var socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

socket.emit('createEmail', {
  to: 'me@techkids.vn',
  text: "me too"
})

socket.on('disconnect', () => {
  console.log("Disconnected from server");
});

socket.on('newEmail', (email) => {
  // console.log("New email", email);
});

socket.on("newMessage", (msg) => {
  console.log("New message", msg);

  var li = $("<li></li>").text(`${msg.from}: ${msg.text}`);
  $("#messages").append(li);
});

$("#js-message-form").on("submit", (e) => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: 'client@side.com',
    text: $("input[name=msg]").val()
  }, data => {
    console.log("Got it!", data);
  });
});