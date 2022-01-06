const users = [];

const addUser = ({ id, name, room }) => {
  // JavaScript Mastery = javascriptmastery 처럼 하나로 만들기
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // 존재하는 유저인지 확인
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };

  users.push(user);

  return { user }
}

const removeUser = () => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };