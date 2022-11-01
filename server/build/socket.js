"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
class ServerSocket {
    constructor(server) {
        this.StartListeners = (socket) => {
            console.log("Connection received from " + socket.id);
            this.users.push(socket.id);
            console.log(this.users);
            socket.emit('message', `new user has joined!`);
            socket.emit('user-list', this.users);
            socket.on("disconnect", () => {
                console.log("Disconnect received from " + socket.id);
            });
            socket.on('editor-state', (data) => {
                console.log('Userrrr  => ', data);
                socket.broadcast.in(data).emit('new-remote-collaboration', data);
            });
            socket.on("editor-state", (data) => {
                this.io.emit("editor-state", data);
            });
        };
        ServerSocket.instance = this;
        this.users = [];
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: "*"
            }
        });
        this.io.on("connect", this.StartListeners);
        console.info("Socket IO has started ... ");
    }
}
exports.ServerSocket = ServerSocket;
