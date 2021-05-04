const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)


io.on("connection", (socket) => {
    socket.on("join server", (username) => {
        const user = {
            username,
            id: socket.id,
        };
        users.push(user);
        io.emit("new user", users)
    })

    socket.on("join room", (roomName, callback) => {
        socket.join(roomName);
        callback(rooms[roomName]);
    });

    socket.on("send message" , ({ content, to, sender, chatName, isChannel }) => {
        if (isChannel) {
            const payload = {
                content,
                chatName,
                sender,
            };
            socket.to(to).emit("new message", payload);
        } else {
            const payload = {
                content,
                chatName: sender,
                sender,
            };
            socket.to(to).emit("new message", payload);
        }
        if(rooms[chatName]) {
            rooms[chatName].push({
                sender,
                content
            });
        }
    });

    socket.on("disconnect", () => {
        users = users.filter(u => u.id ==! socket.id);
        io.emit("new user", users);
    })
});



server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})