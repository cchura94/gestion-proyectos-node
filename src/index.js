// importar modulos de core de Node
var http = require('http');

// Importar modulos de Terceros
const express = require("express");

// importar modulos locales
const rutasBase = require("./routes")


//Configuracion de modulos
var app = express();

app.use('/', rutasBase);


// config Variables
var PORT = process.env.PORT || '3000';

app.set('port', PORT);


// Crear el Servidor
var server = http.createServer(app);

// Levantar el Servidor

server.listen(app.get('port'), () => {
    console.log(`Servidor Levantado en http://127.0.0.1:${app.get('port')}`);
})

