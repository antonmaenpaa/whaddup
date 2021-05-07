const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)


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

    socket.on("join room", roomName => {
        // if(!socket.id) {
        //     io.socketsLeave(roomName)
        // }
        socket.removeAllListeners('message');
        socket.join(roomName)
        socket.emit('joined room', roomName)
        // console.log(io.sockets.adapter.rooms)
        socket.emit('updated-rooms-list', getRooms());

        
        socket.on('message', body => {
            io.to(roomName).emit('message', body)
        })

    })
})

// socket.on('disconnect', () => {
//     io.of('/test').emit('message', 'user disconnected '+ socket.id);
//     if (rooms[rooms[socket.id]] && Object.keys(rooms[rooms[socket.id]]).length == 2) {
//         delete rooms[rooms[socket.id]];
//     } else {
//         if (rooms[rooms[socket.id]] && rooms[rooms[socket.id]][socket.id]) {
//             delete rooms[rooms[socket.id]][socket.id];
//         }
//     }
//     delete rooms[socket.id];
//     console.log('Disonnected', socket.id);
//     console.log(rooms);
// })

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
