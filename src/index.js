const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  io.emit('chat message', '[CHAT] A user has connected');

  socket.on('user typing', (nickname) => {
    if (nickname) return io.emit('user typing', `[${nickname}]: is typing`);

    return setTimeout(() => (io.emit('user typing', '')), 1500);
  });

  socket.on('chat message', ({ from, msg }) => {
    io.emit('chat message', `[${from}]: ${msg}`);
    io.emit('user typing', '');
  });

  socket.on('disconnect', () => {
    io.emit('chat message', '[CHAT] A user has disconnected');
  });
});

http.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on *:3000');
});
