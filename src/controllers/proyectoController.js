// Importar modelos
const db = require("./../models");

/**
 * Esta función me permite listar todos
 * los proyectos de la base de datos
 * 
 * @param {*} req Petición del Cliente
 * @param {*} res Petición del Servicor
 */
const lista = async (req, res) => {
    // Consultas a la BD
    let datos = await db.Proyecto.findAll();
    //res.json(datos)
    //console.log(datos);
    res.render("admin/proyecto/index", {titulo: "Lista de Proyectos", proyectos: datos});
}

/**
 * Me permite cargar el formulario HTML 
 * para crear un nuevo proyecto
 */
const crear = async (req, res) => {
    // Consultas a la BD
    //res.send("Cargar el formulario")
    res.render("admin/proyecto/crear", {titulo: "Nuevo Proyecto"});
}

/**
 * Para guardar en la base de datos
 */
const guardar = async (req, res) => {
    // Consultas a la BD
    //console.log(req.body);
    await db.Proyecto.create(req.body),
    res.redirect("/proyecto");
}

/**
 * Esta función me permite mostrar un
 * proyecto por id
 *  @param {*} id 
 */
const mostrar = async (req, res) => {
    // Consultas a la BD
    res.send("Mostrar un pryecto")
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

module.exports = {
    lista,
    crear,
    guardar,
    mostrar,
    editar,
    modificar,
    eliminar
}