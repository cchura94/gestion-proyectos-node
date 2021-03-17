// Importar modelos
const db = require("./../models");
const bcrypt = require("bcrypt")

/**
 * Esta función me permite listar todos
 * los usuario de la base de datos
 * 
 * @param {*} req Petición del Cliente
 * @param {*} res Petición del Servicor
 */
const lista = async (req, res) => {
    // Consultas a la BD
    let datos = await db.Usuario.findAll();
    //res.json(datos)
    //console.log(datos);
    res.render("admin/usuario/index", {titulo: "Lista de Usuarios", usuarios: datos, layout: 'layout'});
}

/**
 * Me permite cargar el formulario HTML 
 * para crear un nuevo proyecto
 */
const crear = async (req, res) => {
    // Consultas a la BD
    //res.send("Cargar el formulario")
    res.render("admin/usuario/crear", {titulo: "Nuevo Usuario"});
}

/**
 * Para guardar en la base de datos
 */
const guardar = async (req, res) => {
    // Consultas a la BD
    try{
        //console.log(req.body)
        // antes validar
        // luego registrar
        await db.Usuario.create({
            correo: req.body.correo, 
            clave: bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10)) 
        });
        res.redirect("/usuario");

    }catch(error){
        res.redirect("/usuario/crear");
    }
    
    
}

/**
 * Esta función me permite mostrar un
 * proyecto por id
 *  @param {*} id 
 */
const mostrar = async (req, res) => {
    // Consultas a la BD
    var id = req.params.id;
    let dato = await db.Proyecto.findByPk(id);
    let actividades = await db.Actividad.findAll({where: {proyectoId: id}});
    console.log(actividades);
    res.render("admin/proyecto/mostrar", {titulo: "Mostrar Proyecto", proyecto: dato, actividades: actividades});
}

/**
 * Permite cargar el furmulario de 
 * Edicion de un Proyecto por ID
 *  @param {*} id
 */
const editar = async (req, res) => {
    // Consultas a la BD
    var id = req.params.id;
    let dato = await db.Proyecto.findByPk(id);
    res.render("admin/proyecto/editar", {titulo: "Editar Proyecto", proyecto: dato});
}

/**
 * Modificar en la base de datos por id
 * @param {*} id
 */
const modificar = async (req, res) => {
    // Consultas a la BD
    var id = req.params.id;
    await db.Proyecto.update(req.body, {where: {id: id}})
    res.redirect("/proyecto");
}

/**
 * Eliminar de la BD
 */
const eliminar = async (req, res) => {
    // Consultas a la BD
    var id = req.params.id;
    await db.Proyecto.destroy({where: {id: id}})
    res.redirect("/proyecto");
}

/**
 * Permite asignar una Actividad a un Proyecto
 * @param {*} id id de proyecto 
 */
const asignarActividad = async (req, res) => {
    id_proy = req.params.id;
    await db.Actividad.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        proyectoId: id_proy,
        fecha_ven: req.body.fecha_ven
    });
    res.redirect(`/proyecto/${id_proy}`);
}

module.exports = {
    lista,
    crear,
    guardar,
    mostrar,
    editar,
    modificar,
    eliminar,
    asignarActividad
}