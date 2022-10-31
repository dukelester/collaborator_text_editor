// The main entry to our server. Here we initialize the server in
// Express and the Socket connections

import express, { Request, Response } from 'express'
import cors from "cors";
import { ServerSocket } from './socket';
import { config } from './config/config';


const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) =>{
    res.send("Hello there")
});

const server = app.listen(config.server.port, () => console.log(`Server learning at http://localhost:${config.server.port}`))

/** Start the web socket by creating a simple instance of the socket */
new ServerSocket(server);

