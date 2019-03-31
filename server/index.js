const express = require("express");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const massive = require("massive");
const app = express();
const socketIO = require("socket.io");
app.use(bodyParser.json());
const io = socketIO(
  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  })
);

app.get("/", (req, res) => res.send("Hello World!"));

// Sockets

io.on("connection", socket => {
  console.log("user connected");
  socket.on("news", data => {
    socket.join(data.room);
    io.in(data.room).emit("news from server", data);
  });
});
