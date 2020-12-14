const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('Socket connected 🔌');

  ws.on('message', (message) => {
    //log the received message and send it back to the client
    console.log('message received 📩', message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Hello, you received -> ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('it died');
  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(3000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
