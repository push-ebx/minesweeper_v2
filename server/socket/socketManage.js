const more7LessService = require('../service/more-7-less-service');
const userService = require('../service/user-service');

const users = {}

module.exports = io => socket => {
  console.log(socket.id, "is connected")

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg+'123')
  });

  socket.on("connected", async user => {
    await userService.setOnlineStatus(user.id_vk, true)
    users[socket.id] = user.id_vk
  })

  socket.on("disconnect", async () => {
    await userService.setOnlineStatus(users[socket.id], false)
    delete users[socket.id]
  })

  more7LessService.io = io;
}