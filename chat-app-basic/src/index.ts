import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket : WebSocket,
    room : string
}

let allSocket:User[] = []

wss.on("connection", (socket) => {

    socket.on("error", (error) => {
        console.error(error)
    })

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString())

        if(parsedMessage.type == "join_room"){

            allSocket.push({
                socket ,
                room : parsedMessage.payload.room
            })


        }

        if(parsedMessage.type == "chat"){

            // find current user room
            const currentUserSocket = allSocket.filter((x) => x.socket === socket)

            if (!currentUserSocket) {
                return;
            }

            const currentRoomUsers = allSocket.filter(x => x.room === currentUserSocket[0].room)

            // filter out other sockets in the same room and send message
            for(let i =0; i < currentRoomUsers.length; i++){
                currentRoomUsers[i].socket.send(JSON.stringify(parsedMessage.payload.message))
            }
        }

    })   

    socket.on("close", () => {
        
       const currentUser =  allSocket.filter(x => x.socket == socket)
       allSocket = allSocket.filter(x => x.socket !== socket)

    })

})