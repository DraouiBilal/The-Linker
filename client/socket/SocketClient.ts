import {io, Socket} from 'socket.io-client'

class SocketClient {
    static socket: Socket | null = null

    static connectSocket = function(username?:string){
        return io("ws://localhost:5001/chat",{
        query:{
            username:'DraouiBilal',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwOWMxMjliLTY4YWUtNDIwNi1iMDcwLWQ2YjhhMjhkZWI5ZiIsImlhdCI6MTY1MTk0ODU1MywiZXhwIjoxNjUyNTUzMzUzfQ.N1RDZT9GzY_PNQe0sPBfznY5TVkzOLrpUar1qxXwIGM"
        }
    })
    }
    static getSocket = function (username:string){
        if(SocketClient.socket===null)
            SocketClient.socket = SocketClient.connectSocket(username)
        return SocketClient.socket
    }
}

export default SocketClient