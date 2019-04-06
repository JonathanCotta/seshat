// eslint-disable-next-line no-undef
const socket = io();

// nickname selection
// eslint-disable-next-line no-alert
const nickname = prompt('Choose a nickname');

// get elements
const chatOutput = document.querySelector('#messages');
const chatInput = document.querySelector('#m');
const sysmg = document.querySelector('#sysmg');

// show typing msg
chatInput.addEventListener('keydown', () => (socket.emit('user typing', nickname)));

chatInput.addEventListener('keyup', () => (socket.emit('user typing', '')));

socket.on('user typing', (msg) => {
  sysmg.innerHTML = msg;
});

// send message and clean input
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('chat message', { from: nickname, msg: chatInput.value });
  chatInput.value = '';
});

// show messages
socket.on('chat message', (msg) => {
  const node = document.createElement('LI');
  const text = document.createTextNode(msg);

  node.appendChild(text);
  chatOutput.appendChild(node);
});
