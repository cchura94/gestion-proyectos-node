// importar modulos de core de Node
var http = require('http');

// Importar modulos de Terceros
const express = require("express");

// importar modulos locales
const rutasBase = require("./routes")


//Configuracion de modulos
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', rutasBase);

// Habilitar vistas
app.set("views", './src/views');
app.set("view engine", "ejs");


// config Variables
var PORT = process.env.PORT || '3000';

app.set('port', PORT);


// Crear el Servidor
var server = http.createServer(app);

// Levantar el Servidor

server.listen(app.get('port'), () => {
    console.log(`Servidor Levantado en http://127.0.0.1:${app.get('port')}`);
})

