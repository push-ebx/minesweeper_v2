const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

app
  .use(cors())
  .use(express.json())

const io = require("socket.io")(server, {
  cors: {
    origin: "*", // replace
  },
});

const socketManage = require('./socket/socketManage')(io);
io.on('connection', socketManage);

app.get('/', (req, res) => {
  res.send("hello!")
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});