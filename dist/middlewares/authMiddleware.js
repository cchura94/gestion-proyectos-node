"use strict";

const usuarioAutenticado = (req, res, next) => {
  //console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

module.exports = {
  usuarioAutenticado
};