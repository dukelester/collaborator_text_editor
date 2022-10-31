const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("The text collaboration project", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
        const port = httpServer.address().port;
        clientSocket = new Client(`http://localhost:${port}`);
        io.on("connection", (socket) => {
            serverSocket = socket;
        });
        clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test("testing a simple message", (done) => {
        clientSocket.on("welcome to collaboration", (arg) => {
        expect(arg).toBe("multiuser collaboration tool");
        done();
        });
        serverSocket.emit("welcome to collaboration", "multiuser collaboration tool");
    });

    test("testing a simple message (with ack)", (done) => {
        serverSocket.on("today is about unit testing", (cb) => {
        cb("I want to disccs the TDD");
        });
        clientSocket.emit("today is about unit testing", (arg) => {
        expect(arg).toBe("I want to disccs the TDD");
        done();
        });
    });
});
