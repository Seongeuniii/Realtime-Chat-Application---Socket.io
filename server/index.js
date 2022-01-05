const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom }  = require('./users.js')

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app); // server 객체 생성
const io = socketio(server);

io.on('connection', (socket) => { // client와 연결되었을 때 발생
  console.log('We have a new connetion!!!');

  socket.on('join', ({ name, room }, callback) => { // on, 이벤트 리스터로 전달된 데이터가 있을 때 실행된다.
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
    
    socket.join(user.room);

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message});

    callback()
  })

  socket.on('disconnect', () => { // client와 연결해제되었을 때 발생
    console.log('User had left!!!');
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); // socket 연결을 기다림