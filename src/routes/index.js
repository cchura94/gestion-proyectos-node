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
const usuarioController = require("./../controllers/usuarioController")

// Importar middlwares
const authMiddleware = require("./../middlewares/authMiddleware");
// Rutas de Proyecto

router.get("/", (req, res) => {
    res.render("index", { layout: 'sitio' });
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

router.post("/proyecto/:id/actividad/nuevo", authMiddleware.usuarioAutenticado, proyectoController.asignarActividad);

router.get("/proyecto", authMiddleware.usuarioAutenticado, proyectoController.lista);

router.get("/proyecto/crear", authMiddleware.usuarioAutenticado,proyectoController.crear);
router.post("/proyecto/", authMiddleware.usuarioAutenticado,proyectoController.guardar);

router.get("/proyecto/:id", authMiddleware.usuarioAutenticado,proyectoController.mostrar);

router.get("/proyecto/:id/editar", authMiddleware.usuarioAutenticado,proyectoController.editar);
router.post("/proyecto/:id", authMiddleware.usuarioAutenticado,proyectoController.modificar);

router.post("/proyecto/eliminar/:id", authMiddleware.usuarioAutenticado,proyectoController.eliminar);


//- METODO - URL - (Midleware) - CONTROLLER - FUNCION
router.get("/actividad", authMiddleware.usuarioAutenticado, actividadController.lista);
router.get("/actividad/crear", authMiddleware.usuarioAutenticado, actividadController.crear);
router.post("/actividad/", authMiddleware.usuarioAutenticado, actividadController.guardar);
router.get("/actividad/:id", authMiddleware.usuarioAutenticado, actividadController.mostrar);
router.get("/actividad/:id/editar",authMiddleware.usuarioAutenticado,  actividadController.editar);
router.post("/actividad/:id", authMiddleware.usuarioAutenticado, actividadController.modificar);
router.post("/actividad/:id", authMiddleware.usuarioAutenticado, actividadController.eliminar);

// Usuarios 
router.get("/usuario", authMiddleware.usuarioAutenticado, usuarioController.lista);
router.get("/usuario/crear", usuarioController.crear);
router.post("/usuario/", usuarioController.guardar);
router.get("/usuario/:id", authMiddleware.usuarioAutenticado, usuarioController.mostrar);
router.get("/usuario/:id/editar", authMiddleware.usuarioAutenticado, usuarioController.editar);
router.post("/usuario/:id", authMiddleware.usuarioAutenticado, usuarioController.modificar);
router.post("/usuario/:id", authMiddleware.usuarioAutenticado, usuarioController.eliminar);



module.exports = router;