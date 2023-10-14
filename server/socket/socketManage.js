
module.exports = io => socket => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg+'123')
  });
}