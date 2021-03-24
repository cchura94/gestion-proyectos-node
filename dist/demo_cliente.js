"use strict";

var mqtt = require('mqtt');

var client = mqtt.connect('ws://127.0.0.1:3000');
client.on('connect', function () {
  client.subscribe('test', function (err) {
    if (!err) {
      client.publish('test', 'Hola Prueba');
    }
  });
});
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString()); //client.end()
});