import {io, Socket} from 'socket.io-client'

class SocketClient {
    private static socket: Socket | null = null

    private static connectSocket = function(id:string,){
        return io("ws://localhost:5001/chat",{
        query:{
            id,
            token: localStorage.getItem("accessToken")
        }
    })
    }
    static getSocket = function (id:string){
        if(!SocketClient.socket)
            SocketClient.socket = SocketClient.connectSocket(id)
        return SocketClient.socket
    }
}

export default SocketClient