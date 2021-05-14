const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const cors = require('cors')
const io = socket(server)

app.use(cors())

let allRooms = []

io.on('connection', socket => {
    socket.emit('your id', socket.id);
    socket.emit('updated-rooms-list', getRooms());

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected: ${socket.id}, ${reason}`)
        io.emit('updated-rooms-list', getRooms());
    })

    socket.on("user-typing", (msg, roomName) => {
        socket.broadcast.to(roomName).emit("user-typing", msg);
    });



    socket.on("join room", data => {
        socket.removeAllListeners('message');

        socket.leaveAll()    
       
        // finds room to join
        let roomToJoin = allRooms.find((r) => r.name === data.roomName);
        if (!roomToJoin) {
            roomToJoin = {
                name: data.roomName,
                password: data.password
            }
            allRooms.push(roomToJoin)
        }

        // join room when creating new room
        if(roomToJoin.password === data.password) {     
            socket.join(data.roomName)
            socket.emit('joined room', data.roomName)
            io.to(data.roomName).emit("user joined room", "New user joined room")
            socket.on('message', body => {
               io.to(data.roomName).emit('message', body) 
            })
            io.emit('updated-rooms-list', getRooms());
            
            // check passwords when joining another room but not creating it
        } else if(roomToJoin.password === data.roomPassword) {
            socket.join(data.roomName)
            socket.emit('joined room', data.roomName)
            io.to(data.roomName).emit("user joined room", "New user joined room")
            socket.on('message', body => {
               io.to(data.roomName).emit('message', body)
            })
            io.emit('updated-rooms-list', getRooms());
        } else {
            socket.emit("password feedback", "wrong password")
        }
    })
})

function getRooms() {
    const sockets = io.sockets.adapter.rooms
    const socketLength = 19;
    let rooms = []

     for (const socket of sockets) {
            const actualRooms = socket.filter((key) => key === socket[0]);
            // if roomname is shorter then socket length remove long socket room
            if (actualRooms[0].length < socketLength) {
                let roomName = actualRooms[0];
                const checkedPassword = ifPassword(roomName);
                rooms.push({ name: roomName, checkedPassword: checkedPassword });
            } else {
                rooms.push()
            }
        }
    return rooms
}



function ifPassword(roomName) {
    for (r of allRooms) {
      if (r.name === roomName) {
        if (r.password) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})
