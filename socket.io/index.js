const {createServer} = require('http')
const {Server} = require('socket.io')
const {path} = require('path');

const server = createServer();

const io = new Server(server)

io.on('connection',(socket) => {
    console.log('socket connected!', socket.id)
    
    socket.on('message', (msg) => {
        console.log('message:', msg);
        socket.broadcast.emit(msg); // <-- All except the sender
        socket.emit(msg); // <-- All users including sender

    })

    socket.on('disconnect',() => {
        console.log(socket.id, 'disconnected!')
    })
})

server.listen(3000,() => {
    console.log('web socket sercer listening at port 3000')
})