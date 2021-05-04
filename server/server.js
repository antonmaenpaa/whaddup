const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server)


io.on("connection", (socket) => {
    console.log('connected')

})


server.listen(5000, () => {
    console.log(`Server is running on port 5000`)
})