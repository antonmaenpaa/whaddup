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

function getRooms() {

    const sockets = io.sockets.adapter.rooms

    let rooms = []


    for (const socket of sockets) {
        let actualRooms = socket.filter(room => room !== socket[1])

        rooms.push(...actualRooms)
    }
    //console.log("all rooms", rooms)
    // console.log(rooms)

    return [...new Set(rooms)]

    
    // {
    //     name: "General",
            // password: "1234"
    //     sockets: [
    //     "Pelle",
    //     "Johan
    //     ]   
    // }

}


server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})


// function getRooms() {
// const sockets = Object.values(io.sockets.sockets)
// let rooms: string[] = []
// for (const socket of sockets) {
// const actualRooms = Object.keys(socket.rooms).filter(room => room !== socket.id)
// rooms.push(...actualRooms)
// }
// return [...new Set(rooms()