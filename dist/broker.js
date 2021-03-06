"use strict";

const aedes = require('aedes')();

const httpServer = require('http').createServer();

const ws = require('websocket-stream');

const port = 8888;
ws.createServer({
  server: httpServer
}, aedes.handle);
httpServer.listen(port, function () {
  console.log('Broker WebSocket escuchando en el puerto: ', port);
});