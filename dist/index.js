"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importar modulos de core de Node
var http = require('http');

const session = require('express-session');

const expressLayouts = require("express-ejs-layouts"); // importar modulos locales


const rutasBase = require("./routes");

const passport = require("./config/passport"); //const passport = require("passport")
//Configuracion de modulos


let app = (0, _express.default)();
app.use(_express.default.json()); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
// config sesiones

app.use(session({
  secret: 'Mi_Codigo_Secreto',
  resave: false,
  saveUninitialized: true //cookie: { secure: true }

})); //config passport

app.use(passport.initialize());
app.use(passport.session()); // config rutas

app.use('/', rutasBase); // Habilitar vistas

app.set("views", './src/views');
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(_express.default.static(_path.default.join(__dirname, 'public'))); // config Variables

var PORT = process.env.PORT || '3000';
app.set('port', PORT); // Crear el Servidor

var server = http.createServer(app); // Levantar el Servidor

server.listen(app.get('port'), () => {
  console.log(`Servidor Levantado en http://127.0.0.1:${app.get('port')}`);
});