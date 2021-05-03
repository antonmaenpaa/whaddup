const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)

// app.use(express.static("client"))

const port = 3000;

io.on("connection", (socket) => {
    console.log("Client was connected", socket.id)
})



server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})