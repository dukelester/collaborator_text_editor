// Creating a socket class
import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket{
    public static instance: ServerSocket
    public io: Server

    /** List of connected users */
    public users: string[]

    constructor(server: HTTPServer){
        ServerSocket.instance = this;
        this.users = [];
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: "*"
            }
        });
        this.io.on("connect", this.StartListeners);
        console.info("Socket IO has started ... ")
    }

    StartListeners = (socket: Socket) =>{
        console.log("Connection received from " + socket.id);
        this.users.push(socket.id)
        console.log(this.users)
        socket.emit('message', `new user has joined!`);
        socket.emit('user-list', this.users);

        socket.on("disconnect", () =>{
            console.log("Disconnect received from " + socket.id)
        });

        socket.on('editor-state', (data) => {
            console.log('Userrrr  => ', data)
            socket.broadcast.in(data).emit('new-remote-collaboration', data);
        });
        socket.on("editor-state", (data) => {
            this.io.emit("editor-state", data)
        });
    }
}