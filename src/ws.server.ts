/**
 * @name ws-server instance of a websocket server
 */

 //import packages
 import * as express from 'express'; //Framework NodeJS
 import * as http from 'http'; // Module server HTTP
 import * as WebSocket from 'ws'; // module server websocket

 // initialization of new application express
 const app = express();
// initialization of a HTTP server, used to communicate with client
 const server = http.createServer(app);
//initialization of websocket instance
 const wss = new WebSocket.Server({server});
// websocket server listenes to events
 wss.on('connection', (ws: WebSocket) => {


     //if connection is ok, and the server receive a message
     ws.on('message', (message: string) => {
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