const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const crypto = require('crypto')
const router = require("./router")
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app
  .use(cors())
  .use(express.json())
  .use('/api', router)

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

mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});