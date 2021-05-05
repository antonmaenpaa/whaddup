const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)


io.on('connection', socket => {
    socket.emit('your id', socket.id);
    // socket.emit('updated-rooms-list', getRooms);

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected: ${socket.id}, ${reason}`)
        // io.emit('updated-rooms-list', getRooms);
    })

    socket.on('message', body => {
        socket.emit('message', body)
    })

    // socket.on('join room', roomName => {
    //     // socket.removeAllListeners('message')
        
    //     socket.join(roomName)
    //     socket.on('message', body => {
    //         io.to(roomName).emit('message', body)
    //     })

    //     //io.emit('updated-rooms-list', getRooms);
    // })
})

//function getRooms() {
    // io.sockets.adapter.rooms
    // {
    //     'lobby': ['a', 'b', 'c', 'd'],
    //     'köket': ['d'],
    //     'a': ['a'],
    //     'b': ['b'],
    //     'c': ['c'],
    //     'd': ['d'],
    // }
    //return ['lobby', 'köket']
// }


server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})