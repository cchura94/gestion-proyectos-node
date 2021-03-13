// importacion de modulos de terceros
const express = require("express")
var router = express.Router();
const passport = require('passport')
var bcrypt = require("bcrypt")

const expressLayouts = require("express-ejs-layouts")
router.use(expressLayouts)

// importar modulos Locales
const proyectoController = require("./../controllers/proyectoController")
const actividadController = require("./../controllers/actividadController")

// Importar middlwares
const authMiddleware = require("./../middlewares/authMiddleware");
// Rutas de Proyecto

router.get("/", (req, res) => {
    res.render("index");
});


// Rutas para Auth
router.get("/login", (req, res) => {
    res.render("auth/login", { layout: 'sitio' });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/proyecto',
                                   failureRedirect: '/login',
                                   failureFlash: true,
                                badRequestMessage: "Ambos campos son obligatorios" })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

// Prueba registro
router.get("/registro", (req, res) => {
    require("./../models").Usuario.create({
        correo: "cchura.cpc@gmail.com", 
        clave: bcrypt.hashSync("cristian123", bcrypt.genSaltSync(10)) 
    })
});

//- METODO - URL - (Midleware) - CONTROLLER - FUNCION
router.get("/proyecto", authMiddleware.usuarioAutenticado, proyectoController.lista);

router.get("/proyecto/crear", authMiddleware.usuarioAutenticado,proyectoController.crear);
router.post("/proyecto/", authMiddleware.usuarioAutenticado,proyectoController.guardar);

router.get("/proyecto/:id", authMiddleware.usuarioAutenticado,proyectoController.mostrar);

router.get("/proyecto/:id/editar", authMiddleware.usuarioAutenticado,proyectoController.editar);
router.post("/proyecto/:id", authMiddleware.usuarioAutenticado,proyectoController.modificar);

router.post("/proyecto/eliminar/:id", authMiddleware.usuarioAutenticado,proyectoController.eliminar);


//- METODO - URL - (Midleware) - CONTROLLER - FUNCION
router.get("/actividad", actividadController.lista);
router.get("/actividad/crear", actividadController.crear);
router.post("/actividad/", actividadController.guardar);
router.get("/actividad/:id", actividadController.mostrar);
router.get("/actividad/:id/editar", actividadController.editar);
router.post("/actividad/:id", actividadController.modificar);
router.post("/actividad/:id", actividadController.eliminar);


module.exports = router;