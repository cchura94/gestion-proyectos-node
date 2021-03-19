'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //console.log(models.Actividad)
      models.Actividad.belongsTo(models.Proyecto, {
        foreignKey: 'proyectoId'
      });
      
      models.Actividad.belongsToMany(models.Usuario, { 
        through: "ActividadUsuario",
        foreignKey: 'actividadId'
      });
    }
  };
  Actividad.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fecha_ven: DataTypes.DATE,
    estado: DataTypes.BOOLEAN,
    proyectoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Actividad',
  });
  return Actividad;
};