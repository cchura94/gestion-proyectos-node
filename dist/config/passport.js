"use strict";

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const db = require("../models");

const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({
  usernameField: 'correo',
  passwordField: 'clave'
}, async function (correo, clave, next) {
  // consulta a la BD
  var usuario = await db.Usuario.findOne({
    where: {
      correo: correo
    }
  });

  if (!usuario) {
    return next(null, false, {
      mensaje: "El correo no existe en la BD"
    });
  }

  if (!bcrypt.compareSync(clave, usuario.clave)) {
    return next(null, false, {
      mensaje: "Contraseña Incorrecta"
    });
  }

  return next(null, usuario);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
module.exports = passport;