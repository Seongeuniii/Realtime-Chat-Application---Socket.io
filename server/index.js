const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app); // server 객체 생성
const io = socketio(server);

io.on('connection', (socket) => { // client와 연결되었을 때 발생
  console.log('We have a new connetion!!!');
  socket.on('disconnect', () => { // client와 연결해제되었을 때 발생
    console.log('User had left!!!');
  })
});

app.use(router);


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); // socket 연결을 기다림