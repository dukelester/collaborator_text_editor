"use strict";
// The main entry to our server. Here we initialize the server in
// Express and the Socket connections
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket");
const config_1 = require("./config/config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public/build")));
app.get("*", function (_, res) {
    res.sendFile(path_1.default.join(__dirname, "../public/build/index.html"), function (error) {
        if (error) {
            res.status(500).send(error);
        }
    });
});
const server = app.listen(config_1.config.server.port, () => console.log(`Server learning at http://localhost:${config_1.config.server.port}`));
/** Start the web socket by creating a simple instance of the socket */
new socket_1.ServerSocket(server);
