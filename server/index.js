const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app); // server 객체 생성
const io = socketio(server);

io.on('connection', (socket) => { // client와 연결되었을 때 발생
  console.log('We have a new connetion!!!');

  socket.on('join', ({ name, room }, callback) => { // on, 이벤트 리스터로 전달된 데이터가 있을 때 실행된다.
    const error = true;
    if(error) { // 에러 핸들링
      callback({ error: 'error' })
    }
  })

  socket.on('disconnect', () => { // client와 연결해제되었을 때 발생
    console.log('User had left!!!');
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); // socket 연결을 기다림