const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)

let rooms = {}

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

    socket.on("join room", ({username, room, password, joinRoomPassword}) => {
        // socket.removeAllListeners('message');
        // socket.emit('updated-rooms-list', getRooms());
        let isEntryAvailable = userJoin(socket.id, username, room, password, joinRoomPassword);
        if (isEntryAvailable) {
            socket.emit('passwordFeedback', 'correct')
            socket.on('message', body => {
                io.to(room).emit('message', body)
            })
        } else {
            socket.emit('passwordFeedback', 'wrong')
        }
    })
})

function getRooms() {

    const sockets = io.sockets.adapter.rooms

    let rooms1 = []


    for (const socket of sockets) {
        let actualRooms = socket.filter(room => room !== socket[1])

        rooms1.push(...actualRooms)
    }
    //console.log("all rooms", rooms)
    // console.log(rooms)

    return [...new Set(rooms1)]

    
    // {
    //     name: "General",
            // password: "1234"
    //     sockets: [
    //     "Pelle",
    //     "Johan
    //     ]   
    // }

}




// function getRooms() {
// const sockets = Object.values(io.sockets.sockets)
// let rooms: string[] = []
// for (const socket of sockets) {
// const actualRooms = Object.keys(socket.rooms).filter(room => room !== socket.id)
// rooms.push(...actualRooms)
// }
// return [...new Set(rooms()
    
//     socket.on('disconnect', () => {
//         io.of('/test').emit('message', 'user disconnected '+ socket.id);
//         if (rooms[rooms[socket.id]] && Object.keys(rooms[rooms[socket.id]]).length == 2) {
//             delete rooms[rooms[socket.id]];
//         } else {
//             if (rooms[rooms[socket.id]] && rooms[rooms[socket.id]][socket.id]) {
//                 delete rooms[rooms[socket.id]][socket.id];
//             }
//         }


    function userJoin (socketId, username, room, password, joinRoomPassword) {
        if (!rooms[room] || (rooms[room] && !rooms[room].password)) {
            if (!rooms[room]) {
                rooms[room] = {};
            }
            rooms[room].password = password;
            rooms[room][socketId] = username;
            rooms[socketId] = room;
            // socket.emit('updated-rooms-list', getRooms());

            return true;
        } else {
             if(password === joinRoomPassword) {
                 if (rooms[room].password == password) {
                     rooms[socketId] = room;
                     rooms[room][socketId] = username;
                     socket.join(room);
                     socket.emit('joined room', room)
                     socket.emit('updated-rooms-list', getRooms());
           
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