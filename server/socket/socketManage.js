const more7LessService = require('../service/more-7-less-service');
const userService = require('../service/user-service');
const {logger} = require("../utils");

const users = {}

module.exports = io => socket => {
  io.emit('connected', {online: Object.keys(users).length})

  logger.info(`new connected: (socket.id: ${socket.id})`);
  console.log(`new connected: (socket.id: ${socket.id})`)

  socket.on("connected", async user => {
    await userService.setOnlineStatus(user.id_vk, true)
    users[socket.id] = user.id_vk
    io.emit('new online', {online: Object.keys(users).length})

    logger.info(`new user_vk connected: (socket.id: ${socket.id}, id_vk: ${user.id_vk})`);
  })

  socket.on("disconnect", async () => {
    await userService.setOnlineStatus(users[socket.id], false)
    delete users[socket.id]
    io.emit('new online', {online: Object.keys(users).length})

    logger.info(`new user_vk disconnect: (socket.id: ${socket.id})`);
  })

  more7LessService.io = io;
  userService.io = io;
  userService.users = users;
  userService.socket = socket;
}