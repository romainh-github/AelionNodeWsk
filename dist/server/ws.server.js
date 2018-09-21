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
var mess;
// websocket server listenes to events
wss.on('connection', (ws) => {
    // Create empty any variable to send clients data as a json
    let envelop = {};
    //if connection is ok, and the server receive a message
    ws.on('message', (message) => {
        // display message in the console and return a message to the client
        console.log('Reception: %s [%d]', message, new Date());
        //add dynamically an attribute message to the object envelop and give it the value message: any
        console.log('Stringify message : ' + JSON.stringify(message));
        mess = JSON.parse(message);
        console.log('test pares parse json ' + mess);
        let m = mess.message;
        let i = mess.id;
        let d = mess.date;
        console.log('message tout seul ? : ' + m);
        console.log('id tout seul ? : ' + i);
        console.log('date toute seul ? : ' + d);
        if (m != undefined) {
            envelop.message = m;
            envelop.id = i;
            envelop.date = d;
        }
        else {
            envelop.id = 'Bot';
            envelop.message = 'New user joined the room.';
        }
        // echo for transmitter 
        console.log(JSON.stringify('enveloppe ? ' + envelop));
        ws.send(JSON.stringify(envelop));
        //Broadcast to all clients except the transmitter
        wss.clients.forEach(client => {
            // if it is not the transmitter
            if (client != ws && m != undefined) {
                console.log('Broadcasting to all : ' + m);
                envelop.message = m;
                envelop.id = i;
                envelop.date = d;
                client.send(JSON.stringify(envelop));
                //client.send(envelop);
            }
            else {
                envelop.id = 'Bot';
                envelop.message = 'New user joined the room.';
                client.send(JSON.stringify(envelop));
            }
        });
    });
    // Immediately send a message to connected clients
    envelop.id = 'Bot';
    envelop.message = 'Welcome to the chat';
    //ws.send(JSON.stringify(envelop));
});
//start server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server starting adress on : ${server.address().toString()} :)`);
});
//# sourceMappingURL=ws.server.js.map