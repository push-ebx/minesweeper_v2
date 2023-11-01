const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const router = require("./router")
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.NODE_ENV === 'PROD' ? process.env.PROD_PORT : process.env.DEV_PORT;
const DB_URL = process.env.NODE_ENV === 'PROD' ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

app
  .use(cors())
  .use(express.json())
  .use('/api', router)

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const socketManage = require('./socket/socketManage')(io);
io.on('connection', socketManage);

app.get('/', (req, res) => {
  res.send("hello!")
})

mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});

server.listen(PORT, 'localhost',() => {
  console.log(`Server started on ${PORT}`);
});