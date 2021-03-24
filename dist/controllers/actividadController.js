"use strict";

// Importar modelos
//const proyecto = require("./../models/actividad");
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
  //let proyectos = await proyecto.findAll();
  res.send("Lista de Actividades");
};
/**
 * Me permite cargar el formulario HTML 
 * para crear un nuevo proyecto
 */


const crear = async (req, res) => {
  // Consultas a la BD
  res.send("Cargar el formulario");
};
/**
 * Para guardar en la base de datos
 */


const guardar = async (req, res) => {// Consultas a la BD
};
/**
 * Esta función me permite mostrar un
 * proyecto por id
 *  @param {*} id 
 */


const mostrar = async (req, res) => {
  // Consultas a la BD
  res.send("Mostrar un pryecto");
};
/**
 * Permite cargar el furmulario de 
 * Edicion de un Proyecto por ID
 *  @param {*} id
 */


const editar = async (req, res) => {
  // Consultas a la BD
  res.send("Cargar el formulario de edicion de un proyecto");
};
/**
 * Modificar en la base de datos por id
 * @param {*} id
 */


const modificar = async (req, res) => {// Consultas a la BD
};
/**
 * Eliminar de la BD
 */


const eliminar = async (req, res) => {// Consultas a la BD
};

const asignarUsuarios = async (req, res) => {
  let id_act = req.params.id;
  let id_proy = req.body.id_proy;
  const actividad = await db.Actividad.findByPk(id_act); //console.log(req.body);

  req.body.usuarios.forEach(async user_id => {
    await actividad.addUsuario(user_id);
  });
  res.redirect(`/proyecto/${id_proy}`);
};

module.exports = {
  lista,
  crear,
  guardar,
  mostrar,
  editar,
  modificar,
  eliminar,
  asignarUsuarios
};