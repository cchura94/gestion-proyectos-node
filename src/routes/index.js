// importacion de modulos de terceros
const express = require("express")
var router = express.Router();
const passport = require('passport')

var bcrypt = require("bcrypt")

// importar modulos Locales
const proyectoController = require("./../controllers/proyectoController")
const actividadController = require("./../controllers/actividadController")

// Rutas de Proyecto

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

// Rutas para Auth
router.post('/login',
  passport.authenticate('local', { successRedirect: '/proyecto',
                                   failureRedirect: '/login',
                                   failureFlash: true,
                                badRequestMessage: "Ambos campos son obligatorios" })
);

// Prueba registro
router.get("/registro", (req, res) => {
    require("./../models").Usuario.create({
        correo: "cchura.cpc@gmail.com", 
        clave: bcrypt.hashSync("cristian123", bcrypt.genSaltSync(10)) 
    })
});

//- METODO - URL - (Midleware) - CONTROLLER - FUNCION
router.get("/proyecto", proyectoController.lista);

router.get("/proyecto/crear", proyectoController.crear);
router.post("/proyecto/", proyectoController.guardar);

router.get("/proyecto/:id", proyectoController.mostrar);

router.get("/proyecto/:id/editar", proyectoController.editar);
router.post("/proyecto/:id", proyectoController.modificar);

router.post("/proyecto/eliminar/:id", proyectoController.eliminar);


//- METODO - URL - (Midleware) - CONTROLLER - FUNCION
router.get("/actividad", actividadController.lista);
router.get("/actividad/crear", actividadController.crear);
router.post("/actividad/", actividadController.guardar);
router.get("/actividad/:id", actividadController.mostrar);
router.get("/actividad/:id/editar", actividadController.editar);
router.post("/actividad/:id", actividadController.modificar);
router.post("/actividad/:id", actividadController.eliminar);


module.exports = router;