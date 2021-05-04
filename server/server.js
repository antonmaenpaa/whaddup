const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)


io.on('connection', socket => {
    socket.emit('your id', socket.id);
    socket.on('send message', body => {
        io.emit('message', body)
    })
})


// let socketsConnected = new Set()


// io.on('connection', onConnected)


// function onConnected(socket) {
//     socketsConnected.add(socket.id);

//     io.emit('clients-total', socketsConnected.size)
    
//     socket.on('message', (data) => {
//         console.log(data)
//         socket.broadcast.emit('chat-message', data)
//     })
    
//     socket.on('feedback', (data) => {
//         socket.broadcast.emit('feedback', data)
//     })
    
//     socket.on('disconnect', () => {
//         console.log('Socket disconnected');
//         socketsConnected.delete(socket.id)
//         io.emit('clients-total', socketsConnected.size)

//     })
// }

server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})