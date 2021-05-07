const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)

let allRooms = []

io.on('connection', socket => {
    socket.emit('your id', socket.id);
    socket.emit('updated-rooms-list', getRooms());

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected: ${socket.id}, ${reason}`)
        io.emit('updated-rooms-list', getRooms());
    })

    // socket.on('message', body => {
    //     socket.emit('message', body)


    // })

    // when pressing ok on modal on + icon
    // sends roomname you just created
    socket.on('create room', data  => {

        if(data.currentRoom) {
            socket.leave(data.room)
        }
        
        const newRoom = {
            name: data.room,
            password: data.password
        }
        socket.join(data.room)
        
        allRooms.push(newRoom)
        console.log(allRooms)
        socket.emit('joined room', data.room)
        socket.emit('updated-rooms-list', getRooms());
    })

    socket.on("join room", data => {
        // data.currentroom data.password data.roomName data.roomPassword
        // socket.removeAllListeners('message');

        console.log(newRoomToJoin.password)

        if(newRoomToJoin.password === data.roomPassword) {
            console.log("RÄTT LÖSEN")
            socket.join(data.roomName)
            socket.emit('joined room', data.roomName)
            socket.on('message', body => {
                io.to(data.roomName).emit('message', body)
            })
            socket.emit('updated-rooms-list', getRooms());
        } else {
            console.log("FEL LÖSEN")
        }

    })
})

// async function handleJoinRoom(io, data, socket) {
//     const { room, currentRoom, password, user } = data;
  
//     // If user is currently in a room, leave room
//     if (currentRoom) {
//       await socket.leave(currentRoom);
//     }
  
//     const newRoomToJoin = rooms.find((r) => r.name === room.name);
  
//     if (newRoomToJoin.password) {
//       if (newRoomToJoin.password !== password) {
//         // Incorrect password, user cannot join
//         return await socket.emit("wrong-password");
//       }
//     }
//     // Room has no password, or correct password was submitted
//     await socket.join(room.name);
//     // Returns the room that has been joined to client
//     io.to(socket.id).emit("join-room", room);
//     // Respond to client that join was successful
//     io.to(socket.id).emit("join-success");
//     // Broadcast message to all clients in the room
//     io.to(data.room).emit("new-user-in-room", `${user} has joined the chat`);
//     // Broadcast rooms update to all clients
//     io.emit("all-rooms", getRooms(io));
//   }


function getRooms() {

    const sockets = io.sockets.adapter.rooms
    const socketLength = 19
    let rooms = []
    

    for (const socket of sockets) {
        const actualRooms = socket.filter((key) => key === socket[0]);
        // if roomname is shorter then socket length remove long socket room
        if (actualRooms[0].length < socketLength) {
          rooms.push(actualRooms[0]);
        }
    }

    return [...new Set(rooms)]

}


server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})
