const more7LessService = require('../service/more-7-less-service');
const userService = require('../service/user-service');

const users = {}

module.exports = io => socket => {
  io.emit('connected', {online: Object.keys(users).length})
  console.log(socket.id, "is connected")

  socket.on("connected", async user => {
    await userService.setOnlineStatus(user.id_vk, true)
    users[socket.id] = user.id_vk
    io.emit('new online', {online: Object.keys(users).length})
  })

  socket.on("disconnect", async () => {
    await userService.setOnlineStatus(users[socket.id], false)
    delete users[socket.id]
    io.emit('new online', {online: Object.keys(users).length})
  })

  more7LessService.io = io;
  userService.io = io;
  userService.users = users;
  userService.socket = socket;
}