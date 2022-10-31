"use strict";
// The main entry to our server. Here we initialize the server in
// Express and the Socket connections
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Hello there");
});
app.listen(PORT, () => console.log(`Server learning at http://localhost:${PORT}`));
