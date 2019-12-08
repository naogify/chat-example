var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

const nsp = io.of("/my-namespace");

nsp.on("connection", function(socket) {
  console.log(socket);
  socket.on("chat message", function(msg) {
    nsp.emit("chat message", msg);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
