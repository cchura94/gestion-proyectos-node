// importar modulos de core de Node
var http = require('http');
import path from "path";
// Importar modulos de Terceros
import express from "express";
const session = require('express-session');
const expressLayouts = require("express-ejs-layouts")
// Para MQTT
const aedes = require('aedes')()
const ws = require('websocket-stream')
const port_ws = 8888; // Para WS

// importar modulos locales
const rutasBase = require("./routes")
const passport = require("./config/passport");
//const passport = require("passport")

//Configuracion de modulos
let app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// config sesiones
app.use(session({
    secret: 'Mi_Codigo_Secreto',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))

  //config passport
app.use(passport.initialize());
app.use(passport.session());

// config rutas
app.use('/', rutasBase);

// Habilitar vistas
app.set("views", './src/views');
app.set("view engine", "ejs");

app.use(expressLayouts)

app.use(express.static(path.join(__dirname, 'public')));


// config Variables
var PORT = process.env.PORT || '3000';

app.set('port', PORT);


// Crear el Servidor
var server = http.createServer(app);

// BROKER MQTT WS
ws.createServer({ server: server }, aedes.handle)
// Levantar el Servidor HTTP

server.listen(app.get('port'), () => {
    console.log(`Servidor Levantado en http://127.0.0.1:${app.get('port')}`);
})

