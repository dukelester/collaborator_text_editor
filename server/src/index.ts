// The main entry to our server. Here we initialize the server in
// Express and the Socket connections

import express, { Request, Response } from 'express'
import cors from "cors";
import { ServerSocket } from './socket';
import { config } from './config/config';
import path from 'path';


const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "../public/build")));
app.get("*", function(_, res: Response) {
    res.sendFile(path.join(__dirname,  "../public/build/index.html"),
    function (error) {
        if (error){
            res.status(500).send(error)
        }
    })
})

const server = app.listen(config.server.port, () => console.log(`Server learning at http://localhost:${config.server.port}`))

/** Start the web socket by creating a simple instance of the socket */
new ServerSocket(server);

