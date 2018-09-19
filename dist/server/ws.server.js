"use strict";
/**
 * @name ws-server instance of a websocket server
 */
Object.defineProperty(exports, "__esModule", { value: true });
//import packages
const express = require("express"); //Framework NodeJS
const http = require("http"); // Module server HTTP
const WebSocket = require("ws"); // module server websocket
// initialization of new application express
const app = express();
// initialization of a HTTP server, used to communicate with client
const server = http.createServer(app);
//initialization of websocket instance
const wss = new WebSocket.Server({ server });
// websocket server listenes to events
wss.on('connection', (ws) => {
    //if connection is ok, and the server receive a message
    ws.on('message', (message) => {
        // display message in the console and return a message to the client
        console.log('Reception: %s', message);
        ws.send(`Hello, you just sent -> ${message}`);
    });
    // Immediately send a message to connected clients
    ws.send('Hello, I am the websocket server');
});
//start server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server starting adress on : ${server.address()} :)`);
});
//# sourceMappingURL=ws.server.js.map