import { io, Socket } from "socket.io-client";
import API from "../utils/api";

class SocketClient {
    private static socket: Socket | null = null;

    private static connectSocket = function (id: string) {
        return io(`${API.BASE_CHAT_URL}/chat`, {
            query: {
                id,
                token: localStorage.getItem("accessToken"),
            },
        });
    };
    static getSocket = function (id: string) {
        if (!SocketClient.socket)
            SocketClient.socket = SocketClient.connectSocket(id);
        return SocketClient.socket;
    };
}

export default SocketClient;
